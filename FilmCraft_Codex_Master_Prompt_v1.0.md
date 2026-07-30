# FILMCRAFT ACADEMY — CODEX MASTER PROMPT

## 0. Role and mandate

You are the principal product engineer, curriculum architect, UX designer, QA lead, and technical writer for **FilmCraft Academy**.

Your assignment is not to produce a prototype, proof of concept, demo, vertical slice, wireframe, or partially populated application. Your assignment is to build the **complete local V1** described below.

You must work autonomously inside the current project folder. The folder is not yet a Git repository. Do not require GitHub or remote infrastructure before the local V1 works. You may initialize local project tooling when useful, but do not make remote publishing a prerequisite.

You must internally divide the work into phases, validate each phase, repair failures, refactor when necessary, and continue until the complete V1 satisfies the definition of done.

Stop only for a genuinely blocking ambiguity that cannot be resolved safely from this specification, official documentation, repository evidence, or a reasonable reversible engineering decision.

---

# 1. Product mission

Build a private, single-user, responsive web application / PWA for desktop and Android called **FilmCraft Academy**.

FilmCraft Academy is a complete RPG-inspired learning journey for a former film student who wants to rebuild and master broad filmmaking knowledge after several years away from the field.

The product must:

1. provide a complete structured filmmaking curriculum;
2. divide the curriculum into multiple interconnected RPG-style skill trees;
3. allow the user to choose which domain to study next;
4. enforce meaningful prerequisites within and across trees;
5. teach universal film theory: what a concept is, why it matters, and what its creative and technical consequences are;
6. teach practical execution in DaVinci Resolve: how the work is actually performed;
7. teach practical use of the user's key equipment, especially the Blackmagic Cinema Camera 2.5K RAW;
8. require practical application, self-assessment, and portfolio-oriented evidence;
9. track XP, levels, mastery, achievements, titles, tree completion, and overall completion;
10. end with a final boss project:
   **“BEGGIN' FOR FUEL - Cinematic Music Video”**;
11. make the academy unnecessary after 100% completion by leaving the user with durable knowledge, practical competence, and a portfolio.

This is not a production-management tool. Do not add call-sheet management, production scheduling, budgets, crew administration, continuity tracking, or other FilmCraft Studio features to V1.

---

# 2. Non-negotiable scope

The V1 is complete only when all of the following exist and work:

- the full application shell;
- a polished FilmCraft visual identity;
- responsive desktop and Android/PWA behavior;
- the complete curriculum structure;
- all required skill trees;
- all skills needed for a coherent route to 100% completion;
- complete lesson content, not placeholder text;
- examples, mistakes, practical exercises, knowledge checks, rubrics, and evidence capture;
- prerequisite and unlock logic;
- XP and level progression;
- character screen;
- quest / assignment log;
- achievements, titles, specializations, statistics, cosmetics where appropriate;
- tree and overall completion;
- the final boss project and completion flow;
- persistence and synchronization design;
- content validation and automated tests;
- local setup, build, backup, and deployment documentation.

A small example curriculum is not an acceptable final deliverable.

---

# 3. Core learning philosophy

## 3.1 Hybrid theory/practice model

General film-domain trees must answer:

- What is this?
- Why does it exist?
- Why and when does it work?
- What are its creative and technical consequences?
- How do you recognize strong and weak use?
- What common mistakes occur?

The DaVinci Resolve tree must answer:

- How do I perform this work in DaVinci Resolve?
- Where and why is a particular page, panel, node, setting, tool, or workflow used?
- How do I complete realistic tasks from ingest through delivery?
- What can the software do, what can it not do, and what are common limitations and failure modes?

Equipment trees must answer:

- How do cameras and stabilizers work in general?
- How does this specific device work?
- What are its strengths, limitations, operating procedures, failure modes, and workflows?
- How does it connect to the general theory and DaVinci workflow?

## 3.2 Guided freedom

The application decides which skills are available based on prerequisites.

The user decides which available domain and skill to pursue.

Do not force a single linear course.

Do not allow arbitrary deep skills before their prerequisites.

Skipped available skills remain available, appear among possible next steps, and may be recommended periodically.

