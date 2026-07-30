import type { Domain, Skill } from "./model";
import { lessonFor } from "./lesson-knowledge";

type DomainSeed = {
  id: string;
  title: string;
  short: string;
  color: string;
  icon: string;
  description: string;
  source: { title: string; url: string; source: string };
  topics: string[];
};
const accessed = "2026-07-30";
const general = {
  title: "The Visual Story, 2nd Edition — foundational professional reference",
  url: "https://www.routledge.com/The-Visual-Story-Creating-the-Visual-Structure-of-Film-TV-and-Digital-Media/Block/p/book/9781138014152",
  source: "Routledge / Bruce Block",
};
const resolve = {
  title: "DaVinci Resolve 21 — official training and support",
  url: "https://www.blackmagicdesign.com/products/davinciresolve/training",
  source: "Blackmagic Design",
};
const bmcc = {
  title: "Blackmagic Cinema Camera — official manual",
  url: "https://documents.blackmagicdesign.com/UserManuals/BlackmagicCinemaCameraManual.pdf",
  source: "Blackmagic Design",
};
const canon = {
  title: "EOS M50 — official support and manual",
  url: "https://www.usa.canon.com/support/p/eos-m50",
  source: "Canon",
};
const ronin = {
  title: "Ronin-M — official downloads and manual",
  url: "https://www.dji.com/downloads/products/ronin-m",
  source: "DJI",
};

