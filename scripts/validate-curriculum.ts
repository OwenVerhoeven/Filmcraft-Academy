import { validateCurriculum } from '../src/lib/validation';
const result=validateCurriculum();
console.log(`FilmCraft curriculum: ${result.domainCount} domains, ${result.skillCount} skills, ${result.assignmentCount} assignments, ${result.referenceCount} references.`);
if(result.errors.length){console.error(result.errors.join('\n'));process.exit(1)}
console.log('Schema, duplicate-ID, placeholder, reference, prerequisite, cycle and reachability checks passed.');
