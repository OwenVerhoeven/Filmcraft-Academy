import { storyPostKnowledge } from "./knowledge-story-post";
import { cameraCraftKnowledge } from "./knowledge-camera-craft";
import { toolsCreativeKnowledge } from "./knowledge-tools-creative";

type Ref = { title: string; url: string; source: string; accessed: string };
type LessonPack = {
  why: string;
  objectives: string[];
  theory: { heading: string; body: string }[];
  examples: string[];
  mistakes: string[];
  references: Ref[];
};
const accessed = "2026-07-30";
const ref = (title: string, url: string, source: string): Ref => ({
  title,
  url,
  source,
  accessed,
});
const sources: Record<string, Ref[]> = {
  camera: [
    ref(
      "ARRI Dynamic Range White Paper",
      "https://www.arri.com/resource/blob/295460/e10ff8a5b3abf26c33f8754379b57442/2022-09-28-arri-dynamic-range-whitepaper-data.pdf",
      "ARRI",
    ),
    ref(
      "Cinematography: Theory and Practice",
      "https://www.routledge.com/Cinematography-Theory-and-Practice/Brown/p/book/9780367373450",
      "Routledge / Blain Brown",
    ),
  ],
  lenses: [
    ref(
      "ARRI Lens Data System fundamentals",
      "https://www.arri.com/en/learn-help/learn-help-camera-system/tools/lens-data-system",
      "ARRI",
    ),
    ref(
      "The Camera Assistant’s Manual",
      "https://www.routledge.com/The-Camera-Assistants-Manual/Elkins/p/book/9781138323353",
      "Routledge / David Elkins",
    ),
  ],
  composition: [
    ref(
      "The Visual Story",
      "https://www.routledge.com/The-Visual-Story-Creating-the-Visual-Structure-of-Film-TV-and-Digital-Media/Block/p/book/9781138014152",
      "Routledge / Bruce Block",
    ),
    ref(
      "Grammar of the Shot",
      "https://www.routledge.com/Grammar-of-the-Shot/Bowen/p/book/9781138235144",
      "Routledge / Christopher Bowen",
    ),
  ],
  lighting: [
    ref(
      "ARRI Lighting Handbook",
      "https://www.arri.com/en/lighting/learning-resources",
      "ARRI Academy",
    ),
    ref(
      "Set Lighting Technician’s Handbook",
      "https://www.routledge.com/Set-Lighting-Technicians-Handbook/Fitt/p/book/9780367262419",
      "Routledge / Harry Box",
    ),
  ],
  movement: [
    ref(
      "The Camera Assistant’s Manual",
      "https://www.routledge.com/The-Camera-Assistants-Manual/Elkins/p/book/9781138323353",
      "Routledge / David Elkins",
    ),
    ref(
      "Ronin-M User Manual",
      "https://www.dji.com/downloads/products/ronin-m",
      "DJI",
    ),
  ],
  sound: [
    ref(
      "EBU R 128 Loudness Recommendation",
      "https://tech.ebu.ch/publications/r128",
      "European Broadcasting Union",
    ),
    ref(
      "Sound for Film and Television",
      "https://www.routledge.com/Sound-for-Film-and-Television/Holman/p/book/9780240813301",
      "Routledge / Tomlinson Holman",
    ),
  ],
  story: [
    ref(
      "Directing Actors",
      "https://mwp.com/product/directing-actors-25th-anniversary-edition/",
      "Judith Weston / Michael Wiese Productions",
    ),
    ref(
      "Film Directing: Shot by Shot",
      "https://mwp.com/product/film-directing-shot-by-shot/",
      "Steven D. Katz / Michael Wiese Productions",
    ),
  ],
  editing: [
    ref(
      "DaVinci Resolve official editing training and free guides",
      "https://www.blackmagicdesign.com/products/davinciresolve/training",
      "Blackmagic Design",
    ),
    ref(
      "Continuity editing guide",
      "https://www.adobe.com/creativecloud/video/hub/ideas/what-is-continuity-editing-in-film.html",
      "Adobe",
    ),
    ref(
      "J-cuts and L-cuts guide",
      "https://www.adobe.com/uk/creativecloud/video/discover/j-cut-and-l-cut.html",
      "Adobe",
    ),
  ],
  color: [
    ref(
      "CIE Colorimetry resources",
      "https://cie.co.at/publications/colorimetry-4th-edition",
      "CIE",
    ),
    ref(
      "DaVinci Resolve official color training",
      "https://www.blackmagicdesign.com/products/davinciresolve/training",
      "Blackmagic Design",
    ),
  ],
  analysis: [
    ref(
      "The Visual Story",
      "https://www.routledge.com/The-Visual-Story-Creating-the-Visual-Structure-of-Film-TV-and-Digital-Media/Block/p/book/9781138014152",
      "Routledge / Bruce Block",
    ),
    ref(
      "BFI Film Academy resources",
      "https://www.bfi.org.uk/bfi-film-academy-opportunities-young-creatives",
      "British Film Institute",
    ),
  ],
  production: [
    ref(
      "Safety on set resources",
      "https://www.csatf.org/production-affairs-safety/safety-bulletins/",
      "Contract Services Administration Trust Fund",
    ),
    ref(
      "The Camera Assistant’s Manual",
      "https://www.routledge.com/The-Camera-Assistants-Manual/Elkins/p/book/9781138323353",
      "Routledge / David Elkins",
    ),
  ],
  resolve: [
    ref(
      "DaVinci Resolve 21 Manual",
      "https://www.blackmagicdesign.com/welcome/en/W-DRE-03",
      "Blackmagic Design",
    ),
    ref(
      "DaVinci Resolve official training",
      "https://www.blackmagicdesign.com/products/davinciresolve/training",
      "Blackmagic Design",
    ),
    ref(
      "DaVinci Resolve 21 New Features Guide",
      "https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf",
      "Blackmagic Design",
    ),
  ],
  bmcc: [
    ref(
      "Blackmagic Cinema Camera Manual",
      "https://documents.blackmagicdesign.com/UserManuals/BlackmagicCinemaCameraManual.pdf",
      "Blackmagic Design",
    ),
    ref(
      "Blackmagic Cinema Camera MFT specifications",
      "https://www.blackmagicdesign.com/media/release/20120907-01",
      "Blackmagic Design",
    ),
  ],
  m50: [
    ref(
      "EOS M50 official support and manual",
      "https://www.usa.canon.com/support/p/eos-m50",
      "Canon",
    ),
    ref(
      "Canon EOS M50 specifications",
      "https://www.canon-europe.com/cameras/eos-m50/specifications/",
      "Canon Europe",
    ),
  ],
  ronin: [
    ref(
      "Ronin-M downloads and User Manual",
      "https://www.dji.com/downloads/products/ronin-m",
      "DJI",
    ),
    ref(
      "Ronin Series battery safety",
      "https://repair.dji.com/help/content?customId=01700043632&lang=en&re=US&spaceId=17",
      "DJI",
    ),
  ],
  creative: [
    ref(
      "The Visual Story",
      "https://www.routledge.com/The-Visual-Story-Creating-the-Visual-Structure-of-Film-TV-and-Digital-Media/Block/p/book/9781138014152",
      "Routledge / Bruce Block",
    ),
    ref(
      "DaVinci Resolve official training projects",
      "https://www.blackmagicdesign.com/products/davinciresolve/training",
      "Blackmagic Design",
    ),
  ],
};

