import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link, useParams } from "./router";
import { ArrowRight, Check, Crown, GitBranch, Lock, Star, X } from "lucide-react";
import { domains } from "./content/curriculum";
import type { Skill } from "./content/model";
import { domainPercent, stateFor } from "./lib/progression";
import { useProgress } from "./state";
import { useLanguage } from "./i18n";
import { localizeSkill } from "./content/localize";
import { DomainIcon, TopicIcon } from "./components/TopicIcon";
export function TalentTreeOverview() {
  const { progress } = useProgress();
  const { t } = useLanguage();
  return (
    <div className="page talent-overview">
      <div className="page-title">
        <div>
          <h1>{t("skillTrees")}</h1>
          <p>Forge your craft through interconnected disciplines.</p>
        </div>
      </div>
      <div className="talent-tree-list">
        {domains.map((d, i) => (
          <Link
            to={`/talent-tree/${d.id}`}
            key={d.id}
            style={{ "--tree-color": d.color } as CSSProperties}
          >
            <div className="tree-sigil">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <DomainIcon domainId={d.id} />
            </div>
            <div>
              <small>
                {d.skills.length} {t("skills").toUpperCase()} ·{" "}
                {d.skills.at(-1)?.title}
              </small>
              <h2>{d.title}</h2>
              <p>{d.description}</p>
            </div>
            <div className="tree-rank">
              <strong>{domainPercent(d.id, progress)}%</strong>
              <progress value={domainPercent(d.id, progress)} max="100" />
              <span>
                {
                  d.skills.filter(
                    (s) => progress.skills[s.id]?.state === "mastered",
                  ).length
                }{" "}
                / {d.skills.length} mastered
              </span>
            </div>
            <ArrowRight />
          </Link>
        ))}
      </div>
    </div>
  );
}
const roman = ["", "I", "II", "III", "IV", "V", "VI"];
const skillLayout = (skills: Skill[], portrait: boolean) => {
  const tiers = [...new Set(skills.map((s) => s.tier))].sort((a, b) => a - b);
  let cursor = 0;
  const rowHeight = portrait ? 176 : 164;
  // Portrait tier captions occupy the full band header; nodes start beneath it.
  const topPadding = portrait ? 150 : 80;
  const bottomPadding = portrait ? 56 : 64;
  const tierData = tiers.map((tier) => {
    const count = skills.filter((skill) => skill.tier === tier).length;
    const columns = Math.min(portrait ? 2 : 4, count);
    return { tier, count, columns, subrows: Math.ceil(count / columns) };
  });
  const rows = tierData.map((tier) => {
    const height = topPadding + tier.subrows * rowHeight + bottomPadding;
    const row = {
      ...tier,
      top: cursor,
      bottom: cursor + height,
      y: cursor + 30,
    };
    cursor += height;
    return row;
  });
  const coords = skills.map((skill) => {
    const row = rows.find((r) => r.tier === skill.tier)!;
    const peers = skills.filter((s) => s.tier === skill.tier);
    const position = peers.findIndex((s) => s.id === skill.id);
    const columns = row.columns;
    const column = position % columns;
    const subrow = Math.floor(position / columns);
    const x =
      columns === 1
        ? 50
        : portrait
          ? 27 + (column * 46) / (columns - 1)
          : 14 + (column * 72) / (columns - 1);
    const y = row.top + topPadding + subrow * rowHeight;
    return [x, y];
  });
  return { coords, rows, height: Math.max(cursor, portrait ? 980 : 760) };
};
function usePortraitTree() {
  const [portrait, setPortrait] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px)");
    const update = () => setPortrait(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return portrait;
}
export function TalentTree() {
  const { id } = useParams();
  const domain = domains.find((d) => d.id === id);
  const { progress } = useProgress();
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>();
  const portrait = usePortraitTree();
  const selected = domain?.skills.find((s) => s.id === selectedId);
  const layout = useMemo(
    () => skillLayout(domain?.skills ?? [], portrait),
    [domain, portrait],
  );
  const { coords, rows, height } = layout;
  const index = useMemo(
    () => new Map(domain?.skills.map((s, i) => [s.id, i])),
    [domain],
  );
  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(undefined);
    };
    document.addEventListener("keydown", close);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", close);
      document.body.classList.remove("modal-open");
    };
  }, [selected]);
  if (!domain)
    return (
      <div className="page">
        <h1>Skill tree not found</h1>
      </div>
    );
  return (
    <div
      className="talent-shell"
      style={{ "--tree-color": domain.color } as CSSProperties}
    >
      <header className="talent-heading">
        <div>
          <Link to="/talent-trees">{t("backTrees")}</Link>
          <h1>{domain.title}</h1>
          <p>
            {t("treeCompletion")}{" "}
            <strong>{domainPercent(domain.id, progress)}%</strong>
          </p>
        </div>
      </header>
      <div className="talent-stage">
        <div className="talent-map-wrap">
          <div className="tier-guides" aria-hidden="true" style={{ height }}>
            {rows.slice(0, -1).map((row) => (
              <i key={row.tier} style={{ top: row.bottom }} />
            ))}
          </div>
          <div className="tier-labels">
            {rows.map((row, i) => (
              <span key={row.tier} style={{ top: row.y }}>
                Tier {roman[row.tier]}
                <small>
                  {i === 0
                    ? t("foundation")
                    : i === rows.length - 1
                      ? t("mastery")
                      : i === 1
                        ? t("developing")
                        : t("advanced")}
                </small>
              </span>
            ))}
          </div>
          <div className="talent-map" style={{ height }}>
            <svg
              viewBox={`0 0 100 ${height}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {domain.skills.flatMap((s, i) =>
                s.prerequisites
                  .filter((p) => index.has(p))
                  .map((p) => {
                    const a = coords[index.get(p)!],
                      b = coords[i],
                      midpoint = (a[1] + b[1]) / 2;
                    return (
                      <path
                        key={`${p}-${s.id}`}
                        d={`M ${a[0]} ${a[1]} V ${midpoint} H ${b[0]} V ${b[1]}`}
                        className={
                          progress.skills[p]?.state === "mastered" ? "lit" : ""
                        }
                      />
                    );
                  }),
              )}
            </svg>
            {domain.skills.map((skill, i) => (
              <TalentNode
                key={skill.id}
                skill={skill}
                x={coords[i][0]}
                y={coords[i][1]}
                selected={skill.id === selectedId}
                boss={i === domain.skills.length - 1}
                onSelect={() => setSelectedId(skill.id)}
              />
            ))}
          </div>
          <div className="talent-legend">
            <span>
              <i className="active" />
              {t("active")}
            </span>
            <span>
              <i className="available" />
              {t("available")}
            </span>
            <span>
              <i className="mastered" />
              {t("mastered")}
            </span>
            <span>
              <i />
              {t("locked")}
            </span>
            <span>
              <Crown />
              {t("chapterBoss")}
            </span>
          </div>
        </div>
      </div>
      {selected && (
        <div
          className="talent-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelectedId(undefined);
          }}
        >
          <div className="talent-modal" role="dialog" aria-modal="true" aria-labelledby="talent-modal-title">
            <button className="talent-modal-close" onClick={() => setSelectedId(undefined)} aria-label="Close skill details">
              <X />
            </button>
            <TalentInspector skill={selected} />
          </div>
        </div>
      )}
    </div>
  );
}
function TalentNode({
  skill,
  x,
  y,
  selected,
  boss,
  onSelect,
}: {
  skill: Skill;
  x: number;
  y: number;
  selected: boolean;
  boss: boolean;
  onSelect: () => void;
}) {
  const { progress } = useProgress();
  const { language } = useLanguage();
  const text = localizeSkill(skill, language);
  const state = stateFor(skill, progress);
  return (
    <button
      className={`talent-node ${state} ${selected ? "selected" : ""} ${boss ? "boss" : ""}`}
      style={{ left: `${x}%`, top: y }}
      onClick={onSelect}
    >
      <span className="node-rank">{skill.tier}</span>
      <span className="talent-gem">
        {state === "locked" ? (
          <Lock />
        ) : state === "mastered" ? (
          <Check />
        ) : boss ? (
          <Crown />
        ) : (
          <TopicIcon title={skill.title} domainId={skill.domainId} />
        )}
      </span>
      <b>{text.title}</b>
      <small>{state.replace("-", " ")}</small>
    </button>
  );
}
function TalentInspector({ skill }: { skill: Skill }) {
  const { progress } = useProgress();
  const { t, language } = useLanguage();
  const text = localizeSkill(skill, language);
  const state = stateFor(skill, progress);
  return (
    <aside className="talent-inspector">
      <div className="inspector-rank">
        <span>{skill.tier}</span>
        <div>
          <small>RANK / TIER</small>
          <b>
            Tier {skill.tier} · {skill.difficulty}
          </b>
        </div>
      </div>
      <h2 id="talent-modal-title">{text.title}</h2>
      <p>{text.description}</p>
      <section>
        <h3>{t("prerequisites")}</h3>
        {skill.prerequisites.length ? (
          skill.prerequisites.map((id) => (
            <div
              className={progress.skills[id]?.state === "mastered" ? "met" : ""}
              key={id}
            >
              {progress.skills[id]?.state === "mastered" ? <Check /> : <Lock />}
              <span>
                {domains.flatMap((d) => d.skills).find((s) => s.id === id)
                  ? localizeSkill(
                      domains
                        .flatMap((d) => d.skills)
                        .find((s) => s.id === id)!,
                      language,
                    ).title
                  : undefined}
              </span>
            </div>
          ))
        ) : (
          <div className="met">
            <Check />
            <span>{t("foundation")}</span>
          </div>
        )}
      </section>
      <section>
        <h3>{t("masteryRewards")}</h3>
        <div className="reward">
          <Star />
          <span>
            {Object.values(skill.xp).reduce((a, b) => a + b, 0)} total XP
          </span>
        </div>
        <div className="reward">
          <GitBranch />
          <span>
            Unlocks {skill.unlocks.length} connected skill
            {skill.unlocks.length === 1 ? "" : "s"}
          </span>
        </div>
      </section>
      <dl>
        <dt>{t("theory")}</dt>
        <dd>{skill.theoryMinutes} min</dd>
        <dt>{t("practice")}</dt>
        <dd>{skill.practiceMinutes} min</dd>
      </dl>
      <Link
        className="button major"
        aria-disabled={state === "locked"}
        to={state === "locked" ? "#" : `/skill/${skill.id}`}
      >
        {state === "locked" ? t("skillLocked") : t("enterLesson")}
        <ArrowRight />
      </Link>
      {state === "locked" && (
        <small className="lock-reason">
          Master every listed prerequisite to open this skill.
        </small>
      )}
    </aside>
  );
}