const seeds: DomainSeed[] = [
  {
    id: "camera",
    title: "Camera Fundamentals & Exposure",
    short: "Camera",
    color: "#51c4c7",
    icon: "Aperture",
    description:
      "Turn light, time, sensitivity and sensor behavior into intentional images.",
    source: general,
    topics: [
      "Image Formation & Sensor Language",
      "Stops and Exposure Triangle",
      "Shutter Angle & Motion Cadence",
      "ISO, Gain & Noise",
      "Dynamic Range & Highlight Strategy",
      "White Balance, Tint & Color Temperature",
      "Monitoring: Histograms, Waveforms & False Color",
      "Exposure Integration Project",
    ],
  },
  {
    id: "lenses",
    title: "Lenses & Optics",
    short: "Lenses",
    color: "#82c96b",
    icon: "CircleDot",
    description:
      "Choose focal length, focus, aperture and filtration for spatial and emotional intent.",
    source: general,
    topics: [
      "Focal Length & Field of View",
      "Perspective & Camera Distance",
      "Aperture, T-Stops & Transmission",
      "Depth of Field & Circle of Confusion",
      "Focus Methods & Pulling",
      "Lens Character, Aberrations & Contrast",
      "Filters, ND, IR & Polarization",
      "Lens Language Chapter Boss",
    ],
  },
  {
    id: "composition",
    title: "Composition & Visual Language",
    short: "Composition",
    color: "#e5ad42",
    icon: "Frame",
    description:
      "Organize the frame to control attention, tension, meaning and continuity.",
    source: general,
    topics: [
      "Frame, Aspect Ratio & Negative Space",
      "Balance, Weight & Visual Hierarchy",
      "Lines, Shapes, Layers & Depth",
      "Headroom, Look Room & Eyelines",
      "Blocking for the Camera",
      "Screen Direction & Spatial Continuity",
      "Composition Across a Sequence",
      "Visual Grammar Chapter Boss",
    ],
  },
  {
    id: "lighting",
    title: "Lighting",
    short: "Lighting",
    color: "#f2bb55",
    icon: "Sun",
    description:
      "Shape exposure, form, texture, mood and continuity with motivated light.",
    source: general,
    topics: [
      "Light Quality, Size & Distance",
      "Direction, Contrast & Modeling",
      "Photometric Foundations & Falloff",
      "Key, Fill, Negative Fill & Ratio",
      "Color, Mixed Sources & Practical Lights",
      "Lighting Faces, Spaces & Products",
      "Continuity, Safety & Efficient Setups",
      "Motivated Lighting Chapter Boss",
    ],
  },
  {
    id: "movement",
    title: "Camera Movement & Stabilization",
    short: "Movement",
    color: "#ed7c43",
    icon: "Move3d",
    description:
      "Design movement whose mechanics and meaning support the scene.",
    source: general,
    topics: [
      "Why the Camera Moves",
      "Tripod, Head & Controlled Pans",
      "Handheld Grammar & Body Mechanics",
      "Sliders, Dollies & Parallax",
      "Gimbal Movement Design",
      "Blocking, Rehearsal & Focus",
      "Rolling Shutter & Motion Artifacts",
      "Movement Sequence Chapter Boss",
    ],
  },
  {
    id: "sound",
    title: "Sound Theory & Recording",
    short: "Sound",
    color: "#8ecf69",
    icon: "AudioWaveform",
    description:
      "Capture and shape intelligible, dimensional sound that carries story.",
    source: general,
    topics: [
      "Sound Perspective & Story Function",
      "Microphone Types & Polar Patterns",
      "Placement, Proximity & Phase",
      "Gain Staging, Noise & Headroom",
      "Production Dialogue Workflow",
      "Ambience, Room Tone & Wild Tracks",
      "Monitoring, Sync & Troubleshooting",
      "Location Sound Chapter Boss",
    ],
  },
  {
    id: "story",
    title: "Storytelling & Directing",
    short: "Directing",
    color: "#d881bf",
    icon: "Drama",
    description:
      "Translate dramatic intention into performance, blocking, coverage and collaboration.",
    source: general,
    topics: [
      "Dramatic Question, Conflict & Change",
      "Character Objective & Action",
      "Beat Analysis & Scene Shape",
      "Directing Actors with Playable Notes",
      "Blocking, Staging & Visual Point of View",
      "Coverage, Inserts & Editorial Intent",
      "Tone, Rhythm & Ethical Collaboration",
      "Directed Scene Chapter Boss",
    ],
  },
  {
    id: "editing",
    title: "Editing Theory",
    short: "Editing",
    color: "#ae83d8",
    icon: "Clapperboard",
    description:
      "Build meaning through selection, order, duration, rhythm and juxtaposition.",
    source: general,
    topics: [
      "The Cut and Viewer Attention",
      "Continuity, Discontinuity & Match Logic",
      "Screen Direction, Eyelines & Action",
      "Pacing, Rhythm & Breath",
      "J-Cuts, L-Cuts & Audio Bridges",
      "Montage, Ellipsis & Compression",
      "Structure, Feedback & Revision",
      "Narrative Edit Chapter Boss",
    ],
  },
  {
    id: "color",
    title: "Color Theory & Image Finishing",
    short: "Color",
    color: "#4dc3d5",
    icon: "Palette",
    description:
      "Manage, balance and shape color while protecting technical integrity.",
    source: general,
    topics: [
      "Color Perception & Context",
      "Gamut, Gamma & Transfer Functions",
      "Scopes and Signal Evaluation",
      "Balance, Neutrality & Shot Matching",
      "Contrast, Saturation & Density",
      "Secondaries, Skin & Selective Control",
      "Look Design, Display & QC",
      "Finished Scene Chapter Boss",
    ],
  },
  {
    id: "analysis",
    title: "Film Analysis & Visual Literacy",
    short: "Analysis",
    color: "#d7c383",
    icon: "ScanEye",
    description:
      "Read formal choices precisely and convert observation into reusable craft.",
    source: general,
    topics: [
      "Describe Before You Interpret",
      "Shot Scale, Duration & Pattern",
      "Mise-en-scène and Production Design",
      "Camera, Lens & Spatial Evidence",
      "Lighting, Color & Tonal Evidence",
      "Sound, Edit & Temporal Evidence",
      "Comparative Analysis & Creative Transfer",
      "Sequence Analysis Chapter Boss",
    ],
  },
  {
    id: "production",
    title: "Production Fundamentals",
    short: "Production",
    color: "#86a8ba",
    icon: "ClipboardCheck",
    description:
      "Learn safe, reliable set practice as craft knowledge rather than management software.",
    source: general,
    topics: [
      "From Intent to Executable Plan",
      "Script Breakdown for Craft Needs",
      "Shot Lists, Floor Plans & Storyboards",
      "Set Roles, Communication & Etiquette",
      "Safety, Risk & Data Responsibility",
      "Coverage Strategy & Time Tradeoffs",
      "Media, Slating & Handoffs",
      "Production Readiness Chapter Boss",
    ],
  },
  {
    id: "resolve",
    title: "DaVinci Resolve 21",
    short: "Resolve",
    color: "#b47bd5",
    icon: "Hexagon",
    description:
      "Use every Resolve page as one coherent free-version post-production workplace.",
    source: resolve,
    topics: [
      "Project Manager, Libraries & Settings",
      "Media Ingest, Metadata, Proxies & Relinking",
      "Cut Page: Fast Assembly Workflows",
      "Edit Page: Timeline, Trim & Organization",
      "Edit Page: Keyframes, Effects, Subtitles & Multicam",
      "Fusion: Nodes, Masks & Compositing Logic",
      "Fusion: Tracking, Keying, Titles & Cleanup",
      "Color: Nodes, Primaries, Scopes & Matching",
      "Color Management, CSTs, Gamut & Gamma",
      "RAW and CinemaDNG Debayer Workflow",
      "Fairlight: Editing, Routing, Buses & Sync",
      "Fairlight: EQ, Dynamics, Automation & Loudness",
      "Deliver: Codecs, Containers, Channels & QC",
      "Performance, Cache, Media Management & Troubleshooting",
      "Resolve End-to-End Chapter Boss",
    ],
  },
  {
    id: "bmcc",
    title: "Blackmagic Cinema Camera 2.5K RAW",
    short: "BMCC 2.5K",
    color: "#dd9a48",
    icon: "Video",
    description:
      "Operate the original BMCC MFT confidently from rig and exposure to CinemaDNG finishing.",
    source: bmcc,
    topics: [
      "Body, Controls, Menus & Daily Operation",
      "2.5K Sensor, Crop & Image Character",
      "CinemaDNG RAW and ProRes Recording",
      "Exposure, ISO, Highlights, WB & Tint",
      "MFT Mount, Adapters & Lens Compatibility",
      "ND, IR Contamination & Filtration",
      "SSD Media, Capacity, Offload & Verification",
      "Power, Internal Battery & External Supply",
      "Audio Inputs, Monitoring & Screen Limits",
      "Rigging, Tripod, Shoulder & Movement Limits",
      "Rolling Shutter, Ronin-M Fit & Safe Motion",
      "CinemaDNG Import, Debayer & Color Management",
      "BMCC Troubleshooting & Shoot Preparation",
      "BMCC RAW Chapter Boss",
    ],
  },
  {
    id: "m50",
    title: "Canon M50",
    short: "Canon M50",
    color: "#da6572",
    icon: "Camera",
    description:
      "Use the compact hybrid camera strategically within its recording and handling limits.",
    source: canon,
    topics: [
      "Controls, Menus & Daily Setup",
      "Exposure Behavior and Metering",
      "Autofocus Modes and Focus Strategy",
      "Recording Modes, Codecs & Frame Rates",
      "Picture Styles, White Balance & Color",
      "EF-M Lenses, Adapters & Practical Choices",
      "Strengths, Limits, Heat, Battery & Media",
      "M50 Practical Scenario Chapter Boss",
    ],
  },
  {
    id: "ronin",
    title: "DJI Ronin-M",
    short: "Ronin-M",
    color: "#64b6a4",
    icon: "Orbit",
    description:
      "Balance, tune and operate the Ronin-M safely for motivated stabilized movement.",
    source: ronin,
    topics: [
      "Hardware, Payload & Safety Inspection",
      "Mechanical Balance on Three Axes",
      "Auto Tune, Stiffness & Calibration",
      "Modes, Remote and Operator Control",
      "Power, Batteries & Field Setup",
      "Walking, Starts, Stops & Parallax",
      "BMCC and M50 Build Decisions",
      "Ronin-M Troubleshooting & Chapter Boss",
    ],
  },
  {
    id: "creative",
    title: "Creative Practice",
    short: "Creative",
    color: "#e5ad42",
    icon: "Sparkles",
    description:
      "Integrate disciplines through increasingly independent portfolio work.",
    source: general,
    topics: [
      "Constraint Study: One Space, Five Meanings",
      "Light and Lens Controlled Comparison",
      "Dialogue Scene Micro Project",
      "Visual Music and Rhythm Study",
      "Documentary Observation Mini Project",
      "Genre Reconstruction",
      "Complete Short Scene Integration Boss",
      "Portfolio Curation & Reflective Practice",
    ],
  },
];

