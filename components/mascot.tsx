import Image from "next/image";

const POSES = {
  wave: { src: "/icons/mascot-wave.webp", w: 440, h: 400 },
  thumbsup: { src: "/icons/mascot-thumbsup.webp", w: 430, h: 415 },
  walk: { src: "/icons/mascot-walk.webp", w: 470, h: 415 },
} as const;

export function Mascot({ pose, size = 96, animate, className, alt = "" }: { pose: keyof typeof POSES; size?: number; animate?: "wave-in" | "idle" | "walk-in"; className?: string; alt?: string }) {
  const p = POSES[pose];
  return (
    <Image
      unoptimized
      src={p.src}
      alt={alt}
      width={p.w}
      height={p.h}
      className={`mascot-img ${animate ? `mascot-${animate}` : ""} ${className ?? ""}`}
      style={{ width: size, height: "auto" }}
    />
  );
}
