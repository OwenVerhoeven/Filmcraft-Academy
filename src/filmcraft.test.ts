import { describe,expect,it } from 'vitest';
import { digest } from './auth';
import { allSkills,domains } from './content/curriculum';
import { achievements } from './lib/progression';
import { createInitialProgress } from './lib/progression';
import { mergeProgress } from './lib/cloud';

describe('FilmCraft V1 regressions',()=>{
  it('provides deterministic SHA-256 fallback hashing without secure-origin WebCrypto',()=>{
    expect(digest('filmcraft-test')).toHaveLength(64);
    expect(digest('filmcraft-test')).toBe(digest('filmcraft-test'));
  });

  it('uses fork-and-converge talent prerequisites instead of a fake linear chain',()=>{
    for(const domain of domains){
      expect(domain.skills[1].prerequisites).toEqual([domain.skills[0].id]);
      expect(domain.skills[2].prerequisites).toContain(domain.skills[0].id);
      expect(domain.skills[4].prerequisites).toEqual(expect.arrayContaining([domain.skills[1].id,domain.skills[2].id]));
    }
  });

  it('contains substantive lesson summaries and a full achievement catalogue',()=>{
    expect(allSkills.some(s=>s.description.includes('Build working command'))).toBe(false);
    expect(allSkills.every(s=>s.references.length>=2)).toBe(true);
    expect(achievements.length).toBeGreaterThanOrEqual(30);
  });

  it('merges progress from two devices without losing either device events',()=>{
    const skill=allSkills[0];
    const left=createInitialProgress();
    const right=createInitialProgress();
    left.updatedAt='2026-07-30T10:00:00.000Z';
    right.updatedAt='2026-07-30T10:01:00.000Z';
    left.skills[skill.id]={state:'available',theory:true,check:false,practice:false,rubric:{},xpEvents:[`${skill.id}:theory`]};
    right.skills[skill.id]={state:'available',theory:false,check:true,practice:false,rubric:{},xpEvents:[`${skill.id}:check`]};
    const merged=mergeProgress(left,right);
    expect(merged.skills[skill.id].theory).toBe(true);
    expect(merged.skills[skill.id].check).toBe(true);
    expect(merged.skills[skill.id].xpEvents).toEqual(expect.arrayContaining([`${skill.id}:theory`,`${skill.id}:check`]));
    expect(merged.xp).toBe(skill.xp.theory+skill.xp.check);
  });
});