## 3.3 Mastery

A meaningful skill is mastered only after:

- required theory is completed;
- an appropriate knowledge check or reflection is completed;
- a practical exercise or project is completed;
- a self-assessment rubric is completed;
- evidence or a suitable reflection/reference is stored.

Small supporting knowledge nodes may share a combined practical assignment.

Evidence should be encouraged as the intended path because it builds a portfolio, but upload friction must not block learning. Support:

- text reflection;
- external link;
- optional small file upload when storage permits;
- local/external reference for larger media.

Do not implement a “refresh recommended” status in V1.

---

# 4. Required curriculum domains

The exact number and boundaries of trees may be optimized for clarity. However, all of the following domains must be represented completely and coherently.

## 4.1 Universal filmmaking domains

1. Camera Fundamentals & Exposure
2. Lenses & Optics
3. Composition & Visual Language
4. Lighting
5. Camera Movement & Stabilization
6. Sound Theory & Recording
7. Storytelling & Directing
8. Editing Theory
9. Color Theory & Image Finishing
10. Film Analysis & Visual Literacy
11. Production Fundamentals as learning content only
12. Creative Practice and multidisciplinary projects

## 4.2 DaVinci Resolve

DaVinci Resolve is the central practical workplace and must receive a deep, complete tree or optimized set of subtrees.

Use the newest stable **free** DaVinci Resolve version available at build time as the primary version.

Cover at least:

- Project Manager;
- databases and projects;
- project settings;
- frame rate and resolution choices;
- Media Page;
- ingest;
- bins, metadata, organization;
- proxies;
- optimized media;
- relinking;
- media management;
- Cut Page;
- realistic Cut Page workflows;
- Edit Page;
- timeline editing;
- trim tools;
- keyframes;
- effects;
- subtitles;
- organization;
- multicam where relevant;
- Fusion Page;
- node-based compositing;
- masks;
- tracking;
- keying;
- titles;
- motion graphics;
- cleanup;
- compositing troubleshooting;
- Color Page;
- node structures;
- primaries;
- secondaries;
- qualifiers;
- windows;
- tracking;
- scopes;
- shot matching;
- look creation;
- color management;
- DaVinci YRGB;
- color-managed workflows;
- input/output transforms;
- gamut and gamma;
- RAW workflows;
- CinemaDNG in depth;
- contextual coverage of other relevant RAW formats;
- Fairlight Page;
- audio editing;
- routing;
- buses;
- EQ;
- dynamics;
- automation;
- loudness;
- cleanup;
- mixing;
- Deliver Page;
- codecs;
- containers;
- master exports;
- web/platform exports;
- audio channels;
- quality control;
- performance;
- caching;
- GPU/CPU/storage bottlenecks;
- collaboration and databases where relevant;
- plugins and external integrations where relevant;
- limitations and troubleshooting.

Do not create shallow “this button is here” content. Teach functional workflows and realistic practice.

## 4.3 Blackmagic Cinema Camera 2.5K RAW

Create a deep personal equipment tree connected to Camera, Exposure, Lenses, Sound, Movement, and DaVinci Resolve.

Cover at least:

- all controls, menus, and daily operation;
- sensor characteristics;
- crop factor;
- image character;
- CinemaDNG RAW;
- ProRes recording;
- available resolutions and frame rates;
- dynamic range;
- exposure strategy;
- ISO and noise;
- highlight behavior;
- white balance and tint;
- MFT mount;
- adapters;
- lens compatibility;
- IR contamination;
- ND filters;
- rolling shutter;
- movement limitations;
- internal battery;
- external power;
- SSD media;
- capacity and reliability;
- media offload;
- audio inputs and limitations;
- monitoring and screen limitations;
- rigging;
- tripod;
- shoulder rig;
- Ronin-M use where appropriate;
- shoot preparation;
- troubleshooting;
- CinemaDNG import, debayering, color management, and grading in DaVinci Resolve;
- practical assignments with the actual camera.

## 4.4 Canon M50

Create a substantial equipment module or tree covering:

- operation;
- exposure behavior;
- autofocus;
- available recording modes;
- codecs and image profiles;
- lens use and adapters where relevant;
- strengths;
- limitations;
- practical scenarios;
- integration with the wider curriculum and DaVinci Resolve.

## 4.5 DJI Ronin-M

Create a substantial equipment module or tree covering:

- hardware overview;
- balancing;
- tuning;
- modes;
- operation;
- setup;
- calibration;
- movement design;
- safety;
- power;
- payload limitations;
- BMCC and Canon M50 use where technically appropriate;
- troubleshooting;
- practical movement exercises.

Other user hardware is out of scope for V1 unless it is needed to make a required lesson coherent.

---

# 5. Skill model

Every skill must have a canonical machine-readable definition and should support:

- stable ID;
- title;
- domain/tree;
- section/cluster;
- level/tier;
- icon reference;
- short description;
- why it matters;
- learning objectives;
- prerequisite skill IDs;
- optional cross-tree prerequisites;
- estimated theory time;
- estimated practice time;
- difficulty;
- XP values;
- lesson blocks;
- examples;
- common mistakes;
- knowledge-check definition;
- assignment definition;
- rubric;
- evidence options;
- mastery conditions;
- unlock consequences;
- references and source metadata;
- curriculum version.

Supported skill states:

- locked;
- available;
- active;
- theory complete;
- review/evidence pending where applicable;
- mastered.

Do not add refresh/revision status in V1.

Support:

- direct prerequisites;
- multiple prerequisites;
- multi-level skill upgrades;
- branching paths;
- cross-tree integration skills;
- chapter boss projects;
- final boss project.

Prevent cycles and unreachable nodes.

---

# 6. Lesson content model

Each substantial skill must contain:

1. skill header;
2. why this matters;
3. measurable learning objectives;
4. complete theory;
5. visual explanation where valuable;
6. strong examples;
7. contrast examples where valuable;
8. mistakes and misconceptions;
9. practical consequences;
10. knowledge check or reflection;
11. practical exercise;
12. expected deliverable;
13. self-assessment rubric;
14. evidence/reflection entry;
15. XP, mastery, and unlock summary;
16. authoritative references.

Lesson length is determined by subject complexity.

Do not split content into tiny artificial fragments solely to inflate skill count.

Do not create giant monolithic lessons that obscure progress.

The total number of skills is content-driven. Do not target a fixed number merely for appearance.

---

# 7. Knowledge checks

Choose the form per topic.

Supported forms may include:

- multiple choice;
- multiple select;
- ordering;
- matching;
- scenario judgment;
- image/shot analysis;
- parameter choice;
- short reflection;
- troubleshooting decision tree.

Users may retry immediately and without a punitive cooldown.

Checks should strengthen understanding and should not become arbitrary gatekeeping.

More advanced integration skills may use stricter thresholds than small supporting skills.

---

# 8. Assignments and portfolio

Supported assignment types:

- micro exercise;
- analysis;
- controlled comparison;
- recreation;
- mini project;
- integration project;
- chapter boss;
- final boss.

Portfolio evidence should be easy to review later.

Implement an evidence/project gallery showing:

- assignment;
- related skills;
- date;
- reflection;
- rubric;
- optional link/file;
- selected thumbnail where supported;
- mastery result.

The system must remain usable when media uploads are disabled or unavailable.

---

# 9. Final boss

The final boss is:

# BEGGIN' FOR FUEL - Cinematic Music Video

It is the official final project and final completion gate.

It must:

- combine major skills across camera, lenses, composition, lighting, movement, sound where relevant, directing, editing, color, DaVinci Resolve, BMCC, and creative practice;
- include planning as learning output without turning the app into a production-management suite;
- provide a detailed project brief;
- define required deliverables;
- include a comprehensive rubric;
- require a final reflection;
- produce a portfolio entry;
- trigger the final major XP award;
- unlock the final achievement/title;
- result in 100% completion only after all required curriculum conditions are satisfied.

---

# 10. RPG progression

## 10.1 XP

Award XP for:

- theory completion;
- knowledge-check completion;
- practice completion;
- evidence/reflection;
- skill mastery;
- boss projects;
- tree milestones;
- achievements.

