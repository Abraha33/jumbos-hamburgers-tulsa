import type { Metadata } from "next";
import Image from "next/image";
import { BrushUnderline } from "@/components/brush-stroke";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Gallery | Jumbo's Hamburgers Tulsa",
  description: "See Jumbo's Hamburgers storefront, real customer food photos and current in-store menu boards in Tulsa.",
  alternates: { canonical: "/gallery" },
};

const photos = [
  ["/photos/menu-meals.webp", "Current Jumbo's burger and gyro meals board"],
  ["/photos/storefront.jpg", "Jumbo's Hamburgers storefront"],
  ["/photos/fries.jpg", "French fries photographed at Jumbo's"],
  ["/photos/menu-mediterranean.webp", "Current Jumbo's Mediterranean menu board"],
  ["/photos/fried-mushrooms.jpg", "Fried mushrooms photographed at Jumbo's"],
  ["/photos/restaurant-front.jpg", "Front of Jumbo's Hamburgers in Tulsa"],
  ["/photos/menu-burgers.webp", "Current Jumbo's burgers and dinners menu board"],
] as const;

export default function GalleryPage() {
  return <SiteShell><header className="page-hero gallery-page-hero board-texture"><div><p className="kicker">Share your Jumbo&apos;s moments</p><BrushUnderline /><h1>Gallery</h1><p>Real customer-contributed views of the storefront, food and in-store menu boards.</p></div></header><section className="content-section board-texture"><div className="gallery-grid">{photos.map(([src, alt]) => <figure className="gallery-item" key={src}><Image unoptimized src={src} fill sizes="(max-width: 640px) 92vw, 45vw" alt={alt} /></figure>)}</div></section></SiteShell>;
}
