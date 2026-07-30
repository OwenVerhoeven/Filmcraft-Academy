import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
export type Language = "en" | "nl";
const copy = {
  en: {
    journey: "Journey",
    skillTrees: "Skill Trees",
    quests: "Quests",
    character: "Character",
    achievements: "Achievements",
    codex: "Codex",
    portfolio: "Portfolio",
    finalBoss: "Final Boss",
    settings: "Settings",
    skills: "Skills",
    skill: "Skill",
    locked: "Locked",
    available: "Available",
    active: "Active",
    mastered: "Mastered",
    chapterBoss: "Chapter boss",
    foundation: "Foundation",
    developing: "Developing",
    advanced: "Advanced",
    mastery: "Mastery",
    integration: "Integration",
    treeCompletion: "Tree completion",
    backTrees: "← Skill Trees",
    enterLesson: "Enter lesson",
    skillLocked: "Skill locked",
    prerequisites: "Prerequisites",
    masteryRewards: "Mastery rewards",
    theory: "Theory",
    practice: "Practice",
    language: "Language",
    english: "English",
    dutch: "Dutch",
    experience: "Experience",
    settingsData: "Settings & Data",
    whyMatters: "Why this matters",
    objectives: "Learning objectives",
    knowledgeCheck: "Knowledge check",
    assignment: "Practical assignment",
    references: "References",
    beginSkill: "Begin skill",
    masterSkill: "Master skill",
  },
  nl: {
    journey: "Reis",
    skillTrees: "Skillbomen",
    quests: "Opdrachten",
    character: "Personage",
    achievements: "Prestaties",
    codex: "Codex",
    portfolio: "Portfolio",
    finalBoss: "Eindbaas",
    settings: "Instellingen",
    skills: "Vaardigheden",
    skill: "Vaardigheid",
    locked: "Vergrendeld",
    available: "Beschikbaar",
    active: "Actief",
    mastered: "Beheerst",
    chapterBoss: "Hoofdstukbaas",
    foundation: "Basis",
    developing: "Ontwikkeling",
    advanced: "Gevorderd",
    mastery: "Meesterschap",
    integration: "Integratie",
    treeCompletion: "Boom voltooid",
    backTrees: "← Skillbomen",
    enterLesson: "Open les",
    skillLocked: "Vaardigheid vergrendeld",
    prerequisites: "Vereisten",
    masteryRewards: "Beloningen",
    theory: "Theorie",
    practice: "Praktijk",
    language: "Taal",
    english: "Engels",
    dutch: "Nederlands",
    experience: "Ervaring",
    settingsData: "Instellingen & gegevens",
    whyMatters: "Waarom dit belangrijk is",
    objectives: "Leerdoelen",
    knowledgeCheck: "Kennistoets",
    assignment: "Praktijkopdracht",
    references: "Bronnen",
    beginSkill: "Start vaardigheid",
    masterSkill: "Beheers vaardigheid",
  },
} as const;
type Key = keyof typeof copy.en;
const Context = createContext<{
  language: Language;
  setLanguage: (x: Language) => void;
  t: (k: Key) => string;
} | null>(null);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setInner] = useState<Language>(() =>
    localStorage.getItem("filmcraft-language") === "nl" ? "nl" : "en",
  );
  const setLanguage = (x: Language) => {
    localStorage.setItem("filmcraft-language", x);
    document.documentElement.lang = x;
    setInner(x);
  };
  const value = useMemo(
    () => ({ language, setLanguage, t: (k: Key) => copy[language][k] }),
    [language],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useLanguage() {
  const c = useContext(Context);
  if (!c) throw new Error("Language provider missing");
  return c;
}