Keep small XP events visually quiet.

Make skill mastery, boss projects, tree milestones, major levels, and final completion visibly significant.

## 10.2 Levels

Character level represents total progress and general film experience.

Derive the level system from the final curriculum size.

Choose a round maximum level, preferably 60, 80, or 100, based on the curriculum and XP curve.

Use a curriculum-aware progression curve rather than equal XP per level.

Level may influence:

- prestige;
- titles;
- some endgame projects;
- high-level milestones;
- cosmetics.

Level must not force the user into unrelated trees or block normal learning paths early.

Prerequisites and mastery remain the primary progression gates.

## 10.3 No spendable talent points

Do not implement spendable talent points.

Mastering a skill means the user owns that skill and unlocks subsequent options.

## 10.4 Required RPG features

Include:

- character level;
- total XP;
- XP bar;
- animated skill-tree nodes;
- quest/assignment log;
- achievements;
- titles;
- automatically derived specializations;
- level-up screens;
- tree completion;
- overall completion;
- domain statistics;
- boss projects;
- unlockable cosmetics or visual rewards where they add value.

---

# 11. Required views

Implement at least:

1. Journey Dashboard
2. Domain / World Overview
3. Interactive Skill Tree
4. Skill Detail / Learning View
5. Quest and Assignment Log
6. Character Screen
7. Achievements
8. Library / Codex for mastered knowledge
9. Evidence / Portfolio Gallery
10. Settings
11. Final Boss hub
12. Curriculum completion summary

## 11.1 Dashboard

Show:

- character level;
- XP;
- overall completion;
- tree completion;
- active skill;
- recent mastery;
- recent unlocks;
- possible next steps;
- recommended next steps;
- current assignments;
- final boss readiness when relevant.

## 11.2 Skill tree

Support:

- pan;
- zoom;
- responsive mobile navigation;
- visible node states;
- prerequisite lines;
- levels/upgrades;
- clusters/chapters;
- clear reasons for locked nodes;
- smooth performance with hundreds of nodes;
- unlock and mastery animations;
- keyboard and touch accessibility.

## 11.3 Character screen

Show:

- level and XP;
- mastered skill count;
- skills by tree and tier;
- strongest trees;
- automatically derived titles/specializations;
- achievements;
- boss history;
- portfolio count;
- overall completion;
- meaningful statistics.

---

# 12. Visual direction

Create one highly polished **FilmCraft** release theme.

It should combine:

- Assassin's Creed Odyssey-inspired clarity and drama in skill trees;
- World of Warcraft-inspired quest log, achievements, progression, and journey feeling;
- cinematic software readability;
- an original FilmCraft visual language.

Do not copy protected game assets, logos, typography, icons, maps, or exact layouts.

Use original motifs such as:

- film frames;
- lenses;
- aperture geometry;
- light beams;
- waveforms;
- node graphs;
- editing timelines;
- color scopes;
- camera metal/glass;
- cinematic atmosphere.

Animations:

- may be spectacular for unlocks, major mastery, boss completion, and level-ups;
- must be calm during reading and routine interaction;
- must be fast;
- must be optional/reducible;
- must support reduced motion;
- may include optional sound and haptics.

Build the technical theme architecture so additional themes can be added later, but ship only one deeply finished FilmCraft theme in V1.

---

# 13. Platform and architecture

Primary product form:

- responsive web application;
- installable PWA;
- desktop-browser support;
- Android-browser/PWA support.

Internet may be required. Offline-first is not required.

The application is private and single-user.

Preferred backend:

1. Supabase Auth/Database/Storage if the free tier is practically sufficient;
2. otherwise a simple self-controlled backend with no recurring paid dependency.

Before locking the backend, document:

- expected database usage;
- expected storage usage;
- media upload constraints;
- free-tier risks;
- backup/export strategy.

Data ownership requirements:

- user progress must be exportable;
- curriculum data must be exportable;
- evidence metadata must be exportable;
- backups must be documented;
- avoid irreversible vendor lock-in.

Evidence storage:

