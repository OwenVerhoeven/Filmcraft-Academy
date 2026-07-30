import { domainSchema, skillSchema } from '../content/model';
import { allSkills, domains, finalBoss } from '../content/curriculum';

export function validateCurriculum(){
  const errors:string[]=[]; domains.forEach((d,i)=>{const parsed=domainSchema.safeParse(d);if(!parsed.success)errors.push(`Domain ${i}: ${parsed.error.message}`)});
  const boss=skillSchema.safeParse(finalBoss);if(!boss.success)errors.push(`Final boss: ${boss.error.message}`);
  const skills=[...allSkills,finalBoss]; const ids=new Set<string>();
  for(const s of skills){if(ids.has(s.id))errors.push(`Duplicate skill ID ${s.id}`);ids.add(s.id);if(/placeholder|lorem|todo|tbd/i.test(JSON.stringify(s)))errors.push(`Placeholder in ${s.id}`);if(s.id!==finalBoss.id&&s.theory.length<5)errors.push(`Shallow lesson ${s.id}: fewer than five theory sections`);if(s.references.length<2)errors.push(`Insufficient source triangulation in ${s.id}`);if(s.theory.some(b=>/best understood as a relationship between intention/i.test(b.body)))errors.push(`Legacy generic lesson content in ${s.id}`);}
  for(const s of skills)for(const id of s.prerequisites)if(!ids.has(id))errors.push(`Broken prerequisite ${id} in ${s.id}`);
  const visiting=new Set<string>(),visited=new Set<string>();
  function visit(id:string){if(visiting.has(id)){errors.push(`Cycle at ${id}`);return}if(visited.has(id))return;visiting.add(id);const s=skills.find(x=>x.id===id);s?.prerequisites.forEach(visit);visiting.delete(id);visited.add(id)}
  skills.forEach(s=>visit(s.id));
  for(const s of skills){const seen=new Set<string>();const stack=[s.id];while(stack.length){const id=stack.pop()!;if(seen.has(id))continue;seen.add(id);skills.find(x=>x.id===id)?.prerequisites.forEach(p=>stack.push(p));}if(!seen.has(s.id))errors.push(`Unreachable ${s.id}`)}
  return {errors,skillCount:skills.length,domainCount:domains.length,assignmentCount:skills.length,referenceCount:skills.reduce((a,s)=>a+s.references.length,0)};
}
