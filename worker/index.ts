import { DurableObject } from "cloudflare:workers";

type AccountName = "SinbodWayne" | "KyanWayne";
type StoredProgress = { progress: unknown; revision: number; updatedAt: string };

const accounts: Record<
  AccountName,
  { salt: string; hash: string }
> = {
  SinbodWayne: {
    salt: "filmcraft-sinbod-v2",
    hash: "475f81f207679bc35db54a17114afc25fc8c8f568564f4960b611a2087ef1557",
  },
  KyanWayne: {
    salt: "filmcraft-kyan-v2",
    hash: "6ba811f8e80a76e54393488d498291c0dcf203b6a80c91198ea78bcbf422565a",
  },
};

const encoder = new TextEncoder();
const SESSION_LIFETIME_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_BODY_BYTES = 900_000;

function bytesToHex(bytes: ArrayBuffer | Uint8Array) {
  return Array.from(bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256(value: string) {
  return bytesToHex(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

async function passwordHash(password: string, salt: string) {
  const material = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  return bytesToHex(
    await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: encoder.encode(salt), iterations: 210_000, hash: "SHA-256" },
      material,
      256,
    ),
  );
}

function timingSafeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1)
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

function json(data: unknown, status = 200, extraHeaders?: HeadersInit) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

async function readJson(request: Request): Promise<Record<string, unknown>> {
  const length = Number(request.headers.get("content-length") ?? "0");
  if (length > MAX_BODY_BYTES) throw new Error("PAYLOAD_TOO_LARGE");
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) throw new Error("PAYLOAD_TOO_LARGE");
  const parsed: unknown = JSON.parse(text);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
    throw new Error("INVALID_JSON");
  return parsed as Record<string, unknown>;
}

function bearer(request: Request) {
  const value = request.headers.get("authorization");
  return value?.startsWith("Bearer ") ? value.slice(7) : null;
}

function accountFromToken(token: string): AccountName | null {
  const name = token.split(".", 1)[0];
  return name === "SinbodWayne" || name === "KyanWayne" ? name : null;
}

