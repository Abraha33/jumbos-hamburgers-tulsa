import Image from "next/image";

const ICONS = {
  burgers: "/icons/burger.webp",
  fries: "/icons/fries.webp",
  gyros: "/icons/gyro-wrap.webp",
  salads: "/icons/salad.webp",
  subs: "/icons/gyro-wrap.webp",
  sides: "/icons/onion-rings.webp",
  chilis: "/icons/onion-rings.webp",
  melts: "/icons/burger.webp",
  dinners: "/icons/burger.webp",
  kids: "/icons/fries.webp",
  meals: "/icons/drink.webp",
} as const;

export type FoodIconName = keyof typeof ICONS;

export function HandDrawnIcon({ name, size = 48, className }: { name: FoodIconName; size?: number; className?: string }) {
  return (
    <span className="icon-art" style={{ width: size, height: size }} aria-hidden="true">
      <Image unoptimized src={ICONS[name]} alt="" width={size} height={size} className={`icon-img ${className ?? ""}`} />
    </span>
  );
}
