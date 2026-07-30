import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "./router";
import {
  ArrowRight,
  BookOpen,
  Check,
  Crown,
  Download,
  ExternalLink,
  Eye,
  Flame,
  Images,
  Lock,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Upload,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { allSkills, domains, finalBoss } from "./content/curriculum";
import { SkillNode } from "./components/SkillNode";
import { LessonVisual } from "./components/LessonVisual";
import { DomainIcon } from "./components/TopicIcon";
import { useProgress } from "./state";
import {
  achievements,
  completePercent,
  domainPercent,
  finalBossReady,
  levelForXp,
  overallComplete,
  specializations,
  stateFor,
  skillMap,
} from "./lib/progression";
import { exportProgress, importProgress } from "./lib/storage";
import { useLanguage } from "./i18n";
import { localizeSkill } from "./content/localize";

const mastered = (id: string, p: ReturnType<typeof useProgress>["progress"]) =>
  p.skills[id]?.state === "mastered";

const constellationPoints = [
  [50, 8], [70, 13], [86, 25], [93, 44], [90, 65], [76, 82], [57, 91], [37, 89],
  [19, 78], [8, 60], [8, 38], [19, 20], [50, 28], [70, 47], [52, 70], [30, 49],
];

function DomainConstellation({ progress }: { progress: ReturnType<typeof useProgress>["progress"] }) {
  const [focused, setFocused] = useState<number | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const focusedDomain = focused === null ? null : domains[focused];
  const moveField = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    fieldRef.current?.style.setProperty("--sky-x", `${x * 12}px`);
    fieldRef.current?.style.setProperty("--sky-y", `${y * 9}px`);
    fieldRef.current?.style.setProperty("--sky-back-x", `${x * -4.2}px`);
    fieldRef.current?.style.setProperty("--sky-back-y", `${y * -3.15}px`);
    fieldRef.current?.style.setProperty("--sky-front-x", `${x * 8.4}px`);
    fieldRef.current?.style.setProperty("--sky-front-y", `${y * 6.3}px`);
    fieldRef.current?.style.setProperty("--sky-core-x", `${x * 2.2}px`);
    fieldRef.current?.style.setProperty("--sky-core-y", `${y * 1.6}px`);
    fieldRef.current?.style.setProperty("--sky-star-x", `${x * 4.2}px`);
    fieldRef.current?.style.setProperty("--sky-star-y", `${y * 3.15}px`);
  };
  return (
    <div
      className={`constellation-field ${focused !== null ? "is-exploring" : ""}`}
      ref={fieldRef}
      onPointerMove={moveField}
      onPointerLeave={() => {
        fieldRef.current?.style.setProperty("--sky-x", "0px");
        fieldRef.current?.style.setProperty("--sky-y", "0px");
        fieldRef.current?.style.setProperty("--sky-back-x", "0px");
        fieldRef.current?.style.setProperty("--sky-back-y", "0px");
        fieldRef.current?.style.setProperty("--sky-front-x", "0px");
        fieldRef.current?.style.setProperty("--sky-front-y", "0px");
        fieldRef.current?.style.setProperty("--sky-core-x", "0px");
        fieldRef.current?.style.setProperty("--sky-core-y", "0px");
        fieldRef.current?.style.setProperty("--sky-star-x", "0px");
        fieldRef.current?.style.setProperty("--sky-star-y", "0px");
        setFocused(null);
      }}
    >
      <div className="cosmic-dust" aria-hidden="true">
        {Array.from({ length: 28 }, (_, index) => (
          <i
            key={index}
            style={{
              left: `${(index * 37) % 97}%`,
              top: `${(index * 61) % 93}%`,
              width: `${1 + (index % 3)}px`,
              height: `${1 + (index % 3)}px`,
              animationDuration: `${2.4 + (index % 6) * 0.48}s`,
              animationDelay: `${index * -0.23}s`,
            }}
          />
        ))}
      </div>
      <div className="meteor meteor-one" aria-hidden="true" />
      <div className="meteor meteor-two" aria-hidden="true" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <ellipse className="orbit-ring orbit-outer" cx="50" cy="50" rx="44" ry="42" />
        <ellipse className="orbit-ring orbit-inner" cx="50" cy="50" rx="28" ry="25" />
        {domains.map((domain, index) => {
          const [x, y] = constellationPoints[index] ?? [50, 50];
          return <path className={`constellation-route ${focused === index ? "active" : ""}`} key={domain.id} d={`M 50 50 Q ${(50 + x) / 2 + (index % 2 ? 4 : -4)} ${(50 + y) / 2} ${x} ${y}`} />;
        })}
      </svg>
      <div className="constellation-core">
        <Sparkles />
        <strong>{completePercent(progress)}%</strong>
        <span>FILMCRAFT</span>
      </div>
      {domains.map((domain, index) => {
        const [x, y] = constellationPoints[index] ?? [50, 50];
        const percent = domainPercent(domain.id, progress);
        return (
          <Link
            className={`constellation-star ${percent === 100 ? "complete" : ""}`}
            to={`/talent-tree/${domain.id}`}
            key={domain.id}
            style={{ left: `${x}%`, top: `${y}%`, "--color": domain.color, "--delay": `${index * -0.37}s`, "--star-index": index } as React.CSSProperties}
            aria-label={`${domain.title}: ${percent}% complete`}
            onPointerEnter={() => setFocused(index)}
            onFocus={() => setFocused(index)}
            onBlur={() => setFocused(null)}
          >
            <i><DomainIcon domainId={domain.id} /></i>
            <span>{domain.short}</span>
            <small>{percent}%</small>
          </Link>
        );
      })}
      <div className={`constellation-readout ${focusedDomain ? "visible" : ""}`} aria-live="polite">
        <small>EXPLORE DOMAIN</small>
        <strong>{focusedDomain?.title ?? "Choose a star"}</strong>
        <span>{focusedDomain ? `${domainPercent(focusedDomain.id, progress)}% mastered · open skill constellation` : "Move through the sky to trace your next path"}</span>
      </div>
    </div>
  );
}
export function Dashboard() {
  const { progress } = useProgress();
  const { language } = useLanguage();
  const available = allSkills
    .filter((s) => stateFor(s, progress) === "available")
    .slice(0, 5);
  const active = progress.activeSkillId
    ? skillMap.get(progress.activeSkillId)
    : available[0];
  const activeText = active ? localizeSkill(active, language) : null;
  const recent = allSkills
    .filter((s) => mastered(s.id, progress))
    .sort((a, b) =>
      (progress.skills[b.id].masteredAt ?? "").localeCompare(
        progress.skills[a.id].masteredAt ?? "",
      ),
    )
    .slice(0, 4);
  return (
    <div className="page dashboard">
      <div className="page-title">
        <div>
          <h1>Your Journey</h1>
          <p>Master filmmaking, frame by frame.</p>
        </div>
        <Link className="button secondary" to="/worlds">
          Journey map <ArrowRight />
        </Link>
      </div>
      <section className="dashboard-grid">
        <div className="progress-panel panel">
          <div
            className="ring"
            style={
              {
                "--progress": `${completePercent(progress) * 3.6}deg`,
              } as React.CSSProperties
            }
          >
            <strong>{completePercent(progress)}%</strong>
            <span>complete</span>
          </div>
          <div className="domain-bars">
            {domains.slice(0, 8).map((d) => (
              <div key={d.id}>
                <span>{d.short}</span>
                <progress value={domainPercent(d.id, progress)} max="100" />
                <b>{domainPercent(d.id, progress)}%</b>
              </div>
            ))}
          </div>
        </div>
        <div className="active-panel panel">
          <small>ACTIVE LESSON</small>
          {active ? (
            <>
              <h2>{activeText!.title}</h2>
              <p>{activeText!.description}</p>
              <div className="lesson-meta">
                <span>{active.theoryMinutes} min theory</span>
                <span>{active.practiceMinutes} min practice</span>
              </div>
              <Link className="button" to={`/skill/${active.id}`}>
                <Play /> Continue lesson
              </Link>
            </>
          ) : (
            <p>Every core skill is mastered. The final frame awaits.</p>
          )}
        </div>
        <aside className="quest-panel panel">
          <div className="section-head">
            <h2>Current quests</h2>
            <Link to="/quests">View all</Link>
          </div>
          {available.slice(0, 4).map((s) => (
            <SkillNode key={s.id} skill={s} compact />
          ))}
          <div
            className={`boss-tease ${finalBossReady(progress) ? "ready" : ""}`}
          >
            <Crown />
            <div>
              <small>FINAL BOSS</small>
              <b>BEGGIN' FOR FUEL</b>
              <span>
                {finalBossReady(progress)
                  ? "Ready to begin"
                  : "Complete every domain boss"}
              </span>
            </div>
          </div>
        </aside>
      </section>
      <section>
        <div className="section-head">
          <h2>Possible next steps</h2>
          <span>Choose your discipline</span>
        </div>
        <div className="next-rail">
          {available.map((s) => (
            <SkillNode key={s.id} skill={s} />
          ))}
        </div>
      </section>
      <section className="lower-grid">
        <div className="panel">
          <div className="section-head">
            <h2>Recent mastery</h2>
            <Link to="/codex">Open codex</Link>
          </div>
          {recent.length ? (
            recent.map((s) => (
              <div className="feed" key={s.id}>
                <ShieldCheck />
                <div>
                  <b>{s.title}</b>
                  <span>{domains.find((d) => d.id === s.domainId)?.title}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty">
              <Sparkles />
              <p>Your first mastered skill will appear here.</p>
            </div>
          )}
        </div>
        <div className="panel constellation">
          <div className="section-head">
            <h2>Domain constellation</h2>
            <Link to="/worlds">View domains</Link>
          </div>
          <DomainConstellation progress={progress} />
        </div>
      </section>
    </div>
  );
}

export function Worlds() {
  const { progress } = useProgress();
  return (
    <div className="page">
      <div className="page-title">
        <div>
          <h1>Domain Worlds</h1>
          <p>
            Choose any available discipline. Cross-tree gates preserve a
            coherent craft journey.
          </p>
        </div>
      </div>
      <div className="world-list">
        {domains.map((d, i) => (
          <Link
            to={`/world/${d.id}`}
            className="world-row"
            key={d.id}
            style={{ "--color": d.color } as React.CSSProperties}
          >
            <span className="world-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2>{d.title}</h2>
              <p>{d.description}</p>
            </div>
            <div className="world-progress">
              <strong>{domainPercent(d.id, progress)}%</strong>
              <progress value={domainPercent(d.id, progress)} max="100" />
              <span>
                {d.skills.filter((s) => mastered(s.id, progress)).length}/
                {d.skills.length} mastered
              </span>
            </div>
            <ArrowRight />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Tree() {
  const { id } = useParams();
  const domain = domains.find((d) => d.id === id);
  const { progress } = useProgress();
  const [zoom, setZoom] = useState(1);
  if (!domain) return <NavigateWorld />;
  return (
    <div className="page tree-page">
      <div className="page-title">
        <div>
          <Link className="back" to="/worlds">
            ← All worlds
          </Link>
          <h1>{domain.title}</h1>
          <p>{domain.description}</p>
        </div>
        <div className="tree-actions">
          <button
            onClick={() => setZoom(Math.max(0.7, zoom - 0.1))}
            aria-label="Zoom out"
          >
            <ZoomOut />
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom(Math.min(1.4, zoom + 0.1))}
            aria-label="Zoom in"
          >
            <ZoomIn />
          </button>
        </div>
      </div>
      <div
        className="tree-canvas"
        style={{ "--domain": domain.color } as React.CSSProperties}
      >
        <div className="tree-track" style={{ transform: `scale(${zoom})` }}>
          {domain.skills.map((s, i) => (
            <div className="tree-step" key={s.id}>
              {i > 0 && (
                <span
                  className={`connector ${mastered(domain.skills[i - 1].id, progress) ? "lit" : ""}`}
                />
              )}
              <SkillNode skill={s} />
              {s.prerequisites.some(
                (p) => !domain.skills.some((x) => x.id === p),
              ) && (
                <small className="cross-link">Cross-tree prerequisite</small>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="tree-legend">
        <span>
          <i className="locked" />
          Locked
        </span>
        <span>
          <i className="available" />
          Available
        </span>
        <span>
          <i className="active" />
          Active
        </span>
        <span>
          <i className="mastered" />
          Mastered
        </span>
      </div>
    </div>
  );
}
function NavigateWorld() {
  return (
    <div className="page">
      <h1>World not found</h1>
      <Link to="/worlds">Return to worlds</Link>
    </div>
  );
}

export function SkillView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const skill = skillMap.get(id ?? "");
  const ctx = useProgress();
  const { t, language } = useLanguage();
  const text = skill ? localizeSkill(skill, language) : null;
  const nl = language === "nl";
  const [answer, setAnswer] = useState<number | null>(null);
  const [reflection, setReflection] = useState("");
  const [link, setLink] = useState("");
  const [celebrating, setCelebrating] = useState(false);
  if (!skill) return <NavigateWorld />;
  const state = stateFor(skill, ctx.progress);
  const sp = ctx.progress.skills[skill.id];
  const started = ctx.progress.activeSkillId === skill.id || Boolean(sp);
  if (state === "locked")
    return (
      <div className="page locked-page">
        <Lock />
        <h1>{text!.title}</h1>
        <p>{t("skillLocked")}. Master its prerequisites first.</p>
        {skill.prerequisites.map((p) => (
          <SkillNode key={p} skill={skillMap.get(p)!} compact />
        ))}
      </div>
    );
  const score = skill.rubric.reduce((a, r) => a + (sp?.rubric[r.id] ?? 0), 0);
  const canMaster =
    sp?.theory &&
    sp.check &&
    sp.practice &&
    sp.evidence &&
    score / skill.rubric.reduce((a, r) => a + r.max, 0) >= 0.66;
  return (
    <div className="page lesson">
      {celebrating && (
        <div
          className="mastery-celebration"
          onAnimationEnd={() => setCelebrating(false)}
          aria-live="polite"
        >
          <div className="celebration-burst" />
          <Crown />
          <small>TALENT MASTERED</small>
          <strong>{text!.title}</strong>
          <span>+{skill.xp.mastery} mastery XP</span>
        </div>
      )}
      <div className="lesson-hero">
        <Link
          className="back"
          to={
            skill.domainId === "final"
              ? "/final-boss"
              : `/world/${skill.domainId}`
          }
        >
          {nl ? "← Terug naar " : "← Return to "}
          {skill.domainId === "final"
            ? nl
              ? "eindbaas"
              : "final boss"
            : nl
              ? "skillboom"
              : "skill tree"}
        </Link>
        <small>
          {nl ? "Fundamenten" : skill.section} · {nl ? "Niveau" : "Tier"}{" "}
          {skill.tier} ·{" "}
          {nl
            ? ["basis", "ontwikkelend", "gevorderd", "meesterschap"][
                Math.min(skill.tier - 1, 3)
              ]
            : skill.difficulty}
        </small>
        <h1>{text!.title}</h1>
        <p>{text!.description}</p>
        <div className="lesson-stats">
          <span>
            {skill.theoryMinutes} min {nl ? "theorie" : "theory"}
          </span>
          <span>
            {skill.practiceMinutes} min {nl ? "praktijk" : "practice"}
          </span>
          <span>{Object.values(skill.xp).reduce((a, b) => a + b, 0)} XP</span>
        </div>
        <button
          className={`button lesson-action ${started ? "is-complete" : "is-ready"}`}
          disabled={started}
          onClick={() => ctx.activate(skill)}
        >
          {started ? <Check /> : <Play />}
          {started ? (nl ? "Les gestart en opgeslagen" : "Lesson started · saved") : t("beginSkill")}
        </button>
      </div>
      <div className="lesson-layout">
        <article>
          <section>
            <h2>{t("whyMatters")}</h2>
            <p className="lead">{text!.why}</p>
            <h3>{t("objectives")}</h3>
            <ul>
              {text!.objectives.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
          <LessonVisual skill={skill} />
          {text!.theory.map((block, i) => (
            <section key={block.heading}>
              <span className="chapter">{String(i + 1).padStart(2, "0")}</span>
              <h2>{block.heading}</h2>
              <p>{block.body}</p>
            </section>
          ))}
          <section className="examples">
            <h2>{nl ? "Lees het resultaat" : "Read the result"}</h2>
            <div>
              <div>
                <h3>{nl ? "Sterke voorbeelden" : "Strong examples"}</h3>
                {text!.examples.map((x) => (
                  <p key={x}>{x}</p>
                ))}
              </div>
              <div>
                <h3>{nl ? "Veelgemaakte fouten" : "Common mistakes"}</h3>
                {text!.mistakes.map((x) => (
                  <p key={x}>{x}</p>
                ))}
              </div>
            </div>
            <button
              className={`button lesson-action ${sp?.theory ? "is-complete" : started ? "is-ready" : ""}`}
              disabled={!started || sp?.theory}
              onClick={() => ctx.completeTheory(skill)}
            >
              <Check />
              {sp?.theory ? (nl ? "Theorie voltooid · opgeslagen" : "Theory complete · saved") : (nl ? "Theorie als voltooid markeren" : "Mark theory complete")}
            </button>
          </section>
          <section>
            <h2>{t("knowledgeCheck")}</h2>
            <p className="lead">
              {nl
                ? `Welke werkwijze toont beheersing van ${text!.title.toLowerCase()} in een nieuwe productiecontext?`
                : skill.check.prompt}
            </p>
            <div className="options">
              {(nl
                ? [
                    "Een onthouden instelling kopiëren en niets veranderen",
                    "Intentie bepalen, variabelen beheersen, bewijs vergelijken en de afweging documenteren",
                    "Het meest extreme zichtbare resultaat kiezen",
                    "Elke beslissing uitstellen tot de export",
                  ]
                : skill.check.options
              ).map((o, i) => (
                <button
                  key={o}
                  className={answer === i ? "selected" : ""}
                  onClick={() => setAnswer(i)}
                >
                  {String.fromCharCode(65 + i)}. {o}
                </button>
              ))}
            </div>
            {answer !== null && (
              <div
                className={
                  skill.check.correct.includes(answer)
                    ? "feedback correct"
                    : "feedback"
                }
              >
                {skill.check.correct.includes(answer)
                  ? "Correct. "
                  : nl
                    ? "Bekijk deze keuze opnieuw. "
                    : "Review this choice. "}
                {nl
                  ? "Een overdraagbare vakbeslissing begint met intentie, beheerst variabelen, gebruikt bewijs en legt gevolgen vast zodat het resultaat kan worden herhaald of herzien."
                  : skill.check.explanation}
              </div>
            )}
            <button
              className={`button lesson-action ${sp?.check ? "is-complete" : answer !== null && skill.check.correct.includes(answer) ? "is-ready" : ""}`}
              disabled={
                Boolean(sp?.check) || answer === null || !skill.check.correct.includes(answer)
              }
              onClick={() => ctx.submitCheck(skill)}
            >
              {sp?.check ? (nl ? "Kennistoets behaald · opgeslagen" : "Knowledge check passed · saved") : (nl ? "Antwoord indienen" : "Submit check")}
            </button>
          </section>
          <section>
            <h2>{t("assignment")}</h2>
            <span className="assignment-type">
              {nl ? "PRAKTIJKSTUDIE" : skill.assignment.type}
            </span>
            <p className="lead">
              {nl
                ? `Maak een gecontroleerde studie van ${text!.title.toLowerCase()}. Benoem het beoogde effect op de kijker, maak ten minste twee betekenisvol verschillende versies, bewaar instellingen of een reproduceerbare procedure en vergelijk de gevolgen voor verhaal, technische kwaliteit, verdere workflow en praktische betrouwbaarheid. Sluit af met de versie die je zou gebruiken en waarom.`
                : skill.assignment.brief}
            </p>
            <h3>{nl ? "Verwacht resultaat" : "Expected deliverable"}</h3>
            <p>
              {nl
                ? "Een bondige reflectie met twee gelabelde resultaten of verwijzingen, de gebruikte instellingen en een gemotiveerde eindkeuze."
                : skill.assignment.deliverable}
            </p>
            <button
              className={`button lesson-action ${sp?.practice ? "is-complete" : sp?.check ? "is-ready" : ""}`}
              disabled={!sp?.check || sp.practice}
              onClick={() => ctx.submitPractice(skill)}
            >
              <Check />
              {sp?.practice ? (nl ? "Praktijk voltooid · opgeslagen" : "Practice complete · saved") : (nl ? "Praktijk als voltooid markeren" : "Mark practice complete")}
            </button>
          </section>
          <section>
            <h2>{nl ? "Zelfbeoordelingsrubric" : "Self-assessment rubric"}</h2>
            <div className="rubric">
              {skill.rubric.map((r) => (
                <div key={r.id}>
                  <div>
                    <b>
                      {nl
                        ? (["Intentie", "Uitvoering", "Beoordeling"][
                            skill.rubric.indexOf(r)
                          ] ?? r.label)
                        : r.label}
                    </b>
                    <p>
                      {nl
                        ? ([
                            "Het beoogde effect en de reden voor iedere keuze zijn duidelijk.",
                            "De methode is beheerst, reproduceerbaar en technisch betrouwbaar uitgevoerd.",
                            "De resultaten zijn kritisch vergeleken en vertaald naar een volgende toepassing.",
                          ][skill.rubric.indexOf(r)] ?? r.description)
                        : r.description}
                    </p>
                  </div>
                  <select
                    value={sp?.rubric[r.id] ?? 0}
                    onChange={(e) =>
                      ctx.setRubric(skill, r.id, Number(e.target.value))
                    }
                    aria-label={`${r.label} score`}
                  >
                    <option value="0">
                      {nl ? "Niet beoordeeld" : "Not scored"}
                    </option>
                    {Array.from({ length: r.max }, (_, i) => (
                      <option value={i + 1} key={i + 1}>
                        {i + 1} / {r.max}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <strong className="score">
              Score {score} / {skill.rubric.reduce((a, r) => a + r.max, 0)}
            </strong>
          </section>
          <section>
            <h2>{nl ? "Bewijs & reflectie" : "Evidence & reflection"}</h2>
            <p>
              {nl
                ? "Uploads zijn optioneel. Een reflectie en externe of lokale verwijzing houden je leerproces toegankelijk."
                : "Uploads are optional. A reflection and external or local reference keep learning unblocked."}
            </p>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder={
                nl
                  ? "Wat veranderde tussen de pogingen? Wat herhaal je de volgende keer?"
                  : "What changed between attempts? What will you repeat next time?"
              }
            />
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder={
                nl
                  ? "Optionele externe link of lokale verwijzing"
                  : "Optional external link or local reference"
              }
            />
            <button
              className={`button lesson-action ${sp?.evidence ? "is-complete" : reflection.trim().length >= 20 ? "is-ready" : ""}`}
              disabled={reflection.trim().length < 20}
              onClick={() => ctx.saveEvidence(skill, reflection, link)}
            >
              <Images />
              {sp?.evidence ? (nl ? "Opgeslagen bewijs bijwerken" : "Update saved evidence") : (nl ? "Bewijs opslaan" : "Save evidence")}
            </button>
          </section>
          <section>
            <h2>{t("references")}</h2>
            {skill.references.map((r) => (
              <a
                className="reference"
                href={r.url}
                target="_blank"
                rel="noreferrer"
                key={r.url}
              >
                <ExternalLink />
                <span>
                  <b>{r.title}</b>
                  <small>
                    {r.source} · {nl ? "geraadpleegd" : "accessed"} {r.accessed}
                  </small>
                </span>
              </a>
            ))}
          </section>
        </article>
        <aside className="mastery-panel">
          <small>{nl ? "BEHEERSINGSPROTOCOL" : "MASTERY PROTOCOL"}</small>
          {skill.mastery.map((m, i) => (
            <div
              key={m}
              className={
                (i === 0 && sp?.theory) ||
                (i === 1 && sp?.check) ||
                (i === 2 && sp?.practice) ||
                (i === 3 && score > 0) ||
                (i === 4 && sp?.evidence)
                  ? "done"
                  : ""
              }
            >
              <Check />
              <span>
                {nl
                  ? ([
                      "Voltooi elk theorieblok",
                      "Behaal de vereiste score voor de kennistoets",
                      "Lever de praktijkopdracht in",
                      "Beoordeel elk rubriccriterium en behaal minimaal 8/12",
                      "Bewaar een reflectie, link, bestand of lokale verwijzing",
                    ][i] ?? m)
                  : m}
              </span>
            </div>
          ))}
          <button
            className={`button major lesson-action ${sp?.state === "mastered" ? "is-complete" : canMaster ? "is-ready" : ""}`}
            disabled={!canMaster || sp?.state === "mastered"}
            onClick={() => {
              ctx.master(skill);
              setCelebrating(true);
              if (skill.id === finalBoss.id)
                setTimeout(() => navigate("/completion"), 200);
            }}
          >
            <Flame />
            {sp?.state === "mastered" ? (nl ? "Beheersing opgeslagen" : "Mastery recorded · saved") : t("masterSkill")}
          </button>
          <p>
            {canMaster
              ? nl
                ? "Aan alle voorwaarden voldaan. Leg je beheersing vast."
                : "All conditions met. Claim mastery."
              : nl
                ? "Voltooi iedere protocolvoorwaarde om beheersing vrij te spelen."
                : "Complete each protocol condition to unlock mastery."}
          </p>
        </aside>
      </div>
    </div>
  );
}

export function Quests() {
  const { progress } = useProgress();
  const [listMode, setListMode] = useState<"available" | "active" | "complete">(
    "available",
  );
  const list = allSkills.filter((s) =>
    listMode === "complete"
      ? mastered(s.id, progress)
      : listMode === "active"
        ? progress.activeSkillId === s.id
        : stateFor(s, progress) === "available",
  );
  return (
    <div className="page">
      <div className="page-title">
        <div>
          <h1>Quest Log</h1>
          <p>
            Assignments, chapter bosses and chosen work in one focused ledger.
          </p>
        </div>
      </div>
      <div className="tabs">
        {(["available", "active", "complete"] as const).map((x) => (
          <button
            className={listMode === x ? "active" : ""}
            onClick={() => setListMode(x)}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="quest-list">
        {list.map((s) => (
          <div className="quest-row" key={s.id}>
            <span>{s.assignment.type}</span>
            <div>
              <h2>{s.assignment.brief.split(". ")[0]}</h2>
              <p>
                {s.title} · {domains.find((d) => d.id === s.domainId)?.title}
              </p>
            </div>
            <Link className="button secondary" to={`/skill/${s.id}`}>
              Open <ArrowRight />
            </Link>
          </div>
        ))}
        {!list.length && (
          <div className="empty">
            <ScrollEmpty />
            <p>No quests in this state.</p>
          </div>
        )}
      </div>
    </div>
  );
}
function ScrollEmpty() {
  return <BookOpen />;
}

export function Character() {
  const { progress } = useProgress();
  const masteredCount = allSkills.filter((s) =>
    mastered(s.id, progress),
  ).length;
  const specs = specializations(progress);
  return (
    <div className="page">
      <div className="character-hero">
        <div className="character-emblem">
          <Star />
          <strong>{levelForXp(progress.xp)}</strong>
        </div>
        <div>
          <small>CURRENT TITLE</small>
          <h1>
            {overallComplete(progress)
              ? "FilmCraft Master"
              : (specs[0]?.title ?? "Apprentice Image Maker")}
          </h1>
          <blockquote className="cinema-quote">
            “Cinema is a matter of what’s in the frame and what’s out.”
            <cite>— Martin Scorsese</cite>
          </blockquote>
        </div>
        <div className="character-stats">
          <div>
            <strong>{progress.xp.toLocaleString()}</strong>
            <span>Total XP</span>
          </div>
          <div>
            <strong>{masteredCount}</strong>
            <span>Skills mastered</span>
          </div>
          <div>
            <strong>{completePercent(progress)}%</strong>
            <span>Overall</span>
          </div>
        </div>
      </div>
      <div className="character-grid">
        <section className="panel">
          <h2>Specializations</h2>
          {specs.length ? (
            specs.map((s) => (
              <div className="stat-row" key={s.title}>
                <span>{s.title}</span>
                <progress value={s.value} max="100" />
                <b>{s.value}%</b>
              </div>
            ))
          ) : (
            <p>Reach 50% in a domain to earn a specialization.</p>
          )}
        </section>
        <section className="panel">
          <h2>Domain statistics</h2>
          {domains.map((d) => (
            <div className="stat-row" key={d.id}>
              <span>{d.short}</span>
              <progress value={domainPercent(d.id, progress)} max="100" />
              <b>{domainPercent(d.id, progress)}%</b>
            </div>
          ))}
        </section>
        <section className="panel">
          <h2>Meaningful statistics</h2>
          <dl>
            <dt>Portfolio entries</dt>
            <dd>
              {Object.values(progress.skills).filter((s) => s.evidence).length}
            </dd>
            <dt>Chapter bosses</dt>
            <dd>
              {
                domains.filter((d) => mastered(d.skills.at(-1)!.id, progress))
                  .length
              }
            </dd>
            <dt>Domains touched</dt>
            <dd>
              {domains.filter((d) => domainPercent(d.id, progress) > 0).length}
            </dd>
            <dt>Active title</dt>
            <dd>{progress.selectedTitle ?? specs[0]?.title ?? "Apprentice"}</dd>
          </dl>
        </section>
      </div>
    </div>
  );
}

export function Achievements() {
  const { progress } = useProgress();
  return (
    <div className="page">
      <div className="page-title">
        <div>
          <h1>Achievements</h1>
          <p>Milestones earned through evidence-backed learning.</p>
        </div>
      </div>
      <div className="achievement-list">
        {achievements.map((a, i) => {
          const earned = a.test(progress);
          return (
            <div
              className={earned ? "achievement earned" : "achievement"}
              key={a.id}
            >
              <span>
                <Trophy />
              </span>
              <div>
                <small>ACHIEVEMENT {String(i + 1).padStart(2, "0")}</small>
                <h2>{a.title}</h2>
                <p>{a.description}</p>
              </div>
              <b>{earned ? "UNLOCKED" : "LOCKED"}</b>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Codex() {
  const { progress } = useProgress();
  const [q, setQ] = useState("");
  const list = allSkills.filter(
    (s) =>
      mastered(s.id, progress) &&
      `${s.title} ${s.description}`.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="page">
      <div className="page-title">
        <div>
          <h1>Mastered Codex</h1>
          <p>
            Your durable filmmaking reference grows with demonstrated mastery.
          </p>
        </div>
        <label className="search">
          <Search />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search mastered knowledge"
          />
        </label>
      </div>
      <div className="codex-list">
        {list.map((s) => (
          <Link to={`/skill/${s.id}`} key={s.id}>
            <BookOpen />
            <div>
              <small>{domains.find((d) => d.id === s.domainId)?.title}</small>
              <h2>{s.title}</h2>
              <p>{s.why}</p>
            </div>
            <ArrowRight />
          </Link>
        ))}
        {!list.length && (
          <div className="empty">
            <BookOpen />
            <p>Mastered lessons become searchable reference chapters here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Portfolio() {
  const { progress } = useProgress();
  const entries = Object.entries(progress.skills)
    .filter(([, p]) => p.evidence)
    .map(([id, p]) => ({ skill: skillMap.get(id)!, p }));
  return (
    <div className="page">
      <div className="page-title">
        <div>
          <h1>Evidence Gallery</h1>
          <p>
            Practice, reflection and portfolio references—not mandatory large
            uploads.
          </p>
        </div>
      </div>
      <div className="portfolio-grid">
        {entries.map(({ skill, p }) => (
          <article key={skill.id}>
            <div className="thumb">
              <Eye />
              <span>{skill.assignment.type}</span>
            </div>
            <small>{p.evidence!.createdAt.slice(0, 10)}</small>
            <h2>{skill.title}</h2>
            <p>{p.evidence!.reflection}</p>
            {p.evidence!.link && (
              <a href={p.evidence!.link} target="_blank" rel="noreferrer">
                <ExternalLink />
                Open reference
              </a>
            )}
            <div className="mini-rubric">
              {skill.rubric.map((r) => (
                <span key={r.id}>
                  {r.label} {p.rubric[r.id] ?? 0}/{r.max}
                </span>
              ))}
            </div>
          </article>
        ))}
        {!entries.length && (
          <div className="empty wide">
            <Images />
            <p>
              Evidence saved in a lesson will appear here with its assignment
              and rubric.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function SettingsView() {
  const { progress, setProgress, reset } = useProgress();
  const { language, setLanguage, t } = useLanguage();
  const file = useRef<HTMLInputElement>(null);
  return (
    <div className="page settings-page">
      <div className="page-title">
        <div>
          <h1>{t("settingsData")}</h1>
          <p>
            {language === "nl"
              ? "Je voortgang is van jou. Exporteer voordat je browsergegevens wist."
              : "Your progress belongs to you. Export before clearing browser data."}
          </p>
        </div>
      </div>
      <section className="settings-group">
        <h2>{t("experience")}</h2>
        <label>
          <span>
            <b>{t("language")}</b>
            <small>
              {language === "nl"
                ? "Engels is standaard. De interfacetaal verandert direct."
                : "English is the default. Interface language changes immediately."}
            </small>
          </span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "nl")}
            aria-label={t("language")}
          >
            <option value="en">{t("english")}</option>
            <option value="nl">{t("dutch")}</option>
          </select>
        </label>
        <label>
          <span>
            <b>{language === "nl" ? "Minder beweging" : "Reduced motion"}</b>
            <small>
              {language === "nl"
                ? "Vermindert ontgrendelanimaties en grote overgangen."
                : "Calm unlocks and disable large transitions."}
            </small>
          </span>
          <input
            type="checkbox"
            checked={progress.reducedMotion}
            onChange={(e) =>
              setProgress({ ...progress, reducedMotion: e.target.checked })
            }
          />
        </label>
        <label>
          <span>
            <b>{language === "nl" ? "Mijlpaalgeluid" : "Milestone sound"}</b>
            <small>
              {language === "nl"
                ? "Optioneel; gewone XP blijft stil."
                : "Optional; routine XP remains quiet."}
            </small>
          </span>
          <input
            type="checkbox"
            checked={progress.sound}
            onChange={(e) =>
              setProgress({ ...progress, sound: e.target.checked })
            }
          />
        </label>
      </section>
      <section className="settings-group">
        <h2>
          {language === "nl" ? "Eigenaarschap van gegevens" : "Data ownership"}
        </h2>
        <div className="setting-actions">
          <button className="button" onClick={() => exportProgress(progress)}>
            <Download />
            {language === "nl" ? "Back-up exporteren" : "Export backup"}
          </button>
          <button
            className="button secondary"
            onClick={() => file.current?.click()}
          >
            <Upload />
            {language === "nl" ? "Back-up importeren" : "Import backup"}
          </button>
          <input
            ref={file}
            hidden
            type="file"
            accept="application/json"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (f)
                try {
                  setProgress(await importProgress(f));
                } catch (err) {
                  alert((err as Error).message);
                }
            }}
          />
        </div>
        <p>
          Backups contain progress, rubric scores, reflections and
          external/local references. Large media is not copied.
        </p>
      </section>
      <section className="settings-group danger">
        <h2>Reset academy</h2>
        <p>
          This replaces current progress. Export first if you may want it later.
        </p>
        <button
          onClick={() => confirm("Reset all FilmCraft progress?") && reset()}
        >
          <RotateCcw />
          Reset local progress
        </button>
      </section>
    </div>
  );
}

export function FinalBoss() {
  const { progress } = useProgress();
  const ready = finalBossReady(progress);
  return (
    <div className="page final-hub">
      <div className="boss-hero">
        <Crown />
        <small>THE FINAL FRAME</small>
        <h1>BEGGIN' FOR FUEL</h1>
        <h2>Cinematic Music Video</h2>
        <p>{finalBoss.description}</p>
        <Link
          className="button major"
          aria-disabled={!ready}
          to={ready ? `/skill/${finalBoss.id}` : "#"}
        >
          {ready ? "Enter final boss" : "Complete every domain boss"}{" "}
          <ArrowRight />
        </Link>
      </div>
      <section>
        <h2>Readiness constellation</h2>
        <div className="readiness-list">
          {domains.map((d) => {
            const done = mastered(d.skills.at(-1)!.id, progress);
            return (
              <Link
                to={`/world/${d.id}`}
                key={d.id}
                className={done ? "done" : ""}
              >
                <span>{done ? <Check /> : <Lock />}</span>
                <div>
                  <b>{d.title}</b>
                  <small>
                    {done
                      ? "Chapter boss mastered"
                      : `${domainPercent(d.id, progress)}% complete`}
                  </small>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="boss-deliverables panel">
        <h2>Required final deliverables</h2>
        <p>{finalBoss.assignment.deliverable}</p>
        <div>
          {finalBoss.rubric.map((r) => (
            <span key={r.id}>
              {r.label}
              <b>{r.max} pts</b>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export function Completion() {
  const { progress } = useProgress();
  if (!overallComplete(progress))
    return (
      <div className="page locked-page">
        <Lock />
        <h1>The final frame is still ahead.</h1>
        <Link to="/final-boss">Return to final boss</Link>
      </div>
    );
  return (
    <div className="page completion">
      <ApertureComplete />
      <small>CURRICULUM COMPLETE</small>
      <h1>FilmCraft Master</h1>
      <p>
        You completed every required skill and defended BEGGIN' FOR FUEL. The
        Academy is now a codex; the craft continues in your work.
      </p>
      <div>
        <strong>{progress.xp.toLocaleString()} XP</strong>
        <strong>{allSkills.length + 1} Masteries</strong>
        <strong>
          {Object.values(progress.skills).filter((s) => s.evidence).length}{" "}
          Portfolio Entries
        </strong>
      </div>
      <Link className="button major" to="/portfolio">
        Open final portfolio
      </Link>
    </div>
  );
}
function ApertureComplete() {
  return (
    <div className="completion-mark">
      <Crown />
    </div>
  );
}