const slug = (v: string) =>
  v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
const depth = (i: number) =>
  i < 2 ? "foundation" : i < 5 ? "developing" : i < 7 ? "advanced" : "mastery";
function makeSkill(
  seed: DomainSeed,
  title: string,
  i: number,
  previous?: string,
): Skill {
  const id = `${seed.id}-${String(i + 1).padStart(2, "0")}-${slug(title)}`;
  const isBoss =
    /boss|project|practice/i.test(title) && i === seed.topics.length - 1;
  const practice = isBoss ? 180 : 45 + i * 10;
  const lesson = lessonFor(seed.id, title);
  return {
    id,
    title,
    domainId: seed.id,
    section:
      i < 1
        ? "Foundations"
        : i < 3
          ? "Developing"
          : i < 6
            ? "Advanced Craft"
            : i < seed.topics.length - 1
              ? "Integration"
              : "Mastery",
    tier:
      seed.topics.length <= 8
        ? ([1, 2, 2, 3, 3, 3, 4, 5][i] ?? 5)
        : i === 0
          ? 1
          : i < 3
            ? 2
            : i < 6
              ? 3
              : i < 8
                ? 4
                : i === seed.topics.length - 1
                  ? 6
                  : 5,
    icon: seed.icon,
    description: lesson.why.split(/(?<=[.!?])\s/)[0],
    why: lesson.why,
    objectives: lesson.objectives,
    prerequisites: previous ? [previous] : [],
    theoryMinutes: 25 + i * 3,
    practiceMinutes: practice,
    difficulty: depth(i),
    xp: {
      theory: 35 + i * 3,
      check: 30 + i * 2,
      practice: 55 + i * 5,
      evidence: 25,
      mastery: 70 + i * 8,
    },
    theory: lesson.theory,
    examples: lesson.examples,
    mistakes: lesson.mistakes,
    check: {
      type: "multiple-choice",
      prompt: `Which workflow best demonstrates mastery of ${title.toLowerCase()} in a new production context?`,
      options: [
        "Copy a remembered setting and avoid changing it",
        "Define intent, control variables, compare evidence, then document the tradeoff",
        "Choose the most extreme visible result",
        "Defer every decision until export",
      ],
      correct: [1],
      explanation:
        "A transferable craft decision starts with intent, controls variables, uses evidence, and records consequences so the result can be repeated or revised.",
      threshold: i > 5 ? 0.8 : 0.67,
    },
    assignment: {
      id: `assignment-${id}`,
      type: isBoss
        ? "chapter boss"
        : i < 2
          ? "controlled comparison"
          : i < 5
            ? "micro exercise"
            : "mini project",
      brief: `Create a controlled study of ${title.toLowerCase()}. State the intended viewer effect, make at least two meaningfully different versions, preserve settings or a reproducible procedure, and compare the consequences for story, technical quality, downstream workflow, and practical reliability. Conclude with the version you would use and why.`,
      deliverable:
        "A concise reflection plus two labeled results or external/local references, settings, and a chosen version.",
    },
    rubric: [
      {
        id: "intent",
        label: "Intent",
        description:
          "The intended audience effect is specific and the chosen method is logically connected to it.",
        max: 4,
      },
      {
        id: "execution",
        label: "Execution",
        description:
          "The study controls relevant variables, reaches a usable technical floor, and records a repeatable process.",
        max: 4,
      },
      {
        id: "judgment",
        label: "Judgment",
        description:
          "The comparison identifies real consequences, acknowledges tradeoffs, and justifies the final choice.",
        max: 4,
      },
    ],
    evidenceOptions: [
      "reflection",
      "external-link",
      "local-reference",
      "small-file",
    ],
    mastery: [
      "Complete every theory block",
      "Pass the knowledge check at its threshold",
      "Submit the practical deliverable",
      "Score every rubric criterion and reach 8/12 overall",
      "Store a reflection, link, file, or local reference",
    ],
    unlocks: [],
    references: lesson.references,
    version: "1.0.0",
    required: true,
  };
}

