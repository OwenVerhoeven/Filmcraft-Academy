import type { AccountName } from "../auth";
import type { AppProgress, SkillProgress } from "../content/model";
import { skillsWithBoss } from "./progression";

const revisionKey = (account: AccountName) => `filmcraft-cloud-revision:${account}`;

export type CloudLogin = {
  user: AccountName;
  token: string;
  expiresAt: number;
};

type CloudStored = {
  progress: AppProgress;
  revision: number;
  updatedAt: string;
};

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
  });
  const body = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    const error = new Error(body.error ?? "Cloud sync failed");
    Object.assign(error, { status: response.status, body });
    throw error;
  }
  return body;
}

export function cloudLogin(username: string, password: string) {
  return api<CloudLogin>("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function cloudLogout(token: string) {
  await api<{ ok: true }>("/api/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getCloudProgress(token: string) {
  return api<{ user: AccountName; stored: CloudStored | null }>("/api/progress", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getCloudHallProfiles(token: string) {
  return api<{
    profiles: Record<AccountName, AppProgress | null>;
  }>("/api/hall-of-fame", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getCloudRevision(account: AccountName) {
  return Number(localStorage.getItem(revisionKey(account)) ?? "0") || 0;
}

export function setCloudRevision(account: AccountName, revision: number) {
  localStorage.setItem(revisionKey(account), String(revision));
}

type SaveResult =
  | { ok: true; revision: number }
  | { ok: false; remote: CloudStored };

async function putCloudProgress(
  token: string,
  progress: AppProgress,
  baseRevision: number,
) {
  const response = await fetch("/api/progress", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ progress, baseRevision }),
  });
  const body = (await response.json()) as SaveResult & { error?: string };
  if (response.status === 409) return body as SaveResult;
  if (!response.ok) {
    const error = new Error(body.error ?? "Cloud sync failed");
    Object.assign(error, { status: response.status });
    throw error;
  }
  return body as SaveResult;
}

function mergeSkill(
  left: SkillProgress | undefined,
  right: SkillProgress | undefined,
): SkillProgress | undefined {
  if (!left) return right;
  if (!right) return left;
  const evidence =
    (left.evidence?.createdAt ?? "") >= (right.evidence?.createdAt ?? "")
      ? left.evidence
      : right.evidence;
  const masteredAt = [left.masteredAt, right.masteredAt]
    .filter((value): value is string => Boolean(value))
    .sort()[0];
  const rubric = { ...right.rubric };
  for (const [key, value] of Object.entries(left.rubric))
    rubric[key] = Math.max(value, rubric[key] ?? 0);
  return {
    state: masteredAt ? "mastered" : left.state,
    theory: left.theory || right.theory,
    check: left.check || right.check,
    practice: left.practice || right.practice,
    rubric,
    evidence,
    xpEvents: [...new Set([...left.xpEvents, ...right.xpEvents])],
    masteredAt,
  };
}

export function mergeProgress(left: AppProgress, right: AppProgress): AppProgress {
  const ids = new Set([...Object.keys(left.skills), ...Object.keys(right.skills)]);
  const skills: AppProgress["skills"] = {};
  for (const id of ids) {
    const merged = mergeSkill(left.skills[id], right.skills[id]);
    if (merged) skills[id] = merged;
  }
  const xpValues = new Map(
    skillsWithBoss.flatMap((skill) =>
      Object.entries(skill.xp).map(([event, value]) => [`${skill.id}:${event}`, value]),
    ),
  );
  const xp = Object.values(skills).reduce(
    (total, skill) =>
      total +
      skill.xpEvents.reduce((sum, event) => sum + (xpValues.get(event) ?? 0), 0),
    0,
  );
  const newer = left.updatedAt >= right.updatedAt ? left : right;
  return {
    ...newer,
    xp,
    skills,
    createdAt: [left.createdAt, right.createdAt].sort()[0],
    updatedAt: new Date().toISOString(),
  };
}

export async function initializeCloudProgress(
  account: AccountName,
  token: string,
  local: AppProgress,
) {
  const { stored } = await getCloudProgress(token);
  if (!stored) {
    const result = await putCloudProgress(token, local, 0);
    if (result.ok) setCloudRevision(account, result.revision);
    return local;
  }
  setCloudRevision(account, stored.revision);
  const remote = stored.progress;
  if (local.updatedAt <= remote.updatedAt) return remote;
  const merged = mergeProgress(local, remote);
  return syncCloudProgress(account, token, merged, stored.revision);
}

export async function syncCloudProgress(
  account: AccountName,
  token: string,
  progress: AppProgress,
  revision = getCloudRevision(account),
): Promise<AppProgress> {
  const result = await putCloudProgress(token, progress, revision);
  if (result.ok) {
    setCloudRevision(account, result.revision);
    return progress;
  }
  const merged = mergeProgress(progress, result.remote.progress);
  const retry = await putCloudProgress(token, merged, result.remote.revision);
  if (!retry.ok) throw new Error("Cloud progress changed repeatedly; retrying later");
  setCloudRevision(account, retry.revision);
  return merged;
}