- allow text and external links;
- support optional files if practical;
- do not require large video upload;
- prefer external links/references for large media;
- preserve usability when storage is disabled.

---

# 14. Content sources and factual quality

You must research and verify factual content.

For DaVinci Resolve and Blackmagic equipment:

- prioritize official Blackmagic Design manuals, product pages, support notes, and primary documentation;
- use the newest stable free DaVinci Resolve version at build time;
- distinguish Free from Studio-only features when relevant;
- do not invent functions, limits, settings, codecs, frame rates, workflows, or menu locations.

For general filmmaking theory:

- use authoritative primary or professional educational sources;
- preserve source metadata for maintainability;
- avoid unsupported absolutes where creative practice has legitimate alternatives.

For Canon M50 and DJI Ronin-M:

- prioritize official Canon and DJI manuals/product documentation;
- verify compatibility and limitations;
- mark uncertainty explicitly.

Store references with the content where practical.

Create an audit report for:

- unsupported claims;
- missing references;
- conflicts between sources;
- version-sensitive claims;
- uncertain equipment details.

Do not silently fabricate missing facts.

---

# 15. Content generation workflow

You may structure and write the curriculum autonomously.

Before writing all lessons:

1. create a complete curriculum map;
2. define all domains, sections, skills, levels, prerequisites, cross-links, assignments, bosses, and estimated scope;
3. validate that every required subject is covered;
4. validate that every skill is reachable;
5. validate that the final boss prerequisites can be satisfied;
6. check that the route to 100% completion is possible;
7. write an internal curriculum audit;
8. only then scale lesson generation.

Do not ask the user to manually define every skill.

Use controlled generation and validation to prevent inconsistent terminology, duplicated lessons, missing dependencies, and shallow content.

---

# 16. Implementation phases

You must create a written execution plan and then execute it.

Suggested phases:

## Phase 0 — Repository and environment audit
- inspect the current folder;
- identify existing files worth preserving;
- document assumptions;
- choose the stack;
- decide Supabase versus fallback backend;
- define local development commands;
- write `docs/PHASE_0_REPORT.md`.

## Phase 1 — Architecture and data contracts
- application architecture;
- database schema;
- content schema;
- skill graph model;
- progress state machine;
- XP and level model;
- theme architecture;
- storage/export model;
- write architecture decision records;
- validate schemas.

## Phase 2 — Complete curriculum map
- all trees;
- all sections;
- all skills;
- levels;
- prerequisites;
- cross-tree links;
- assignments;
- bosses;
- final boss;
- completion model;
- curriculum audit.

## Phase 3 — Core application foundation
- app shell;
- routing;
- responsive layout;
- authentication/single-user access;
- database;
- persistence;
- settings;
- import/export;
- PWA configuration.

## Phase 4 — Progression engine
- skill states;
- prerequisite engine;
- graph validation;
- XP;
- levels;
- achievements;
- titles;
- specialization calculations;
- completion;
- tests.

## Phase 5 — Learning experience
- lesson renderer;
- content blocks;
- checks;
- assignments;
- rubrics;
- evidence;
- mastery;
- library;
- tests.

## Phase 6 — RPG interface
- dashboard;
- world/domain overview;
- interactive trees;
- quest log;
- character screen;
- achievements;
- level-ups;
- animations;
- cosmetics;
- accessibility.

## Phase 7 — Full content production
- write all lessons;
- write all examples;
- write all checks;
- write all assignments;
- write all rubrics;
- write all boss projects;
- complete citations/reference metadata;
- run content audits.

## Phase 8 — Final boss
- build final boss hub;
- project brief;
- prerequisites;
- deliverables;
- rubric;
- reflection;
- final XP and achievements;
- 100% completion flow.

## Phase 9 — QA, repair, and hardening
- unit tests;
- integration tests;
- end-to-end tests;
- content validation;
- graph validation;
- accessibility;
- performance;
- responsive Android tests;
- PWA installation;
- persistence and backup;
- security review;
- eliminate placeholders and dead ends.

## Phase 10 — Documentation and release
- local setup;
- development;
- build;
- production deployment;
- Supabase/fallback configuration;
- backups;
- export/import;
- curriculum authoring;
- troubleshooting;
- release checklist;
- final audit.

