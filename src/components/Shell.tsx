import { useState, type ReactNode } from "react";
import {
  Aperture,
  Map,
  GitBranch,
  ScrollText,
  UserRound,
  Trophy,
  BookOpen,
  Images,
  Settings,
  Crown,
  Menu,
  X,
  LogOut,
  Medal,
  Cloud,
  CloudOff,
} from "lucide-react";
import { NavLink } from "../router";
import { useProgress } from "../state";
import { useAuth } from "../auth";
import { useLanguage } from "../i18n";
import {
  completePercent,
  levelForXp,
  xpForLevel,
  xpForNextLevel,
} from "../lib/progression";
const nav = [
  ["/", "journey", Map],
  ["/talent-trees", "skillTrees", GitBranch],
  ["/quests", "quests", ScrollText],
  ["/character", "character", UserRound],
  ["/achievements", "achievements", Trophy],
  ["/hall-of-fame", "hallOfFame", Medal],
  ["/codex", "codex", BookOpen],
  ["/portfolio", "portfolio", Images],
  ["/final-boss", "finalBoss", Crown],
  ["/settings", "settings", Settings],
] as const;
export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { progress, syncState } = useProgress();
  const { user, logout, cloudConnected } = useAuth();
  const { t } = useLanguage();
  const level = levelForXp(progress.xp),
    from = xpForLevel(level),
    to = xpForNextLevel(level);
  return (
    <div className={`shell ${progress.reducedMotion ? "motion-reduced" : ""}`}>
      <aside className={open ? "nav open" : "nav"}>
        <div className="brand">
          <Aperture />
          <span>
            FILMCRAFT<small>ACADEMY</small>
          </span>
        </div>
        <button
          className="close"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        >
          <X />
        </button>
        {nav.map(([to, key, Icon]) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={() => setOpen(false)}
          >
            <Icon />
            <span>{t(key)}</span>
          </NavLink>
        ))}
      </aside>
      <div className="app">
        <header>
          <button
            className="menu"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu />
          </button>
          <div className="mobile-brand">FILMCRAFT</div>
          <div className="level">
            <b>{level}</b>
            <span>LEVEL</span>
          </div>
          <div className="xp">
            <div>
              <span>XP {progress.xp.toLocaleString()}</span>
              <span>{completePercent(progress)}% CURRICULUM</span>
            </div>
            <progress value={progress.xp - from} max={Math.max(1, to - from)} />
          </div>
          <div className="account-chip">
            <span>
              <small className={`cloud-state ${syncState}`} title={
                syncState === "synced" ? "Progress synced across devices" :
                syncState === "syncing" ? "Syncing progress" :
                cloudConnected ? "Cloud temporarily unavailable" : "Saved on this device"
              }>
                {syncState === "synced" || syncState === "syncing" ? <Cloud /> : <CloudOff />}
                {syncState === "synced" ? t("cloudSynced") : syncState === "syncing" ? t("syncing") : syncState === "error" ? t("syncError") : t("localSave")}
              </small>
              <b>{user}</b>
            </span>
            <button onClick={logout} aria-label="Log out">
              <LogOut />
            </button>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
