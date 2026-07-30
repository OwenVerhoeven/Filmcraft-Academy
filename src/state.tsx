import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AppProgress, Skill, SkillProgress } from "./content/model";
import {
  award,
  createInitialProgress,
  initialSkillProgress,
  masteryEligible,
} from "./lib/progression";
import { loadProgress, saveProgress } from "./lib/storage";
import { initializeCloudProgress, syncCloudProgress } from "./lib/cloud";
import { useAuth } from "./auth";

export type SyncState = "local" | "syncing" | "synced" | "error";
type Ctx = {
  progress: AppProgress;
  ready: boolean;
  syncState: SyncState;
  setProgress: (p: AppProgress) => void;
  activate: (s: Skill) => void;
  completeTheory: (s: Skill) => void;
  submitCheck: (s: Skill) => void;
  submitPractice: (s: Skill) => void;
  setRubric: (s: Skill, id: string, value: number) => void;
  saveEvidence: (s: Skill, reflection: string, link: string) => void;
  master: (s: Skill) => void;
  reset: () => void;
};
const Context = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth();
  const [progress, setInner] = useState(createInitialProgress());
  const [ready, setReady] = useState(false);
  const [syncState, setSyncState] = useState<SyncState>("local");
  const syncQueue = useRef(Promise.resolve());
  const generation = useRef(0);

  useEffect(() => {
    const ownGeneration = ++generation.current;
    if (!user) {
      setInner(createInitialProgress());
      setReady(false);
      setSyncState("local");
      return;
    }
    setReady(false);
    loadProgress(user).then(async (local) => {
      if (ownGeneration !== generation.current) return;
      setInner(local);
      setReady(true);
      if (!token) {
        setSyncState("local");
        return;
      }
      setSyncState("syncing");
      try {
        const resolved = await initializeCloudProgress(user, token, local);
        if (ownGeneration !== generation.current) return;
        setInner(resolved);
        await saveProgress(user, resolved);
        setSyncState("synced");
      } catch {
        if (ownGeneration === generation.current) setSyncState("error");
      }
    });
  }, [user, token]);

  const setProgress = (next: AppProgress) => {
    setInner(next);
    if (!user) return;
    void saveProgress(user, next);
    if (!token) {
      setSyncState("local");
      return;
    }
    const account = user;
    const sessionToken = token;
    const ownGeneration = generation.current;
    setSyncState("syncing");
    syncQueue.current = syncQueue.current
      .catch(() => undefined)
      .then(async () => {
        const synced = await syncCloudProgress(account, sessionToken, next);
        if (ownGeneration !== generation.current) return;
        if (synced.updatedAt !== next.updatedAt) {
          setInner(synced);
          await saveProgress(account, synced);
        }
        setSyncState("synced");
      })
      .catch(() => {
        if (ownGeneration === generation.current) setSyncState("error");
      });
  };

  const patch = (
    skill: Skill,
    change: (p: SkillProgress) => void,
    event?: keyof Skill["xp"],
  ) => {
    let next = { ...progress, skills: { ...progress.skills } };
    const skillProgress = {
      ...(next.skills[skill.id] ?? initialSkillProgress()),
      rubric: { ...(next.skills[skill.id]?.rubric ?? {}) },
      xpEvents: [...(next.skills[skill.id]?.xpEvents ?? [])],
    };
    change(skillProgress);
    next.skills[skill.id] = skillProgress;
    next.updatedAt = new Date().toISOString();
    if (event) next = award(next, skill, event);
    setProgress(next);
  };

  return (
    <Context.Provider
      value={{
        progress,
        ready,
        syncState,
        setProgress,
        activate: (skill) =>
          setProgress({
            ...progress,
            activeSkillId: skill.id,
            updatedAt: new Date().toISOString(),
          }),
        completeTheory: (skill) => patch(skill, (p) => { p.theory = true; }, "theory"),
        submitCheck: (skill) => patch(skill, (p) => { p.check = true; }, "check"),
        submitPractice: (skill) => patch(skill, (p) => { p.practice = true; }, "practice"),
        setRubric: (skill, id, value) => patch(skill, (p) => { p.rubric[id] = value; }),
        saveEvidence: (skill, reflection, link) =>
          patch(skill, (p) => {
            p.evidence = {
              reflection,
              link: link || undefined,
              createdAt: new Date().toISOString(),
            };
          }, "evidence"),
        master: (skill) =>
          patch(skill, (p) => {
            if (masteryEligible(skill, p)) {
              p.state = "mastered";
              p.masteredAt = new Date().toISOString();
            }
          }, "mastery"),
        reset: () => setProgress(createInitialProgress()),
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useProgress = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Progress context missing");
  return context;
};