const branchParents = (i: number) => {
  if (i === 0) return [];
  const pattern: Record<number, number[]> = {
    1: [0],
    2: [0],
    3: [1],
    4: [1, 2],
    5: [2],
    6: [3, 4],
    7: [4, 5, 6],
  };
  return pattern[i] ?? [i - 1];
};

export const domains: Domain[] = seeds.map((seed) => {
  const skills = seed.topics.map((topic, i) => makeSkill(seed, topic, i));
  skills.forEach(
    (skill, i) =>
      (skill.prerequisites = branchParents(i).map(
        (parent) => skills[parent].id,
      )),
  );
  skills.forEach((skill) => (skill.unlocks = []));
  skills.forEach((skill) =>
    skill.prerequisites.forEach((parent) =>
      skills.find((s) => s.id === parent)?.unlocks.push(skill.id),
    ),
  );
  return { ...seed, skills };
});

// Integration nodes deliberately cross domains while keeping foundational freedom.
const byDomain = Object.fromEntries(domains.map((d) => [d.id, d.skills]));
const crossLinks: Record<string, string[]> = {
  lighting: [byDomain.camera[4].id, byDomain.composition[2].id],
  movement: [byDomain.composition[5].id, byDomain.camera[2].id],
  editing: [byDomain.composition[5].id, byDomain.story[2].id],
  color: [byDomain.camera[5].id, byDomain.lighting[4].id],
  analysis: [byDomain.composition[1].id],
  production: [byDomain.story[2].id],
  resolve: [byDomain.editing[1].id],
  bmcc: [byDomain.camera[2].id, byDomain.lenses[1].id],
  m50: [byDomain.camera[1].id],
  ronin: [byDomain.movement[1].id],
  creative: [
    byDomain.story[2].id,
    byDomain.camera[2].id,
    byDomain.editing[1].id,
  ],
};
for (const [domainId, prereqs] of Object.entries(crossLinks)) {
  const skill = byDomain[domainId][2];
  skill.prerequisites = [...new Set([...skill.prerequisites, ...prereqs])];
  for (const prerequisite of prereqs) {
    const source = domains
      .flatMap((d) => d.skills)
      .find((s) => s.id === prerequisite);
    if (source && !source.unlocks.includes(skill.id))
      source.unlocks.push(skill.id);
  }
}