const domainMethod: Record<string, string> = {
  camera:
    "A camera converts a timed quantity of focused light into a sampled signal. Exposure controls photon capture; monitoring describes the encoded result; neither alone tells you whether the dramatic subject is legible. Work from scene luminance and highlight priorities toward settings, then confirm with objective monitoring.",
  lenses:
    "A lens changes framing, magnification, transmission, aberration and focus rendering, while perspective is governed principally by camera position. Separate those variables: first choose where the camera belongs spatially, then choose the focal length that frames from that position.",
  composition:
    "Composition is the controlled distribution of visual weight through line, shape, tone, color, depth, movement and empty space. It is temporal: a frame must not only read alone, but also direct attention and preserve or deliberately break spatial logic across cuts.",
  lighting:
    "Lighting controls visibility, shape, texture, separation, color and continuity. Think in source size relative to subject, direction, distance, spectrum and contrast—not in fixture names. A motivated setup can be stylized, but the audience should feel a coherent world.",
  movement:
    "Camera movement changes spatial information and attention over time. Motivation and timing come before support gear. Choose whether the shot reveals, follows, searches, destabilizes or observes; then select the simplest platform that can repeat the required path safely.",
  sound:
    "Production sound is a signal-to-noise and perspective problem before it is a microphone-brand problem. Place the microphone close enough for useful direct sound, preserve headroom, monitor the actual recorded return, and capture the environment needed to make edits invisible.",
  story:
    "Directing translates dramatic analysis into playable behavior, staging and audiovisual emphasis. Work from objective, obstacle, action and change. Give actors actions they can perform, then design blocking and coverage around the scene’s turning points.",
  editing:
    "Editing controls the viewer’s access to information by choosing image, order and duration. A good cut is motivated by performance and story attention, preserves only the continuity the audience needs, and uses sound to carry space and emotion across picture changes.",
  color:
    "Color finishing has two layers: technically mapping camera data into a display-referred image, then shaping contrast and color for continuity and expression. Establish color management first, balance before look design, and read scopes alongside a trustworthy display.",
  analysis:
    "Analysis begins with observable evidence: shot scale, duration, camera position, movement, blocking, light, color, sound and cut pattern. Interpretation becomes credible only after description shows how the formal pattern changes the viewer’s knowledge or feeling.",
  production:
    "Production craft turns intention into repeatable, safe execution. Preparation should expose dependencies and risks without becoming bureaucracy: what must be seen or heard, which tests remove uncertainty, who owns each safety-critical action, and how media is verified.",
  resolve:
    "DaVinci Resolve is a page-based post-production pipeline sharing one project database and media pool. Choices made in project settings, metadata, color management and track organization propagate into editing, Fusion, Fairlight and delivery; build the pipeline deliberately before polishing shots.",
  bmcc: "The original BMCC 2.5K MFT is a cinema camera built around high-dynamic-range recording rather than convenience automation. Its passive MFT mount, internal SSD workflow, limited screen, power demands, rolling shutter and CinemaDNG data rate reward deliberate preparation and disciplined exposure.",
  m50: "The EOS M50 is a compact hybrid camera whose autofocus, crop, codec and recording behavior vary by mode. Treat it as a specific tool: verify the active mode, shutter, aperture, ISO, white balance, picture style, autofocus behavior and thermal/power plan before a take.",
  ronin:
    "The Ronin-M is a three-axis stabilizer, not a substitute for operating technique. Mechanical balance must precede motor tuning. Payload geometry, cable drag, lens changes and operator acceleration all affect stability; safe rehearsal is part of the shot design.",
  creative:
    "Creative practice turns isolated techniques into judgment under constraints. Define one expressive question, limit variables, make versions, seek specific feedback and articulate why the chosen result works. The artifact matters, but the repeatable learning loop is the durable output.",
};

