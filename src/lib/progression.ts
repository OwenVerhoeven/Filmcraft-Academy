import { allSkills, domains, finalBoss } from "../content/curriculum";
import type {
  AppProgress,
  Skill,
  SkillProgress,
  SkillState,
} from "../content/model";

export const skillsWithBoss = [...allSkills, finalBoss];
export const skillMap = new Map(skillsWithBoss.map((s) => [s.id, s]));
export const MAX_LEVEL = 100;
export const totalPossibleXp = skillsWithBoss.reduce(
  (sum, s) => sum + Object.values(s.xp).reduce((a, b) => a + b, 0),
  0,
);
const levelCurve = Array.from(
  { length: MAX_LEVEL },
  (_, i) => Math.pow((i + 1) / MAX_LEVEL, 1.55) * totalPossibleXp,
);
export const levelForXp = (xp: number) =>
  Math.min(MAX_LEVEL, levelCurve.filter((t) => xp >= t).length + 1);
export const xpForLevel = (level: number) =>
  level <= 1 ? 0 : Math.round(levelCurve[Math.min(MAX_LEVEL - 1, level - 2)]);
export const xpForNextLevel = (level: number) =>
  level >= MAX_LEVEL ? totalPossibleXp : Math.round(levelCurve[level - 1]);

export function initialSkillProgress(): SkillProgress {
  return {
    state: "locked",
    theory: false,
    check: false,
    practice: false,
    rubric: {},
    xpEvents: [],
  };
}
export function createInitialProgress(): AppProgress {
  const now = new Date().toISOString();
  return {
    version: 1,
    xp: 0,
    skills: {},
    reducedMotion: false,
    sound: false,
    createdAt: now,
    updatedAt: now,
  };
}
export function prerequisitesMet(skill: Skill, progress: AppProgress) {
  return skill.prerequisites.every(
    (id) => progress.skills[id]?.state === "mastered",
  );
}
export function stateFor(skill: Skill, progress: AppProgress): SkillState {
  const p = progress.skills[skill.id];
  if (p?.state === "mastered") return "mastered";
  if (!prerequisitesMet(skill, progress)) return "locked";
  if (progress.activeSkillId === skill.id) return "active";
  if (p?.theory && !p.practice) return "theory-complete";
  if (p?.practice && !p.evidence) return "evidence-pending";
  return "available";
}
export function award(
  progress: AppProgress,
  skill: Skill,
  event: keyof Skill["xp"],
) {
  const p = progress.skills[skill.id] ?? initialSkillProgress();
  const key = `${skill.id}:${event}`;
  if (p.xpEvents.includes(key)) return progress;
  p.xpEvents = [...p.xpEvents, key];
  return {
    ...progress,
    xp: progress.xp + skill.xp[event],
    skills: { ...progress.skills, [skill.id]: p },
    updatedAt: new Date().toISOString(),
  };
}
export function masteryEligible(skill: Skill, p: SkillProgress) {
  const score = Object.values(p.rubric).reduce((a, b) => a + b, 0);
  const max = skill.rubric.reduce((a, b) => a + b.max, 0);
  return (
    p.theory &&
    p.check &&
    p.practice &&
    !!p.evidence &&
    score / max >= 0.66 &&
    skill.rubric.every((r) => (p.rubric[r.id] ?? 0) > 0)
  );
}
export function completePercent(progress: AppProgress) {
  const mastered = allSkills.filter(
    (s) => progress.skills[s.id]?.state === "mastered",
  ).length;
  return Math.round((mastered / allSkills.length) * 100);
}
export function domainPercent(domainId: string, progress: AppProgress) {
  const list = domains.find((d) => d.id === domainId)?.skills ?? [];
  return Math.round(
    (list.filter((s) => progress.skills[s.id]?.state === "mastered").length /
      list.length) *
      100,
  );
}
export function finalBossReady(progress: AppProgress) {
  return finalBoss.prerequisites.every(
    (id) => progress.skills[id]?.state === "mastered",
  );
}
export function overallComplete(progress: AppProgress) {
  return (
    completePercent(progress) === 100 &&
    progress.skills[finalBoss.id]?.state === "mastered"
  );
}
export function specializations(progress: AppProgress) {
  return domains
    .map((d) => ({
      title: `${d.short} Specialist`,
      value: domainPercent(d.id, progress),
    }))
    .filter((x) => x.value >= 50)
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);
}
const mastered = (p: AppProgress) =>
  Object.values(p.skills).filter((s) => s.state === "mastered").length;
const evidence = (p: AppProgress) =>
  Object.values(p.skills).filter((s) => s.evidence).length;
const masteredIn = (p: AppProgress, id: string) =>
  domains
    .find((d) => d.id === id)
    ?.skills.filter((s) => p.skills[s.id]?.state === "mastered").length ?? 0;
const chapters = (p: AppProgress) =>
  domains.filter((d) => domainPercent(d.id, p) === 100).length;
const bosses = (p: AppProgress) =>
  domains.filter((d) => p.skills[d.skills.at(-1)!.id]?.state === "mastered")
    .length;