export const allSkills = domains.flatMap((d) => d.skills);
export const finalBoss: Skill = {
  ...makeSkill(
    {
      id: "final",
      title: "Final Boss",
      short: "Final Boss",
      color: "#e5ad42",
      icon: "Crown",
      description: "Final synthesis.",
      source: resolve,
      topics: [],
    },
    "BEGGIN' FOR FUEL — Cinematic Music Video",
    0,
  ),
  id: "final-boss-beggin-for-fuel",
  domainId: "final",
  section: "Final Boss",
  tier: 6,
  difficulty: "mastery",
  theoryMinutes: 90,
  practiceMinutes: 1200,
  prerequisites: domains.map((d) => d.skills.at(-1)!.id),
  xp: { theory: 250, check: 250, practice: 1000, evidence: 500, mastery: 2000 },
  description:
    "Plan, shoot, finish and present the official cinematic music-video capstone as a coherent portfolio statement.",
  why: "This final production proves that separate techniques have become integrated judgment. The work must survive the full chain from dramatic intention and camera execution through edit, sound, color, delivery, critique and reflection.",
  objectives: [
    "Translate the song into a defensible visual and editorial concept.",
    "Execute safe, technically controlled acquisition with intentional lenses, lighting, movement and performance direction.",
    "Complete a Resolve 21 edit, sound pass, CinemaDNG grade, quality-control review and portfolio presentation.",
  ],
  theory: [
    {
      heading: "Brief",
      body: "Create a complete cinematic music video for BEGGIN' FOR FUEL. Define the audience, dramatic progression, visual rules, performance approach and relationship between image rhythm and music. Planning artifacts are learning evidence: treatment, visual references, shot strategy, technical tests and risk notes. They are not production-management features inside the app.",
    },
    {
      heading: "Required production chain",
      body: "Demonstrate intentional camera, lens, composition, lighting, movement and directing choices. Use the BMCC 2.5K RAW for at least one meaningful sequence where appropriate, record and verify media safely, and make any Canon M50 or Ronin-M use technically justified. In Resolve 21, organize, edit, composite only where motivated, grade through a documented color-managed or explicit transform workflow, mix and deliver.",
    },
    {
      heading: "Completion and defense",
      body: "Submit the finished master, a review copy, selected planning evidence, three representative before-and-after or process examples, the comprehensive rubric, and a final reflection. Explain the strongest decision, the most important failure and repair, how feedback changed the cut, and what process you would carry into the next independent production.",
    },
  ],
  examples: [
    "A strong submission uses a small set of visual rules that evolve with the song and remain legible across performance, narrative and transitional material.",
    "A weak submission accumulates disconnected attractive shots, hides technical failures beneath effects, and cannot explain why its camera, edit or color choices serve the song.",
  ],
  mistakes: [
    "Building a shot collection without a dramatic or rhythmic progression.",
    "Letting stabilization, shallow depth of field, RAW flexibility, or effects become goals instead of tools.",
    "Skipping calibrated review, audio-channel checks, full-duration playback, export inspection, and backup verification.",
  ],
  assignment: {
    id: "assignment-final-boss",
    type: "final boss",
    brief:
      "Produce BEGGIN' FOR FUEL as a finished cinematic music video. Submit treatment, visual rules, a craft-focused plan, camera and workflow tests, final master, review copy, selected process evidence and a final reflective defense. The result must integrate the major curriculum domains and demonstrate a deliberate BMCC CinemaDNG-to-Resolve workflow.",
    deliverable:
      "Treatment, technical tests, final master/reference, review link, three process comparisons, completed 24-point rubric, QC notes, and final reflection.",
  },
  rubric: [
    {
      id: "concept",
      label: "Concept & directing",
      description:
        "The concept has progression, performance direction and a coherent point of view that serves the music.",
      max: 4,
    },
    {
      id: "acquisition",
      label: "Camera, lens, light & movement",
      description:
        "Acquisition choices are intentional, safe, controlled and technically appropriate to the chosen equipment.",
      max: 4,
    },
    {
      id: "edit",
      label: "Edit & visual rhythm",
      description:
        "Structure, shot selection, continuity and rhythmic development sustain attention and musical meaning.",
      max: 4,
    },
    {
      id: "finish",
      label: "Color, Fusion & image finish",
      description:
        "Color management, matching, look design and any compositing are controlled, motivated and artifact-aware.",
      max: 4,
    },
    {
      id: "sound",
      label: "Sound & delivery",
      description:
        "The music master, any additional sound, channel layout, loudness, codec and QC choices are delivery-ready.",
      max: 4,
    },
    {
      id: "reflection",
      label: "Evidence & reflective judgment",
      description:
        "Process evidence is specific, honest and demonstrates learning transfer beyond this single project.",
      max: 4,
    },
  ],
  check: {
    type: "reflection",
    prompt:
      "Before production, identify the three highest-risk links in your creative-to-delivery chain and define a reversible test for each.",
    options: ["Creative risk", "Acquisition risk", "Post-production risk"],
    correct: [0, 1, 2],
    explanation:
      "The capstone check is a pre-mortem: a concrete test must reduce uncertainty before the expensive or irreversible part of the workflow.",
    threshold: 1,
  },
  mastery: [
    "Master every required domain chapter boss",
    "Complete the capstone brief and pre-mortem",
    "Submit every required deliverable",
    "Score at least 18/24 with no criterion below 2",
    "Store the final reflection and portfolio reference",
  ],
  unlocks: ["achievement-academy-complete", "title-filmcraft-master"],
  references: [
    { ...resolve, accessed },
    { ...bmcc, accessed },
  ],
  required: true,
};
export const curriculumVersion = "1.0.0";