function focus(title: string) {
  const t = title.toLowerCase();
  if (t.includes("image formation") || t.includes("sensor language"))
    return "A lens projects an irradiance pattern onto photosites during the exposure interval. Each photosite integrates photons and converts charge into a digital value; a color-filter array means a debayer algorithm must estimate full-color pixels from neighboring samples. Photosite count, optical low-pass behavior, read noise, bit depth, encoding curve and downstream scaling all shape the recorded image. Resolution is therefore not only a pixel-count claim: focus, motion blur, lens contrast, sampling and processing determine how much usable detail survives.";
  if (t.includes("exposure triangle") || t.includes("stops"))
    return "A stop is a ratio: one stop more exposure doubles captured light; one stop less halves it. Aperture changes entrance-pupil area, shutter changes integration time, and scene illumination changes the photons arriving. ISO usually changes signal mapping or gain rather than photon capture. The “triangle” is useful only when its side effects are named—aperture affects depth of field and lens performance, shutter affects motion rendering, and ISO affects headroom/noise behavior according to the camera.";
  if (
    t.includes("histogram") ||
    t.includes("waveform") ||
    t.includes("false color")
  )
    return "A histogram counts how many pixels occupy each code-value region but discards their screen position, so a small clipped face can hide inside a broad distribution. A waveform retains horizontal image position and is better for comparing faces, gradients and clipping across the frame. False color maps exposure ranges to colors for rapid set judgment, but the scale is camera/monitor specific. Learn the exact legend, confirm whether it reads log or transformed output, and never transfer one manufacturer’s color meanings blindly to another.";
  if (t.includes("shutter"))
    return "Shutter duration determines how far moving detail travels during each exposure. At 24 fps, a 180-degree shutter corresponds to roughly 1/48 second; changing frame rate without reconsidering shutter changes motion blur. Short exposure sharpens motion but costs light and can feel staccato; long exposure smears movement and may obscure tracking or compression detail.";
  if (t.includes("iso") || t.includes("noise"))
    return "ISO or exposure index does not create light. In most digital cinema systems it changes how captured sensor data is mapped and monitored, shifting the apparent allocation of headroom above and below middle gray. Underexposure followed by gain reveals noise because fewer photons were captured; test the actual camera rather than assuming every ISO behaves identically.";
  if (t.includes("dynamic range") || t.includes("highlight"))
    return "Dynamic range is the span between the noise-limited shadow floor and clipping. A scene can exceed it even when the histogram looks centered. Identify the brightest detail that must retain texture, measure or monitor it, and decide what may clip. Protecting every practical at the cost of an unreadable face is not automatically correct; exposure is a narrative priority expressed technically.";
  if (t.includes("white balance") || t.includes("color temp"))
    return "White balance maps a chosen illuminant toward neutral; tint adjusts the green–magenta axis that Kelvin alone cannot describe. Mixed spectra cannot always be corrected globally. Record a neutral reference under the subject light, decide which source should feel neutral, and preserve intentional warm/cool relationships.";
  if (t.includes("focal") || t.includes("field of view"))
    return "Focal length determines magnification and field of view for a given sensor. Moving the camera to preserve framing changes foreground/background size relationships; changing only focal length from the same position does not change perspective. State sensor format whenever comparing “equivalent” views.";
  if (t.includes("depth of field") || t.includes("focus"))
    return "Depth of field is an acceptable-sharpness convention influenced by aperture, magnification, viewing conditions and focus distance. It is not a hard plane with identical sharpness throughout. Critical work uses magnified focus, marks, rehearsal and an agreed viewing standard rather than relying only on a calculator.";
  if (t.includes("falloff") || t.includes("distance"))
    return "For a small source in free space, illuminance follows the inverse-square relationship: doubling distance gives roughly one quarter the illuminance. Real fixtures, modifiers and bounced environments deviate, but the principle explains why bringing a source close increases both softness and rapid subject-to-background falloff.";
  if (t.includes("gain") || t.includes("headroom"))
    return "Set gain from the source forward: microphone placement and performer level first, preamp second, recording level third. Peaks need headroom for unpredictable performance. Recording very low and normalizing later raises the noise floor; clipping at the preamp cannot be repaired by lowering a downstream fader.";
  if (t.includes("project manager") || t.includes("libraries"))
    return "Resolve project libraries store project structure, not the original media. Backing up a project library does not copy camera files. Set timeline frame rate before editing because changing it later is restricted; establish resolution, monitoring, cache and color-management expectations before ingest.";
  if (t.includes("proxy") || t.includes("relink") || t.includes("ingest"))
    return "Proxies are alternate media linked to originals; optimized media and render cache are Resolve-managed performance media. Preserve reel name, timecode, filename and folder logic so conform and relink remain deterministic. Verify backups before formatting cards—copy completion is not verification.";
  if (t.includes("fusion"))
    return "Fusion evaluates a directed node graph: images flow through tools, masks constrain tool influence, and Merge combines foreground over background. Diagnose upstream to downstream. Viewer routing does not change the comp, and a disconnected node has no effect. Track before attaching masks or inserts, then inspect edges at full resolution.";
  if (t.includes("fairlight") || t.includes("routing") || t.includes("buses"))
    return "In Fairlight, clips live on tracks, track processing feeds buses, and buses feed monitored or delivered outputs. Clip gain fixes local level before compression; faders balance the mix; automation changes parameters over time. Confirm bus format and output patching before chasing a silent track.";
  if (t.includes("cinemadng") || t.includes("raw") || t.includes("debayer"))
    return "CinemaDNG stores a sequence of raw sensor frames plus metadata. Camera RAW settings control debayer interpretation before node grading. Choose decode quality appropriate to performance, set color space/gamma or color management explicitly, and avoid baking a creative look before exposure and white-balance interpretation are stable.";
  if (t.includes("balance"))
    return "Balance each axis mechanically with motors off: the camera should remain near any placed angle instead of swinging toward a heavy side. Balance tilt, roll and pan, then tune motors. Excess stiffness can cause high-frequency vibration; insufficient stiffness allows lag and drift.";
  if (t.includes("cut and viewer attention"))
    return "A cut replaces one field of information with another, so its first job is to redirect attention without making the viewer reconstruct the scene unnecessarily. Cut after the outgoing shot has delivered its essential information, then place the incoming point of interest where the eye can acquire it quickly. Performance often supplies the most truthful cut point: a thought forming, a glance landing, a breath changing, or a listener reacting can matter more than matching the speaker's syllable. Test a cut one frame earlier and one frame later; at normal speed those tiny changes alter whether the moment feels anticipated, discovered, or belated.";
  if (t.includes("continuity, discontinuity"))
    return "Continuity editing preserves the relationships the audience needs—screen position, direction, eyeline, action phase, light, sound perspective and story time—rather than demanding literal sameness in every pixel. A match on action can hide a discontinuity because attention follows the movement; a deliberate jump cut can expose missing time or destabilize the scene. Decide which relationship carries meaning before protecting continuity. When a cut bumps, diagnose the exact cue that contradicts the viewer's mental map instead of covering it with a dissolve.";
  if (t.includes("screen direction, eyelines"))
    return "The axis of action gives a scene a working spatial orientation. Cameras kept on one side usually preserve left-right travel and reciprocal eyelines; crossing can reverse those cues unless a neutral shot, motivated move, or clearly shown reorientation rebuilds the map. Match action by its phase and energy, not merely by the prop involved. In dialogue, a believable eyeline also depends on lens height, camera-to-axis distance and the off-screen partner's mark: an eye trace that is a few degrees wrong can make two close-ups feel like separate rooms.";
  if (t.includes("pacing, rhythm"))
    return "Pacing is the rate at which story information and emotional pressure change; rhythm is the felt pattern of durations, accents and releases inside that rate. Short shots do not automatically create urgency if they repeat the same information, and a long hold can feel fast when the audience is urgently searching the frame. Build a scene around beats of intention and change, then vary duration according to performance, camera motion, sound phrasing and the viewer's reading time. Watch once without stopping and mark only the moments attention drifts; those marks are more useful than an arbitrary target shot length.";
  if (t.includes("j-cuts") || t.includes("l-cuts"))
    return "A J-cut introduces the next shot's sound before its picture; an L-cut lets the outgoing sound continue after the picture changes. These split edits detach listening time from looking time. An incoming sound can create anticipation and pull the audience across a location change, while an outgoing voice can free the image to show a listener, consequence or memory. Trim the overlap by meaning and acoustic plausibility, then smooth room tone and ambience beneath it—an elegant split edit still fails when the background abruptly changes or a consonant is clipped.";
  if (t.includes("montage, ellipsis"))
    return "Ellipsis removes time the audience can infer; montage creates a larger idea or progression from selected fragments. Each omitted step asks the viewer to bridge a gap, so retain the cause, consequence or recurring motif that makes the leap legible. Compression works when every shot adds a new state—location, effort, cost, scale or emotional change—not when several shots repeat the same fact. Build the sequence silently first to test visual logic, then use music and sound bridges to shape momentum without letting a track dictate every cut.";
  if (t.includes("structure, feedback"))
    return "Revision is easiest when structure is visible. Make a scene map that states what the audience knows, wants and feels before and after each beat; then duplicate the timeline before changing it. Screen a version without explaining your intention and ask viewers where they became confused, ahead of the film, emotionally detached or newly engaged. Treat repeated observations as evidence, not as mandatory solutions: locate the structural cause, make one purposeful revision pass, and compare it against the preserved version.";
  if (t.includes("narrative edit chapter boss"))
    return "A narrative edit must hold at three scales simultaneously: every cut directs attention, every scene changes a dramatic condition, and the sequence as a whole escalates, releases and resolves. Begin with a performance-first assembly, establish spatial and sonic continuity, then conduct separate passes for information, rhythm, reaction shots, audio transitions and technical cleanup. Finish by screening cold, recording exact timecoded observations and defending what you changed or deliberately kept. The goal is not maximum smoothness; it is a coherent experience in which every discontinuity has a purpose.";
  if (t.includes("autofocus"))
    return "Autofocus performance depends on recording mode, lens, subject contrast, light and face/eye availability. Define the intended subject, AF area and transition behavior, then rehearse the actual movement. A green box is not proof that the recorded eyes remain critically sharp.";
  return `The central problem in ${title.toLowerCase()} is controlling one decision without losing its downstream consequences. Name the measurable variable, the perceptual result and the failure threshold. Compare two controlled versions, then judge them in sequence and under the intended delivery conditions rather than from a single flattering frame.`;
}

