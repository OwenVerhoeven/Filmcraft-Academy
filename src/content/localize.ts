import type { Skill } from "./model";
import type { Language } from "../i18n";
import { dutchKnowledge } from "./knowledge-nl.generated";

export function localizeSkill(skill: Skill, language: Language) {
  const nl = language === "nl" ? dutchKnowledge[skill.title] : undefined;
  return {
    title: nl?.title ?? skill.title,
    description: nl?.summary ?? skill.description,
    why: nl?.summary ?? skill.why,
    theory: nl?.theory ?? skill.theory,
    objectives: nl?.objectives ?? skill.objectives,
    examples: nl?.examples ?? skill.examples,
    mistakes: nl?.mistakes ?? skill.mistakes,
  };
}
