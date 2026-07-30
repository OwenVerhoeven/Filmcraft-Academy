import { describe,expect,it } from 'vitest';
import { digest } from './auth';
import { allSkills,domains } from './content/curriculum';
import { achievements } from './lib/progression';

describe('FilmCraft V1 regressions',()=>{
  it('verifies both account hashes without secure-origin WebCrypto',()=>{
    expect(digest('filmcraft-v1.1:SinbodWayne:lokokip999')).toBe('db5b765f020b9af7aa788267e0eb9cb6e2c5a0d5a9de6d431aae322fff151ade');
    expect(digest('filmcraft-v1.1:KyanWayne:mijnhondismexx')).toBe('84160d8d352acd9b2fc575dfa6cd5bde13c6a2d1f9a7c0779b76ccca73f2bb89');
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
});
