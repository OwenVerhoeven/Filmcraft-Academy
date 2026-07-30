import type { Skill } from "../content/model";
import { useLanguage } from "../i18n";
import { localizeSkill } from "../content/localize";

type Kind =
  | "sensor"
  | "exposure"
  | "optics"
  | "composition"
  | "lighting"
  | "movement"
  | "sound"
  | "story"
  | "editing"
  | "color"
  | "analysis"
  | "production"
  | "nodes"
  | "camera"
  | "gimbal"
  | "practice";
function kindFor(skill: Skill): Kind {
  const t = skill.title.toLowerCase();
  if (/sensor|image formation|photosite|rolling shutter/.test(t))
    return "sensor";
  if (
    /exposure|iso|shutter|dynamic range|white balance|histogram|waveform|false color/.test(
      t,
    )
  )
    return "exposure";
  if (
    skill.domainId === "lenses" ||
    /lens|focus|aperture|focal|depth of field|filter|nd|polariz/.test(t)
  )
    return "optics";
  if (skill.domainId === "composition") return "composition";
  if (skill.domainId === "lighting") return "lighting";
  if (skill.domainId === "movement") return "movement";
  if (
    skill.domainId === "sound" ||
    /audio|dialogue|ambience|room tone|microphone|loudness/.test(t)
  )
    return "sound";
  if (skill.domainId === "story") return "story";
  if (
    skill.domainId === "editing" ||
    /cut|timeline|trim|montage|multicam/.test(t)
  )
    return "editing";
  if (
    skill.domainId === "color" ||
    /color|gamut|gamma|scope|grade|debayer|raw/.test(t)
  )
    return "color";
  if (skill.domainId === "analysis") return "analysis";
  if (skill.domainId === "production") return "production";
  if (
    skill.domainId === "resolve" ||
    /fusion|fairlight|node|deliver|codec|cache|media/.test(t)
  )
    return "nodes";
  if (skill.domainId === "bmcc" || skill.domainId === "m50") return "camera";
  if (skill.domainId === "ronin") return "gimbal";
  return "practice";
}
const labels: Record<Kind, string[]> = {
  sensor: ["SCENE LIGHT", "LENS / IMAGE PLANE", "PHOTOSITES", "ENCODED IMAGE"],
  exposure: ["CAPTURED LIGHT", "MIDDLE GREY", "HEADROOM", "CLIPPING"],
  optics: ["SUBJECT", "RAY BUNDLE", "FOCAL PLANE", "RENDERED SPACE"],
  composition: ["VISUAL WEIGHT", "EYE PATH", "DEPTH LAYERS", "FRAME EDGE"],
  lighting: ["SOURCE", "DIRECTION", "SUBJECT FORM", "FALLOFF"],
  movement: ["START FRAME", "MOTIVATED PATH", "REVEAL", "LANDING"],
  sound: ["SOURCE", "DIRECT SOUND", "ROOM / NOISE", "RECORDED SIGNAL"],
  story: ["OBJECTIVE", "OBSTACLE", "ACTION", "CHANGE"],
  editing: [
    "OUTGOING SHOT",
    "DECISION POINT",
    "INCOMING SHOT",
    "VIEWER ATTENTION",
  ],
  color: ["CAMERA SPACE", "WORKING SPACE", "CREATIVE SHAPE", "DISPLAY"],
  analysis: ["OBSERVE", "DESCRIBE PATTERN", "INTERPRET EFFECT", "TRANSFER"],
  production: ["INTENTION", "PLAN & SAFETY", "CAPTURE", "VERIFY & HAND OFF"],
  nodes: ["MEDIA IN", "TRANSFORM", "CHECK / MIX", "DELIVER"],
  camera: ["SETUP", "CAPTURE MODE", "MONITOR", "MEDIA / POWER"],
  gimbal: [
    "MECHANICAL BALANCE",
    "MOTOR RESPONSE",
    "OPERATOR PATH",
    "STABLE FRAME",
  ],
  practice: [
    "QUESTION",
    "CONTROLLED VERSION A",
    "VERSION B",
    "REFLECT & TRANSFER",
  ],
};
const dutchLabels: Record<Kind, string[]> = {
  sensor: ["SCÈNELICHT", "LENS / BEELDVLAK", "FOTOSITES", "GECODEERD BEELD"],
  exposure: ["OPGEVANGEN LICHT", "MIDDENGRIJS", "SPEELRUIMTE", "CLIPPING"],
  optics: ["ONDERWERP", "LICHTBUNDEL", "FOCUSVLAK", "WEERGEGEVEN RUIMTE"],
  composition: ["VISUEEL GEWICHT", "KIJKPAD", "DIEPTELAGEN", "BEELDRAND"],
  lighting: ["BRON", "RICHTING", "VORM VAN HET ONDERWERP", "LICHTAFVAL"],
  movement: ["STARTBEELD", "GEMOTIVEERD PAD", "ONTHULLING", "EINDBEELD"],
  sound: ["BRON", "DIRECT GELUID", "RUIMTE / RUIS", "OPGENOMEN SIGNAAL"],
  story: ["DOEL", "OBSTAKEL", "HANDELING", "VERANDERING"],
  editing: [
    "UITGAAND SHOT",
    "BESLISMOMENT",
    "INKOMEND SHOT",
    "AANDACHT KIJKER",
  ],
  color: ["CAMERARUIMTE", "WERKRUIMTE", "CREATIEVE VORM", "WEERGAVE"],
  analysis: ["OBSERVEREN", "PATROON BESCHRIJVEN", "EFFECT DUIDEN", "TOEPASSEN"],
  production: [
    "INTENTIE",
    "PLAN & VEILIGHEID",
    "OPNAME",
    "CONTROLEREN & OVERDRAGEN",
  ],
  nodes: ["MEDIA IN", "BEWERKING", "CONTROLE / MIX", "OPLEVERING"],
  camera: ["OPSTELLING", "OPNAMEMODUS", "MONITOR", "MEDIA / VOEDING"],
  gimbal: [
    "MECHANISCHE BALANS",
    "MOTORRESPONS",
    "PAD OPERATOR",
    "STABIEL BEELD",
  ],
  practice: [
    "VRAAG",
    "GECONTROLEERDE VERSIE A",
    "VERSIE B",
    "REFLECTEREN & TOEPASSEN",
  ],
};

