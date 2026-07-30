# Curriculum Authoring

The canonical source is `src/content/curriculum.ts`; contracts live in `src/content/model.ts`.

- Keep deterministic lowercase IDs forever once released.
- Add topics to a domain seed or create a domain with at least four coherent skills.
- Add cross-links only after checking their pedagogical timing.
- Use primary/official references for software and equipment. Mark version-sensitive uncertainty.
- Each substantial skill must retain complete theory, examples, mistakes, check, assignment, rubric, evidence options and mastery rules.
- Increment `curriculumVersion` for published content changes and document migrations when IDs or mastery semantics change.

Run `npm.cmd run validate` after every content change. It rejects malformed content, duplicate IDs, placeholders, missing references, broken prerequisites and cycles. Then run the full `npm.cmd run check` gate.
