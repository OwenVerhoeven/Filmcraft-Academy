import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpenCheck,
  Crown,
  Medal,
  Star,
  Trophy,
} from "lucide-react";
import type { AccountName } from "./auth";
import { useAuth } from "./auth";
import { allSkills, domains } from "./content/curriculum";
import type { AppProgress } from "./content/model";
import { useLanguage } from "./i18n";
import {
  achievements,
  completePercent,
  domainPercent,
  levelForXp,
  specializations,
} from "./lib/progression";
import { loadProgress } from "./lib/storage";
import { useProgress } from "./state";

const accounts: AccountName[] = ["SinbodWayne", "KyanWayne"];

function stats(progress: AppProgress) {
  const mastered = allSkills.filter(
    (skill) => progress.skills[skill.id]?.state === "mastered",
  );
  const evidence = Object.values(progress.skills).filter(
    (skill) => skill.evidence,
  ).length;
  const bosses = domains.filter(
    (domain) => progress.skills[domain.skills.at(-1)!.id]?.state === "mastered",
  ).length;
  return {
    level: levelForXp(progress.xp),
    mastered: mastered.length,
    evidence,
    bosses,
    domains: domains.filter((domain) => domainPercent(domain.id, progress) === 100)
      .length,
    achievements: achievements.filter((achievement) => achievement.test(progress))
      .length,
    completion: completePercent(progress),
    specialization: specializations(progress)[0]?.title,
    recent: mastered
      .sort((a, b) =>
        (progress.skills[b.id]?.masteredAt ?? "").localeCompare(
          progress.skills[a.id]?.masteredAt ?? "",
        ),
      )
      .slice(0, 3),
  };
}