const visualGuides: Record<
  Kind,
  { en: [string, string]; nl: [string, string] }
> = {
  sensor: {
    en: [
      "Follow one piece of scene information as light: the lens redirects it, a photosite measures it, and processing turns those measurements into image pixels.",
      "This explains why focus, sensor sampling, debayering and recording format can all change detail before you ever begin grading.",
    ],
    nl: [
      "Volg één stukje scène-informatie als licht: de lens stuurt het, een fotosite meet het en verwerking zet die metingen om in beeldpixels.",
      "Dit verklaart waarom focus, sensorbemonstering, debayering en opnameformaat details al vóór de kleurcorrectie kunnen veranderen.",
    ],
  },
  exposure: {
    en: [
      "Read the scale from captured shadow detail toward the sensor's clipping limit. The curve shows how tonal values are distributed, not how bright the monitor looks.",
      "Use this model to place important skin and highlights deliberately while protecting the parts of the image the story needs.",
    ],
    nl: [
      "Lees de schaal van vastgelegde schaduwdetails tot de clippinggrens van de sensor. De curve toont hoe toonwaarden zijn verdeeld, niet hoe helder de monitor staat.",
      "Gebruik dit model om huid en highlights bewust te plaatsen en de beelddelen te beschermen die het verhaal nodig heeft.",
    ],
  },
  optics: {
    en: [
      "Trace rays from the subject through the lens until they converge on the focus plane. Rays that do not converge there become blur circles.",
      "This lets you predict focus, depth of field and field of view instead of choosing a lens by its number alone.",
    ],
    nl: [
      "Volg lichtstralen van het onderwerp door de lens tot ze op het focusvlak samenkomen. Stralen die daar niet samenkomen worden onscherptecirkels.",
      "Zo voorspel je focus, scherptediepte en beeldhoek in plaats van een lens alleen op zijn getal te kiezen.",
    ],
  },
  composition: {
    en: [
      "The frame is divided into zones so you can see where visual weight sits and how the viewer's eye is likely to travel between elements.",
      "Use the path to decide what should be noticed first, second and last—and whether the frame edge helps or distracts.",
    ],
    nl: [
      "Het kader is verdeeld in zones zodat je ziet waar visueel gewicht zit en hoe het oog waarschijnlijk tussen elementen beweegt.",
      "Gebruik het kijkpad om te bepalen wat eerst, daarna en als laatste wordt gezien en of de beeldrand daarbij helpt.",
    ],
  },
  lighting: {
    en: [
      "Start at the source, follow its direction to the subject, then observe which planes face the light and how intensity falls with distance.",
      "This connects lamp position and size to visible shape, texture, contrast and background separation.",
    ],
    nl: [
      "Begin bij de bron, volg de richting naar het onderwerp en kijk welke vlakken naar het licht wijzen en hoe de intensiteit met afstand afneemt.",
      "Dit verbindt lampstand en brongrootte met zichtbare vorm, textuur, contrast en scheiding van de achtergrond.",
    ],
  },
  movement: {
    en: [
      "Compare the starting composition with the landing composition. The path between them should reveal information or shift emphasis at a chosen moment.",
      "A motivated move has a readable beginning, a story reason during travel and a deliberate final frame.",
    ],
    nl: [
      "Vergelijk de startcompositie met de eindcompositie. Het pad ertussen moet op een gekozen moment informatie onthullen of nadruk verplaatsen.",
      "Een gemotiveerde beweging heeft een leesbaar begin, een verhaalreden onderweg en een bewust eindbeeld.",
    ],
  },
  sound: {
    en: [
      "Separate the direct sound from reflections and unwanted noise before they combine in the recorded waveform.",
      "Moving or choosing the microphone changes this balance more fundamentally than trying to repair it later.",
    ],
    nl: [
      "Scheid direct geluid van reflecties en ongewenste ruis voordat ze samenkomen in het opgenomen signaal.",
      "De microfoon verplaatsen of anders kiezen verandert deze balans fundamenteler dan reparatie achteraf.",
    ],
  },
  story: {
    en: [
      "Read the curve as pressure over time: a character pursues an objective, meets resistance, acts and arrives somewhere meaningfully different.",
      "Use each beat to test whether the situation changes; if nothing changes, the beat may not earn screen time.",
    ],
    nl: [
      "Lees de curve als druk door de tijd: een personage streeft een doel na, ontmoet weerstand, handelt en komt betekenisvol anders uit.",
      "Gebruik ieder verhaalmoment om te toetsen of de situatie verandert; zonder verandering verdient het mogelijk geen schermtijd.",
    ],
  },
  editing: {
    en: [
      "The vertical decision point is the cut. Compare what information leaves the screen with what enters, while tracking where viewer attention is carried.",
      "A good cut preserves, redirects or deliberately disrupts attention for a specific story effect.",
    ],
    nl: [
      "De verticale beslislijn is de montageknip. Vergelijk welke informatie verdwijnt met wat binnenkomt en volg waar de aandacht naartoe wordt gedragen.",
      "Een goede knip behoudt, verplaatst of verstoort aandacht bewust voor een specifiek verhaaleffect.",
    ],
  },
  color: {
    en: [
      "Follow image values through camera encoding, the working space, creative adjustments and the target display. Each stage has a different job.",
      "Keeping these stages distinct prevents technical transforms from being confused with the creative grade.",
    ],
    nl: [
      "Volg beeldwaarden door camera-encoding, werkruimte, creatieve aanpassingen en het doelscherm. Iedere fase heeft een andere taak.",
      "Door deze fasen te scheiden verwar je technische omzettingen niet met de creatieve kleurcorrectie.",
    ],
  },
  analysis: {
    en: [
      "Move from observable evidence to pattern, then interpretation, and only then to a technique you can transfer into your own work.",
      "This stops analysis becoming taste-only commentary and turns it into a repeatable filmmaking decision.",
    ],
    nl: [
      "Ga van waarneembaar bewijs naar patroon, daarna interpretatie en pas dan naar een techniek voor eigen werk.",
      "Zo wordt analyse geen losse smaakreactie maar een herhaalbare filmkeuze.",
    ],
  },
  production: {
    en: [
      "Treat production as a chain: define intent, plan constraints and safety, capture with checks, then verify and hand off clearly.",
      "A weak link creates uncertainty downstream, even when the photographed material initially looks fine.",
    ],
    nl: [
      "Behandel productie als een keten: bepaal intentie, plan beperkingen en veiligheid, neem gecontroleerd op en controleer de overdracht.",
      "Een zwakke schakel veroorzaakt later onzekerheid, ook wanneer het materiaal er aanvankelijk goed uitziet.",
    ],
  },
  nodes: {
    en: [
      "Read the boxes from left to right as signal flow. Each operation receives an image or sound state, changes it, then passes a result onward.",
      "When the result is wrong, inspect the chain stage by stage instead of changing several controls at once.",
    ],
    nl: [
      "Lees de blokken van links naar rechts als signaalstroom. Iedere bewerking ontvangt een beeld- of geluidsstaat, verandert die en geeft het resultaat door.",
      "Controleer bij een fout iedere schakel afzonderlijk in plaats van meerdere instellingen tegelijk te veranderen.",
    ],
  },
  camera: {
    en: [
      "Separate physical setup, capture mode, monitoring and media/power. A reliable camera configuration depends on all four agreeing.",
      "Use this order before a take so a correct-looking monitor does not hide an incorrect recording setting.",
    ],
    nl: [
      "Scheid fysieke opstelling, opnamemodus, monitoring en media/voeding. Een betrouwbare camera-instelling vereist dat alle vier kloppen.",
      "Gebruik deze volgorde vóór een take zodat een correct ogende monitor geen verkeerde opname-instelling verbergt.",
    ],
  },
  gimbal: {
    en: [
      "Mechanical balance comes first, motor response second, and operator movement third. The stable frame is the result of all three.",
      "Do not ask stronger motors or software smoothing to compensate for poor balance or abrupt body movement.",
    ],
    nl: [
      "Mechanische balans komt eerst, motorrespons daarna en beweging van de operator als derde. Het stabiele beeld ontstaat uit alle drie.",
      "Laat sterkere motoren of software geen slechte balans of abrupte lichaamsbeweging compenseren.",
    ],
  },
  practice: {
    en: [
      "Begin with one answerable question, change one meaningful variable between version A and B, then compare evidence before drawing a conclusion.",
      "Controlled comparison turns practice into knowledge you can repeat on the next production.",
    ],
    nl: [
      "Begin met één beantwoordbare vraag, verander één betekenisvolle variabele tussen versie A en B en vergelijk bewijs vóór je concludeert.",
      "Gecontroleerde vergelijking maakt van oefenen kennis die je bij de volgende productie kunt herhalen.",
    ],
  },
};

