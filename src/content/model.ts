import { z } from 'zod';

export const checkSchema = z.object({
  type: z.enum(['multiple-choice', 'multiple-select', 'ordering', 'scenario', 'reflection']),
  prompt: z.string().min(20), options: z.array(z.string()).min(2), correct: z.array(z.number()).min(1), explanation: z.string().min(30), threshold: z.number().min(0).max(1)
});
export const rubricCriterionSchema = z.object({ id: z.string(), label: z.string(), description: z.string().min(30), max: z.number().positive() });
export const skillSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/), title: z.string().min(3), domainId: z.string(), section: z.string(), tier: z.number().int().min(1).max(6), icon: z.string(),
  description: z.string().min(40), why: z.string().min(60), objectives: z.array(z.string().min(20)).min(3), prerequisites: z.array(z.string()),
  theoryMinutes: z.number().positive(), practiceMinutes: z.number().positive(), difficulty: z.enum(['foundation', 'developing', 'advanced', 'mastery']),
  xp: z.object({ theory: z.number(), check: z.number(), practice: z.number(), evidence: z.number(), mastery: z.number() }),
  theory: z.array(z.object({ heading: z.string(), body: z.string().min(120) })).min(3), examples: z.array(z.string().min(40)).min(2), mistakes: z.array(z.string().min(35)).min(3),
  check: checkSchema, assignment: z.object({ id: z.string(), type: z.enum(['micro exercise','analysis','controlled comparison','recreation','mini project','integration project','chapter boss','final boss']), brief: z.string().min(100), deliverable: z.string().min(40) }),
  rubric: z.array(rubricCriterionSchema).min(3), evidenceOptions: z.array(z.enum(['reflection','external-link','small-file','local-reference'])).min(2),
  mastery: z.array(z.string()).min(5), unlocks: z.array(z.string()), references: z.array(z.object({ title: z.string(), url: z.string().url(), source: z.string(), accessed: z.string() })).min(1), version: z.literal('1.0.0'), required: z.boolean()
});
export const domainSchema = z.object({ id: z.string(), title: z.string(), short: z.string(), color: z.string(), icon: z.string(), description: z.string(), skills: z.array(skillSchema).min(4) });
export type Skill = z.infer<typeof skillSchema>;
export type Domain = z.infer<typeof domainSchema>;
export type SkillState = 'locked'|'available'|'active'|'theory-complete'|'evidence-pending'|'mastered';

export interface SkillProgress { state: SkillState; theory: boolean; check: boolean; practice: boolean; rubric: Record<string, number>; evidence?: { reflection: string; link?: string; localReference?: string; createdAt: string }; xpEvents: string[]; masteredAt?: string; }
export interface AppProgress { version: 1; xp: number; skills: Record<string, SkillProgress>; activeSkillId?: string; selectedTitle?: string; reducedMotion: boolean; sound: boolean; createdAt: string; updatedAt: string; }