export class ProgressStore extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      this.ctx.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS progress (
          singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
          data TEXT NOT NULL,
          revision INTEGER NOT NULL,
          updated_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS sessions (
          token_hash TEXT PRIMARY KEY,
          expires_at INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS login_limits (
          client_key TEXT PRIMARY KEY,
          failures INTEGER NOT NULL,
          window_started INTEGER NOT NULL
        );
      `);
    });
  }

  async allowLogin(clientKey: string, now: number): Promise<boolean> {
    const row = this.ctx.storage.sql
      .exec<{ failures: number; window_started: number }>(
        "SELECT failures, window_started FROM login_limits WHERE client_key = ?",
        clientKey,
      )
      .toArray()[0];
    return !row || now - row.window_started > 15 * 60_000 || row.failures < 8;
  }

  async recordLogin(clientKey: string, success: boolean, now: number): Promise<void> {
    if (success) {
      this.ctx.storage.sql.exec("DELETE FROM login_limits WHERE client_key = ?", clientKey);
      return;
    }
    this.ctx.storage.sql.exec(
      `INSERT INTO login_limits (client_key, failures, window_started) VALUES (?, 1, ?)
       ON CONFLICT(client_key) DO UPDATE SET
         failures = CASE WHEN ? - window_started > 900000 THEN 1 ELSE failures + 1 END,
         window_started = CASE WHEN ? - window_started > 900000 THEN ? ELSE window_started END`,
      clientKey,
      now,
      now,
      now,
      now,
    );
  }

  async issueSession(tokenHash: string, expiresAt: number): Promise<void> {
    this.ctx.storage.sql.exec("DELETE FROM sessions WHERE expires_at <= ?", Date.now());
    this.ctx.storage.sql.exec(
      "INSERT OR REPLACE INTO sessions (token_hash, expires_at) VALUES (?, ?)",
      tokenHash,
      expiresAt,
    );
  }

  async revokeSession(tokenHash: string): Promise<void> {
    this.ctx.storage.sql.exec("DELETE FROM sessions WHERE token_hash = ?", tokenHash);
  }

  async isAuthorized(tokenHash: string, now: number): Promise<boolean> {
    return Boolean(
      this.ctx.storage.sql
        .exec<{ token_hash: string }>(
          "SELECT token_hash FROM sessions WHERE token_hash = ? AND expires_at > ?",
          tokenHash,
          now,
        )
        .toArray()[0],
    );
  }

  async getProgress(tokenHash: string, now: number): Promise<StoredProgress | null> {
    if (!(await this.isAuthorized(tokenHash, now))) throw new Error("UNAUTHORIZED");
    const row = this.ctx.storage.sql
      .exec<{ data: string; revision: number; updated_at: string }>(
        "SELECT data, revision, updated_at FROM progress WHERE singleton = 1",
      )
      .toArray()[0];
    return row
      ? { progress: JSON.parse(row.data), revision: row.revision, updatedAt: row.updated_at }
      : null;
  }

  async getPublicProgress(): Promise<unknown | null> {
    const row = this.ctx.storage.sql
      .exec<{ data: string }>("SELECT data FROM progress WHERE singleton = 1")
      .toArray()[0];
    if (!row) return null;
    const source = JSON.parse(row.data) as {
      version: number;
      xp: number;
      skills: Record<string, {
        state: string;
        theory: boolean;
        check: boolean;
        practice: boolean;
        evidence?: { createdAt?: string };
        masteredAt?: string;
      }>;
      selectedTitle?: string;
      createdAt: string;
      updatedAt: string;
    };
    return {
      version: source.version,
      xp: source.xp,
      selectedTitle: source.selectedTitle,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      reducedMotion: false,
      sound: false,
      skills: Object.fromEntries(
        Object.entries(source.skills).map(([id, skill]) => [
          id,
          {
            state: skill.state,
            theory: skill.theory,
            check: skill.check,
            practice: skill.practice,
            rubric: {},
            xpEvents: [],
            masteredAt: skill.masteredAt,
            evidence: skill.evidence
              ? { reflection: "", createdAt: skill.evidence.createdAt ?? source.updatedAt }
              : undefined,
          },
        ]),
      ),
    };
  }

  async saveProgress(
    tokenHash: string,
    now: number,
    progress: unknown,
    baseRevision: number,
    updatedAt: string,
  ): Promise<{ ok: true; revision: number } | { ok: false; remote: StoredProgress }> {
    if (!(await this.isAuthorized(tokenHash, now))) throw new Error("UNAUTHORIZED");
    const current = this.ctx.storage.sql
      .exec<{ data: string; revision: number; updated_at: string }>(
        "SELECT data, revision, updated_at FROM progress WHERE singleton = 1",
      )
      .toArray()[0];
    if (current && current.revision !== baseRevision)
      return {
        ok: false,
        remote: {
          progress: JSON.parse(current.data),
          revision: current.revision,
          updatedAt: current.updated_at,
        },
      };
    if (!current && baseRevision !== 0)
      return { ok: false, remote: { progress: null, revision: 0, updatedAt: "" } };
    const revision = (current?.revision ?? 0) + 1;
    this.ctx.storage.sql.exec(
      `INSERT INTO progress (singleton, data, revision, updated_at) VALUES (1, ?, ?, ?)
       ON CONFLICT(singleton) DO UPDATE SET data = excluded.data, revision = excluded.revision,
       updated_at = excluded.updated_at`,
      JSON.stringify(progress),
      revision,
      updatedAt,
    );
    return { ok: true, revision };
  }
}

async function authenticated(
  request: Request,
  env: Env,
): Promise<{ name: AccountName; tokenHash: string; store: DurableObjectStub<ProgressStore> } | null> {
  const token = bearer(request);
  if (!token) return null;
  const name = accountFromToken(token);
  if (!name) return null;
  return { name, tokenHash: await sha256(token), store: env.PROGRESS.getByName(name) };
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);

    try {
      if (url.pathname === "/api/login" && request.method === "POST") {
        const body = await readJson(request);
        const username = body.username;
        const password = body.password;
        if (
          (username !== "SinbodWayne" && username !== "KyanWayne") ||
          typeof password !== "string" ||
          password.length > 128
        )
          return json({ error: "Invalid credentials" }, 401);
        const store = env.PROGRESS.getByName(username);
        const clientKey = request.headers.get("CF-Connecting-IP") ?? "unknown";
        const now = Date.now();
        if (!(await store.allowLogin(clientKey, now)))
          return json({ error: "Too many attempts. Try again later." }, 429, {
            "Retry-After": "900",
          });
        const candidate = await passwordHash(password, accounts[username].salt);
        const valid = timingSafeEqual(candidate, accounts[username].hash);
        await store.recordLogin(clientKey, valid, now);
        if (!valid) return json({ error: "Invalid credentials" }, 401);
        const random = new Uint8Array(32);
        crypto.getRandomValues(random);
        const token = `${username}.${bytesToHex(random)}`;
        await store.issueSession(await sha256(token), now + SESSION_LIFETIME_MS);
        return json({ user: username, token, expiresAt: now + SESSION_LIFETIME_MS });
      }

      const auth = await authenticated(request, env);
      if (!auth) return json({ error: "Unauthorized" }, 401);

      if (url.pathname === "/api/progress" && request.method === "GET") {
        const stored = await auth.store.getProgress(auth.tokenHash, Date.now());
        return json({ user: auth.name, stored });
      }
      if (url.pathname === "/api/hall-of-fame" && request.method === "GET") {
        const [sinbod, kyan] = await Promise.all([
          env.PROGRESS.getByName("SinbodWayne").getPublicProgress(),
          env.PROGRESS.getByName("KyanWayne").getPublicProgress(),
        ]);
        return json({ profiles: { SinbodWayne: sinbod, KyanWayne: kyan } });
      }
      if (url.pathname === "/api/progress" && request.method === "PUT") {
        const body = await readJson(request);
        if (
          !body.progress ||
          typeof body.progress !== "object" ||
          typeof body.baseRevision !== "number" ||
          typeof (body.progress as Record<string, unknown>).updatedAt !== "string"
        )
          return json({ error: "Invalid progress payload" }, 400);
        const result = await auth.store.saveProgress(
          auth.tokenHash,
          Date.now(),
          body.progress,
          body.baseRevision,
          (body.progress as Record<string, string>).updatedAt,
        );
        return json(result, result.ok ? 200 : 409);
      }
      if (url.pathname === "/api/logout" && request.method === "POST") {
        await auth.store.revokeSession(auth.tokenHash);
        return json({ ok: true });
      }
      return json({ error: "Not found" }, 404);
    } catch (error) {
      if (error instanceof Error && error.message === "UNAUTHORIZED")
        return json({ error: "Unauthorized" }, 401);
      if (error instanceof Error && error.message === "PAYLOAD_TOO_LARGE")
        return json({ error: "Payload too large" }, 413);
      if (error instanceof SyntaxError || (error instanceof Error && error.message === "INVALID_JSON"))
        return json({ error: "Invalid JSON" }, 400);
      console.error(JSON.stringify({ event: "api_error", path: url.pathname, error: String(error) }));
      return json({ error: "Service unavailable" }, 503);
    }
  },
} satisfies ExportedHandler<Env>;
