const ICONS = {
  bodyscan: "/assets/icons/bodyscan.png",
  camera: "/assets/icons/camera.png",
  barcode: "/assets/icons/barcode.png",
  sparkle: "/assets/icons/ai-sparkle.png",
  chat: "/assets/icons/chat.png",
  chart: "/assets/icons/chart.png",
  check: "/assets/icons/check.png",
  leaf: "/assets/icons/leaf.png",
  clock: "/assets/icons/clock.png",
  shield: "/assets/icons/shield.png",
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return <img src={ICONS[name]} alt="" aria-hidden="true" className={className} />;
}