You may adjust phase boundaries when justified, but you may not reduce scope.

After every phase:

- write a phase report;
- list completed work;
- list tests;
- list failures and repairs;
- list remaining risks;
- verify that architecture remains consistent;
- continue automatically.

---

# 17. Testing requirements

At minimum test:

- prerequisite evaluation;
- multi-prerequisite skills;
- cross-tree dependencies;
- branch unlocks;
- level upgrades;
- no dependency cycles;
- no unreachable required skills;
- skill state transitions;
- mastery conditions;
- XP awards;
- no double-awarding XP;
- level calculations;
- final max level;
- tree completion;
- overall completion;
- achievement conditions;
- title/specialization calculations;
- final boss readiness;
- 100% completion reachability;
- persistence;
- import/export;
- evidence fallback behavior;
- responsive navigation;
- PWA build/install;
- core accessibility;
- curriculum schema;
- missing content fields;
- duplicate skill IDs;
- broken references;
- orphaned assignments;
- unsupported content block types;
- placeholder detection.

When tests fail:

1. diagnose;
2. repair;
3. rerun;
4. continue until green.

Do not merely report a failure and stop.

---

# 18. Definition of done

The project is done only when:

- the application runs locally from documented commands;
- the production build succeeds;
- the PWA is installable;
- desktop and Android layouts are usable;
- all required views work;
- all curriculum domains are complete;
- DaVinci Resolve is taught deeply as an actual workplace;
- Fusion and Fairlight are taught as real workflows, not interface tours;
- the BMCC 2.5K RAW tree is complete and connected;
- Canon M50 and Ronin-M modules are substantial and useful;
- all required skills contain complete content;
- knowledge checks work;
- assignments work;
- evidence/reflection works;
- mastery works;
- XP and levels work;
- no spendable skill points exist;
- achievements and titles work;
- the final boss works;
- 100% completion is reachable;
- no placeholders remain;
- validation reports are clean or have documented justified exceptions;
- tests pass;
- setup, backup, export, authoring, and deployment docs exist.

Do not declare completion based on a small subset of the curriculum.

---

# 19. Engineering quality rules

- Prefer TypeScript for frontend and backend where practical.
- Use strict typing.
- Use schema validation for curriculum and API data.
- Separate content, progression logic, and presentation.
- Maintain one canonical skill definition.
- Keep business logic testable outside UI components.
- Avoid giant components and hidden duplicated state.
- Use migrations for database changes.
- Store content in a format that can scale to hundreds of skills and long lessons.
- Provide content linting and graph validation scripts.
- Preserve accessibility.
- Avoid unnecessary recurring service costs.
- Never hardcode secrets.
- Include `.env.example`.
- Keep the app private by default.
- Provide seed/import tooling.
- Use deterministic identifiers.
- Make destructive operations explicit and recoverable.
- Refactor when a prior design cannot support complete scope.

---

# 20. Autonomous decision rules

When a detail is not explicitly fixed:

1. choose the solution that best supports the complete product mission;
2. prefer reversible and documented decisions;
3. preserve user data;
4. prefer clarity over cleverness;
5. prefer complete learning value over superficial gamification;
6. prefer a polished single-user experience over premature multi-user complexity;
7. avoid paid dependencies when a reliable free/self-controlled option exists;
8. document significant choices in ADRs;
9. continue without asking unless the choice is high-risk, irreversible, or genuinely blocks completion.

---

# 21. Required starting actions

Begin now by:

1. inspecting the current project folder;
2. creating a clear project structure;
3. writing `docs/MASTER_EXECUTION_PLAN.md`;
4. writing `docs/PRODUCT_REQUIREMENTS.md` based on this prompt;
5. writing initial ADRs for stack, backend, content storage, graph model, and theme system;
6. producing the full curriculum-map plan before generating all lesson content;
7. setting up automated validation and tests early;
8. executing the phases until complete.

Do not return only a plan. The plan is the first artifact of the implementation, not the final deliverable.

Continue until the complete local V1 satisfies the definition of done.
