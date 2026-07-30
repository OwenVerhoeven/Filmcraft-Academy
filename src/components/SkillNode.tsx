import { Lock, Check } from "lucide-react";
import { Link } from "../router";
import type { Skill } from "../content/model";
import { stateFor } from "../lib/progression";
import { useProgress } from "../state";
import { useLanguage } from "../i18n";
import { localizeSkill } from "../content/localize";
import { TopicIcon } from "./TopicIcon";
export function SkillNode({
  skill,
  compact = false,
}: {
  skill: Skill;
  compact?: boolean;
}) {
  const { progress } = useProgress();
  const { language } = useLanguage();
  const text = localizeSkill(skill, language);
  const state = stateFor(skill, progress);
  return (
    <Link
      to={state === "locked" ? "#" : `/skill/${skill.id}`}
      className={`skill-node ${state} ${compact ? "compact" : ""}`}
      aria-disabled={state === "locked"}
      title={
        state === "locked"
          ? `Requires: ${skill.prerequisites.join(", ")}`
          : text.description
      }
    >
      <span className="node-icon">
        {state === "locked" ? (
          <Lock />
        ) : state === "mastered" ? (
          <Check />
        ) : (
          <TopicIcon title={skill.title} domainId={skill.domainId} />
        )}
      </span>
      <span>
        <small>
          TIER {skill.tier} · {state.replace("-", " ")}
        </small>
        <b>{text.title}</b>
        {!compact && (
          <em>
            {skill.theoryMinutes + skill.practiceMinutes} min ·{" "}
            {Object.values(skill.xp).reduce((a, b) => a + b, 0)} XP
          </em>
        )}
      </span>
    </Link>
  );
}