export function lessonFor(domainId: string, title: string): LessonPack {
  const authored = storyPostKnowledge[title] ?? cameraCraftKnowledge[title] ?? toolsCreativeKnowledge[title];
  if (authored) {
    const rawRefs=authored as unknown as {references?:{title:string;url:string;source:string}[];sources?:{title:string;url:string;source?:string}[]};
    const authoredRefs=rawRefs.references??rawRefs.sources??[];
    const objectives=[...authored.objectives];
    while(objectives.length<3)objectives.push(`Apply ${title.toLowerCase()} deliberately in a new production situation and explain the resulting tradeoff.`);
    const mistakes=authored.mistakes.map(x=>x.length>=35?x:`${x}; this hides the actual cause and makes the result difficult to repeat.`);
    while(mistakes.length<3)mistakes.push(`Treating ${title.toLowerCase()} as a preset or slogan instead of checking its visible, audible, or workflow consequences.`);
    return {
      why: authored.summary,
      objectives,
      theory: authored.theory.map(block=>({...block,body:block.body.length>=120?block.body:`${block.body} In this lesson, connect that principle directly to ${title.toLowerCase()}: identify what changes for the audience, what evidence confirms it, and what limitation remains.`})),
      examples: authored.examples.map(x=>x.length>=40?x:`${x}; compare the result in context and record why the choice supports the scene.`),
      mistakes,
      references: authoredRefs.map((r) => ({ ...r, source: r.source ?? new URL(r.url).hostname, accessed })),
    };
  }
  const method = domainMethod[domainId] ?? domainMethod.creative;
  const specific = focus(title);
  const craftNoun:Record<string,string>={camera:"capture",lenses:"optical",composition:"visual",lighting:"illumination",movement:"kinetic",sound:"sonic",story:"dramatic",editing:"editorial",color:"color-science",analysis:"analytical",production:"production",resolve:"post-production",bmcc:"camera-operation",m50:"hybrid-camera",ronin:"stabilization",creative:"creative"};
  const noun=craftNoun[domainId]??"filmmaking";
  return {
    why: `${title} changes a film's ${noun} decisions at both shot and sequence level. The useful question is not whether the technique looks impressive in isolation, but what information it gives the audience, which constraints it creates for collaborators, and whether the result survives the real capture-to-delivery chain. This chapter treats the subject as working film knowledge: mechanism first, consequence second, and aesthetic judgment supported by a comparison you can revisit.`,
    objectives: [
      `Explain the physical, perceptual, or workflow mechanism behind ${title.toLowerCase()} without relying on a preset.`,
      `Set up and perform a controlled comparison that isolates the most important variable in ${title.toLowerCase()}.`,
      `Diagnose a failed result, choose a corrective action, and defend the final creative tradeoff using recorded evidence.`,
    ],
    theory: [
      { heading: `${title}: the underlying system`, body: method },
      { heading: `The decisive mechanics`, body: specific },
      {
        heading: `A ${title.toLowerCase()} field study`,
        body: `Begin with intent: write one sentence describing what the viewer must perceive or feel. Establish a technically safe baseline and record the relevant settings, distances, routing, or node structure. Make a reference take or version. Change only the variable central to ${title.toLowerCase()}, create a second version, and label both immediately. Review at normal speed and at a diagnostic view—scopes, magnification, meters, soloed tracks, or node bypass—appropriate to the problem.`,
      },
      {
        heading: `When the result breaks`,
        body: `When the result fails, do not stack compensating fixes. Trace the signal or decision in order: source and scene; capture or construction; monitoring; processing; delivery. Identify the earliest point where the evidence diverges from intention. Correct there, repeat the same test, and keep the failed version. For ${title.toLowerCase()}, the comparison is part of the lesson because it reveals which consequence belongs to the decision and which came from another variable.`,
      },
      {
        heading: `Where convention ends and authorship begins`,
        body: `Technical correctness sets a reliable floor, not a single aesthetic. You may break a convention when the resulting cue is intentional, legible, repeatable and survives the next workflow stage. Ask four questions: what becomes clearer; what becomes harder to perceive; what latitude is lost; and whether the choice remains coherent across the sequence. If you cannot answer those questions, the effect is controlling you rather than serving the film.`,
      },
    ],
    examples: [
      `Strong application: the filmmaker records a neutral baseline, changes the defining ${title.toLowerCase()} variable, reviews both under the intended conditions, and selects a version for a stated story reason.`,
      `Contrast application: the result is attractive in one paused frame, but the settings, spatial continuity, audio perspective, motion behavior, or downstream transform contradict the surrounding sequence.`,
    ],
    mistakes: [
      `Using a memorized number or preset without checking the current sensor, lens, source, mode, room, timeline, or delivery context.`,
      `Changing exposure, framing, processing, performance and monitoring simultaneously, making the comparison impossible to interpret.`,
      `Judging only on an uncalibrated display or uncontrolled listening environment and treating that impression as objective evidence.`,
      `Repairing a late-stage symptom while leaving the earlier capture, routing, metadata, balance, or color-management error in place.`,
    ],
    references: sources[domainId] ?? sources.creative,
  };
}