export const achievements = [
  {
    id: "first-light",
    title: "First Light",
    description: "Master your first talent and expose the path ahead.",
    test: (p: AppProgress) => mastered(p) >= 1,
  },
  {
    id: "three-point-landing",
    title: "Three-Point Landing",
    description: "Master three talents in a single discipline.",
    test: (p: AppProgress) => domains.some((d) => masteredIn(p, d.id) >= 3),
  },
  {
    id: "contact-sheet",
    title: "Contact Sheet",
    description: "Master ten talents across the academy.",
    test: (p: AppProgress) => mastered(p) >= 10,
  },
  {
    id: "reel-builder",
    title: "Reel Builder",
    description: "Master twenty-five talents.",
    test: (p: AppProgress) => mastered(p) >= 25,
  },
  {
    id: "hundred-frames",
    title: "A Hundred Frames",
    description: "Master one hundred talents—the library now answers back.",
    test: (p: AppProgress) => mastered(p) >= 100,
  },
  {
    id: "cross-trained",
    title: "Cross-Trained",
    description: "Master talents in five different disciplines.",
    test: (p: AppProgress) =>
      domains.filter((d) => domainPercent(d.id, p) > 0).length >= 5,
  },
  {
    id: "polymath",
    title: "The Polymath Cut",
    description: "Master at least one talent in every discipline.",
    test: (p: AppProgress) => domains.every((d) => domainPercent(d.id, p) > 0),
  },
  {
    id: "proof-not-vibes",
    title: "Proof, Not Vibes",
    description: "Store evidence for five practical studies.",
    test: (p: AppProgress) => evidence(p) >= 5,
  },
  {
    id: "archive-keeper",
    title: "Archive Keeper",
    description: "Build an evidence vault of twenty studies.",
    test: (p: AppProgress) => evidence(p) >= 20,
  },
  {
    id: "field-notes",
    title: "Margins Full of Notes",
    description: "Preserve evidence for fifty lessons.",
    test: (p: AppProgress) => evidence(p) >= 50,
  },
  {
    id: "chapter-complete",
    title: "Chapter Conqueror",
    description: "Complete an entire talent tree.",
    test: (p: AppProgress) => chapters(p) >= 1,
  },
  {
    id: "double-feature",
    title: "Double Feature",
    description: "Complete two entire talent trees.",
    test: (p: AppProgress) => chapters(p) >= 2,
  },
  {
    id: "festival-run",
    title: "Festival Run",
    description: "Complete eight talent trees.",
    test: (p: AppProgress) => chapters(p) >= 8,
  },
  {
    id: "camera-whisperer",
    title: "The Camera Whisperer",
    description: "Complete Camera Fundamentals & Exposure.",
    test: (p: AppProgress) => domainPercent("camera", p) === 100,
  },
  {
    id: "glass-cartographer",
    title: "Cartographer of Glass",
    description: "Complete Lenses & Optics.",
    test: (p: AppProgress) => domainPercent("lenses", p) === 100,
  },
  {
    id: "frame-architect",
    title: "Architect of the Frame",
    description: "Complete Composition & Visual Language.",
    test: (p: AppProgress) => domainPercent("composition", p) === 100,
  },
  {
    id: "light-bender",
    title: "Light Bender",
    description: "Complete Lighting.",
    test: (p: AppProgress) => domainPercent("lighting", p) === 100,
  },
  {
    id: "motion-rider",
    title: "Motion Rider",
    description: "Complete Camera Movement & Stabilization.",
    test: (p: AppProgress) => domainPercent("movement", p) === 100,
  },
  {
    id: "room-tone",
    title: "Keeper of Room Tone",
    description: "Complete Sound Theory & Recording.",
    test: (p: AppProgress) => domainPercent("sound", p) === 100,
  },
  {
    id: "scene-shaper",
    title: "Scene Shaper",
    description: "Complete Storytelling & Directing.",
    test: (p: AppProgress) => domainPercent("story", p) === 100,
  },
  {
    id: "invisible-cut",
    title: "The Invisible Cut",
    description: "Complete Editing Theory.",
    test: (p: AppProgress) => domainPercent("editing", p) === 100,
  },
  {
    id: "chromatic-alchemist",
    title: "Chromatic Alchemist",
    description: "Complete Color Theory & Image Finishing.",
    test: (p: AppProgress) => domainPercent("color", p) === 100,
  },
  {
    id: "resolve-nodeweaver",
    title: "Nodeweaver",
    description: "Complete the DaVinci Resolve talent tree.",
    test: (p: AppProgress) => domainPercent("resolve", p) === 100,
  },
  {
    id: "raw-alchemist",
    title: "RAW Alchemist",
    description: "Complete the BMCC 2.5K RAW talent tree.",
    test: (p: AppProgress) => domainPercent("bmcc", p) === 100,
  },
  {
    id: "ronin-rider",
    title: "Ronin Rider",
    description: "Complete the DJI Ronin-M talent tree.",
    test: (p: AppProgress) => domainPercent("ronin", p) === 100,
  },
  {
    id: "boss-hunter",
    title: "Boss Hunter",
    description: "Defeat four chapter bosses.",
    test: (p: AppProgress) => bosses(p) >= 4,
  },
  {
    id: "boss-slayer",
    title: "Sixteen Crowns",
    description: "Defeat every chapter boss.",
    test: (p: AppProgress) => bosses(p) === domains.length,
  },
  {
    id: "xp-1000",
    title: "First Thousand Feet",
    description: "Earn 1,000 XP through study and practice.",
    test: (p: AppProgress) => p.xp >= 1000,
  },
  {
    id: "xp-10000",
    title: "Ten Thousand Takes",
    description: "Earn 10,000 XP across the craft.",
    test: (p: AppProgress) => p.xp >= 10000,
  },
  {
    id: "academy-complete",
    title: "FilmCraft Master",
    description: "Complete the final production and the entire academy.",
    test: overallComplete,
  },
];
