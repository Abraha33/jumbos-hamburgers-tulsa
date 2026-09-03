import Image from "next/image";

export function JumbosLogo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <span className={`jumbos-logo ${className ?? ""}`}>
      <Image unoptimized src="/brand/logo-full.webp" alt="Jumbo's Hamburgers" width={652} height={262} priority={priority} />
    </span>
  );
}
