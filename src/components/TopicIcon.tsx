import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  Aperture,
  AudioLines,
  AudioWaveform,
  BatteryCharging,
  Camera,
  ChartNoAxesCombined,
  CircleDot,
  Clapperboard,
  ClipboardCheck,
  Contrast,
  Drama,
  Eye,
  Film,
  Focus,
  Frame,
  Gauge,
  GitBranch,
  HardDrive,
  HardHat,
  Headphones,
  Hexagon,
  LampDesk,
  Lightbulb,
  ListChecks,
  Mic2,
  MonitorDot,
  Move3d,
  Orbit,
  Palette,
  PersonStanding,
  Pipette,
  ScanEye,
  Scissors,
  Settings2,
  Sparkles,
  Sun,
  Target,
  ThermometerSun,
  Timer,
  UsersRound,
  Video,
  WandSparkles,
  Workflow,
  Zap,
} from "lucide-react";

type IconComponent = ComponentType<LucideProps>;

const domainIcons: Record<string, IconComponent> = {
  camera: Aperture,
  lenses: CircleDot,
  composition: Frame,
  lighting: Sun,
  movement: Move3d,
  sound: AudioWaveform,
  story: Drama,
  editing: Clapperboard,
  color: Palette,
  analysis: ScanEye,
  production: ClipboardCheck,
  resolve: Hexagon,
  bmcc: Video,
  m50: Camera,
  ronin: Orbit,
  creative: Sparkles,
  final: Film,
};

const rules: Array<[RegExp, IconComponent]> = [
  [/image formation|sensor|photosite|rolling shutter/i, ScanEye],
  [/exposure triangle|\bstops?\b|iso|gain|noise/i, Gauge],
  [/shutter|cadence|frame rate|duration|pacing|rhythm/i, Timer],
  [/dynamic range|highlight|contrast/i, ChartNoAxesCombined],
  [/white balance|temperature|tint/i, ThermometerSun],
  [/histogram|waveform|false color|scopes?|signal evaluation/i, MonitorDot],
  [/focal|field of view|lens|optics|aberration|filter|polarization/i, Aperture],
  [/focus|depth of field|circle of confusion/i, Focus],
  [/frame|aspect ratio|negative space|composition/i, Frame],
  [/balance|visual hierarchy|weight/i, Contrast],
  [/eyeline|viewer attention|point of view/i, Eye],
  [/light quality|source|falloff|photometric/i, Lightbulb],
  [/key, fill|practical light|lighting faces|lighting.*spaces/i, LampDesk],
  [/camera move|pan|handheld|doll|slider|parallax|gimbal|stabil/i, Move3d],
  [/blocking|body mechanics|walking|operator/i, PersonStanding],
  [/microphone|dialogue|room tone|ambience|sound perspective/i, Mic2],
  [/gain staging|loudness|eq|dynamics|audio|fairlight/i, AudioLines],
  [/monitoring|sync|remote|radio/i, Headphones],
  [/dramatic|character|conflict|objective|action/i, Target],
  [/directing actors|performance|ethical collaboration/i, UsersRound],
  [/cut|trim|edit page|timeline|montage|ellipsis/i, Scissors],
  [/j-cuts|l-cuts|audio bridges/i, AudioWaveform],
  [/structure|revision|workflow|handoff|end-to-end/i, Workflow],
  [/color perception|gamut|gamma|saturation|look design/i, Palette],
  [/balance, neutrality|shot matching|white balance/i, Pipette],
  [/describe|analysis|visual literacy|evidence/i, ScanEye],
  [/script breakdown|shot list|plan|readiness|daily setup/i, ListChecks],
  [/safety|risk|inspection|set roles/i, HardHat],
  [/media|ssd|proxy|relink|cache|offload/i, HardDrive],
  [/project manager|settings|menus|calibration|auto tune/i, Settings2],
  [/fusion|nodes|compositing|keying|tracking/i, GitBranch],
  [/deliver|codec|container|recording mode|prores|cinemadng|raw/i, Film],
  [/battery|power|supply/i, BatteryCharging],
  [/autofocus|metering|camera controls|body, controls/i, Camera],
  [/hardware|payload|rigging|mount|adapter/i, Settings2],
  [/constraint|creative|portfolio|genre reconstruction/i, WandSparkles],
  [/chapter boss|integration project|scenario/i, Zap],
];

export function iconForTopic(title: string, domainId: string): IconComponent {
  return (
    rules.find(([pattern]) => pattern.test(title))?.[1] ??
    domainIcons[domainId] ??
    CircleDot
  );
}

export function TopicIcon({
  title,
  domainId,
  ...props
}: LucideProps & { title: string; domainId: string }) {
  const Icon = iconForTopic(title, domainId);
  return <Icon aria-hidden="true" {...props} />;
}

export function DomainIcon({
  domainId,
  ...props
}: LucideProps & { domainId: string }) {
  const Icon = domainIcons[domainId] ?? CircleDot;
  return <Icon aria-hidden="true" {...props} />;
}