const theoryMap: Partial<Record<Kind, number[]>> = {
  sensor: [0, 0, 1, 3],
  optics: [0, 0, 1, 2],
};

function firstSentence(body: string) {
  const match = body.match(/^.*?[.!?](?:\s|$)/);
  return (match?.[0] ?? body).trim();
}

function Diagram({ kind }: { kind: Kind }) {
  if (kind === "exposure" || kind === "color")
    return (
      <>
        <defs>
          <linearGradient id="spectrum">
            <stop stopColor="#17252b" />
            <stop offset=".52" stopColor="#51c4c7" />
            <stop offset=".78" stopColor="#e5ad42" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
        </defs>
        <rect
          x="55"
          y="92"
          width="610"
          height="70"
          rx="3"
          fill="url(#spectrum)"
        />
        <path d="M90 185V65M250 185V65M430 185V65M630 185V65" />
        <path
          className="accent"
          d="M70 62 C190 62 205 32 300 62 S470 102 650 42"
        />
      </>
    );
  if (kind === "optics" || kind === "sensor")
    return (
      <>
        <circle cx="90" cy="125" r="30" />
        <path
          className="accent"
          d="M120 94L310 116L120 156M120 156L310 134L120 94"
        />
        <path d="M310 55V195M345 55V195" />
        <g className="pixels">
          {[0, 1, 2, 3, 4].map((x) =>
            [0, 1, 2].map((y) => (
              <rect
                key={`${x}${y}`}
                x={390 + x * 42}
                y={82 + y * 42}
                width="28"
                height="28"
              />
            )),
          )}
        </g>
        <path d="M345 125H390" />
      </>
    );
  if (kind === "composition" || kind === "analysis")
    return (
      <>
        <rect x="70" y="42" width="580" height="174" />
        <path d="M263 42V216M456 42V216M70 100H650M70 158H650" />
        <circle className="accent fill" cx="455" cy="101" r="18" />
        <path
          className="accent"
          d="M100 190C230 170 320 95 455 101S590 85 630 55"
        />{" "}
      </>
    );
  if (kind === "lighting")
    return (
      <>
        <circle className="accent fill" cx="110" cy="80" r="36" />
        <path className="accent" d="M145 86L355 112M145 104L355 152" />
        <circle cx="390" cy="125" r="54" />
        <path d="M390 71A54 54 0 0 1 390 179" />
        <path d="M444 125H610M510 90L610 125L510 160" />{" "}
      </>
    );
  if (kind === "movement" || kind === "gimbal")
    return (
      <>
        <rect x="70" y="65" width="128" height="90" />
        <rect x="520" y="65" width="128" height="90" />
        <path
          className="accent"
          d="M135 185C190 80 290 205 360 105S510 45 580 110"
        />
        <circle className="accent fill" cx="135" cy="185" r="10" />
        <circle className="accent fill" cx="580" cy="110" r="10" />
        <path d="M330 68h60v46h-60zM360 114v45M325 159h70" />{" "}
      </>
    );
  if (kind === "sound")
    return (
      <>
        <path
          className="accent"
          d="M55 125h50l18-45 28 100 32-135 33 160 35-105 28 50 22-25h45"
        />
        <path d="M390 60v130M430 75v100M470 92v66M510 105v40M550 114v22M590 120v10" />
        <circle cx="620" cy="125" r="45" />{" "}
      </>
    );
  if (kind === "story")
    return (
      <>
        <path d="M65 190C160 190 150 125 245 125S320 55 405 55S500 125 650 38" />
        <circle className="accent fill" cx="70" cy="190" r="11" />
        <circle className="accent fill" cx="245" cy="125" r="11" />
        <circle className="accent fill" cx="405" cy="55" r="11" />
        <circle className="accent fill" cx="645" cy="42" r="11" />
        <path d="M70 205V220M245 140V220M405 70V220M645 57V220" />{" "}
      </>
    );
  if (kind === "editing")
    return (
      <>
        <rect x="55" y="55" width="290" height="60" />
        <rect x="365" y="55" width="300" height="60" />
        <rect x="55" y="135" width="390" height="46" />
        <rect x="445" y="135" width="220" height="46" />
        <path className="accent" d="M355 38V205" />
        <path d="M320 38L355 18L390 38" />{" "}
      </>
    );
  if (
    kind === "production" ||
    kind === "nodes" ||
    kind === "camera" ||
    kind === "practice"
  )
    return (
      <>
        {[65, 225, 385, 545].map((x, i) => (
          <g key={x}>
            <rect
              className={i === 1 || i === 2 ? "accent" : ""}
              x={x}
              y={82}
              width="110"
              height="86"
              rx="5"
            />
            {i < 3 && <path d={`M ${x + 110} 125 H ${x + 150}`} />}
          </g>
        ))}
        <path
          className="accent"
          d="M190 125l16-10v20zM350 125l16-10v20zM510 125l16-10v20z"
        />
      </>
    );
  return null;
}