export function HallOfFame() {
  const { user } = useAuth();
  const { progress } = useProgress();
  const { language } = useLanguage();
  const [profiles, setProfiles] = useState<Record<AccountName, AppProgress> | null>(
    null,
  );

  useEffect(() => {
    let active = true;
    Promise.all(accounts.map((account) => loadProgress(account))).then((loaded) => {
      if (!active) return;
      setProfiles({ SinbodWayne: loaded[0], KyanWayne: loaded[1] });
    });
    return () => {
      active = false;
    };
  }, [progress.updatedAt]);

  const ranked = useMemo(() => {
    if (!profiles) return [];
    return accounts
      .map((name) => ({ name, progress: profiles[name], stats: stats(profiles[name]) }))
      .sort(
        (a, b) =>
          b.progress.xp - a.progress.xp || b.stats.mastered - a.stats.mastered,
      );
  }, [profiles]);

  const copy =
    language === "nl"
      ? {
          title: "Hall of Fame",
          intro: "Twee filmmakers. Twee reizen. Eén gedeelde maatstaf voor aantoonbaar vakmanschap.",
          current: "JIJ",
          level: "Niveau",
          xp: "Totale XP",
          mastery: "Beheerste vaardigheden",
          awards: "Prestaties",
          evidence: "Bewijsstukken",
          bosses: "Hoofdstukbazen",
          trees: "Voltooide skillbomen",
          recent: "Recent beheerst",
          start: "Nog geen vaardigheid beheerst op dit apparaat.",
          comparison: "Vergelijking per discipline",
          comparisonIntro: "Bekijk onmiddellijk waar iedere filmmaker voorligt en waar de volgende groeikans ligt.",
          academy: "Academie voltooid",
          lead: "VOORSPRONG",
          tied: "GELIJK",
          local: "De Hall of Fame vergelijkt de voortgang die op dit apparaat is opgeslagen.",
        }
      : {
          title: "Hall of Fame",
          intro: "Two filmmakers. Two journeys. One shared measure of evidence-backed craft.",
          current: "YOU",
          level: "Level",
          xp: "Total XP",
          mastery: "Skills mastered",
          awards: "Achievements",
          evidence: "Evidence pieces",
          bosses: "Chapter bosses",
          trees: "Skill trees completed",
          recent: "Recently mastered",
          start: "No skill mastered on this device yet.",
          comparison: "Discipline comparison",
          comparisonIntro: "See where each filmmaker leads and where the next opportunity for growth sits.",
          academy: "Academy complete",
          lead: "LEADING",
          tied: "TIED",
          local: "The Hall of Fame compares progress saved on this device.",
        };

  if (!profiles)
    return (
      <div className="page hall-of-fame">
        <div className="hall-loading">{copy.title}…</div>
      </div>
    );

  return (
    <div className="page hall-of-fame">
      <div className="page-title hall-title">
        <div>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>
        <span className="hall-local-note">{copy.local}</span>
      </div>

      <section className="hall-podium" aria-label={copy.title}>
        {ranked.map(({ name, progress: accountProgress, stats: accountStats }, index) => (
          <article
            className={`hall-profile hall-rank-${index + 1}${name === user ? " current" : ""}`}
            key={name}
          >
            <div className="hall-rank" aria-label={`Rank ${index + 1}`}>
              {index === 0 ? <Crown /> : <Medal />}
              <strong>0{index + 1}</strong>
            </div>
            <div className="hall-identity">
              <div className="hall-avatar">{name.slice(0, 1)}</div>
              <div>
                <small>{name === user ? copy.current : "FILMMAKER"}</small>
                <h2>{name}</h2>
                <p>{accountStats.specialization ?? "FilmCraft Apprentice"}</p>
              </div>
              <div className="hall-level">
                <strong>{accountStats.level}</strong>
                <span>{copy.level}</span>
              </div>
            </div>
            <div className="hall-overall">
              <div>
                <strong>{accountStats.completion}%</strong>
                <span>{copy.academy}</span>
              </div>
              <progress value={accountStats.completion} max="100" />
            </div>
            <div className="hall-metrics">
              <div><Star /><strong>{accountProgress.xp.toLocaleString()}</strong><span>{copy.xp}</span></div>
              <div><BookOpenCheck /><strong>{accountStats.mastered}/{allSkills.length}</strong><span>{copy.mastery}</span></div>
              <div><Trophy /><strong>{accountStats.achievements}/{achievements.length}</strong><span>{copy.awards}</span></div>
              <div><Award /><strong>{accountStats.evidence}</strong><span>{copy.evidence}</span></div>
              <div><Crown /><strong>{accountStats.bosses}/{domains.length}</strong><span>{copy.bosses}</span></div>
              <div><Medal /><strong>{accountStats.domains}/{domains.length}</strong><span>{copy.trees}</span></div>
            </div>
            <div className="hall-recent">
              <small>{copy.recent}</small>
              {accountStats.recent.length ? (
                <ul>
                  {accountStats.recent.map((skill) => <li key={skill.id}>{skill.title}</li>)}
                </ul>
              ) : (
                <p>{copy.start}</p>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="hall-disciplines">
        <div className="hall-section-heading">
          <div>
            <h2>{copy.comparison}</h2>
            <p>{copy.comparisonIntro}</p>
          </div>
          <div className="hall-legend">
            <span>{accounts[0]}</span><span>{accounts[1]}</span>
          </div>
        </div>
        <div className="hall-domain-list">
          {domains.map((domain) => {
            const first = domainPercent(domain.id, profiles.SinbodWayne);
            const second = domainPercent(domain.id, profiles.KyanWayne);
            const leader = first === second ? null : first > second ? accounts[0] : accounts[1];
            return (
              <div className="hall-domain-row" key={domain.id}>
                <div className="hall-domain-name">
                  <strong>{domain.short}</strong>
                  <span>{leader ? `${leader} · ${copy.lead}` : copy.tied}</span>
                </div>
                <div className="hall-domain-score first">
                  <progress value={first} max="100" /><b>{first}%</b>
                </div>
                <div className="hall-domain-score second">
                  <progress value={second} max="100" /><b>{second}%</b>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