export function LessonVisual({ skill }: { skill: Skill }) {
  const { language } = useLanguage(),
    text = localizeSkill(skill, language),
    kind = kindFor(skill),
    steps = language === "nl" ? dutchLabels[kind] : labels[kind],
    guide = visualGuides[kind][language === "nl" ? "nl" : "en"],
    mappedTheory = theoryMap[kind] ?? [0, 1, 2, 3];
  return (
    <figure className="lesson-visual">
      <div className="visual-heading">
        <small>{language === "nl" ? "VISUEEL MODEL" : "VISUAL MODEL"}</small>
        <h2>{text.title}</h2>
        <p>{guide[0]}</p>
      </div>
      <div className="visual-question">
        <b>
          {language === "nl" ? "HOE LEES JE DIT?" : "HOW DO YOU READ THIS?"}
        </b>
        <span>
          {language === "nl"
            ? "Volg de genummerde stappen van links naar rechts. De verbindingslijnen tonen hoe informatie van de ene fase naar de volgende gaat."
            : "Follow the numbered stages from left to right. The connecting lines show how information passes from one stage to the next."}
        </span>
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-labelledby={`visual-${skill.id}`}
      >
        <title id={`visual-${skill.id}`}>{text.title} visual model</title>
        {[90, 275, 455, 630].map((x, i) => (
          <g className="diagram-number" key={x}>
            <circle cx={x} cy="25" r="16" />
            <text x={x} y="31" textAnchor="middle">
              {i + 1}
            </text>
          </g>
        ))}
        <Diagram kind={kind} />
      </svg>
      <ol>
        {steps.map((step, i) => (
          <li key={step}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <span>{step}</span>
            <strong>{text.theory[mappedTheory[i]]?.heading}</strong>
            <p>
              {firstSentence(
                text.theory[mappedTheory[i]]?.body ?? text.objectives[i],
              )}
            </p>
          </li>
        ))}
      </ol>
      <figcaption>
        <b>
          {language === "nl"
            ? "WAAROM DIT OP DE SET TELT"
            : "WHY THIS MATTERS ON SET"}
        </b>
        <p>{guide[1]}</p>
      </figcaption>
    </figure>
  );
}
