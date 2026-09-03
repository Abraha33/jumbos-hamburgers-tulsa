"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ConversionLink, emitConversion } from "@/components/conversion-link";

const eras = [
  { label: "The local storefront", title: "A Tulsa original", copy: "Jumbo's physical identity starts at the door: a small neighborhood hamburger restaurant with a menu far bigger than its name suggests.", kind: "photo", image: "/photos/storefront.jpg", alt: "Jumbo's Hamburgers storefront and exterior sign in Tulsa" },
  { label: "Heritage design language", title: "Simple words. Big appetite.", copy: "This heritage-inspired letter board interprets the physical menu style that informs the site's secondary design system. It does not assert a date or reproduce an undocumented historical menu.", kind: "letters" },
  { label: "The current menu", title: "More choice, same directness", copy: "Verified current menu-board photographs show bright categories and prices designed for quick scanning inside the restaurant.", kind: "photo", image: "/photos/menu-burgers.webp", alt: "Current Jumbo's burgers, chili, melts and dinners menu board" },
  { label: "Jumbo's today", title: "Still made for Tulsa", copy: "The invitation is direct: choose what sounds good, call ahead, or find Jumbo's on East 41st Street.", kind: "photo", image: "/photos/menu-mediterranean.webp", alt: "Current Jumbo's Mediterranean menu board" },
] as const;

function EraCopy({ era, index, showFinalCta }: { era: (typeof eras)[number]; index: number; showFinalCta: boolean }) {
  return <div className="era-copy"><strong>0{index + 1} · {era.label}</strong><h2>{era.title}</h2><p>{era.copy}</p>{showFinalCta && <ConversionLink className="paint-button yellow" href="/menu" event="story_interaction" detail={{ era: "today", action: "view_menu" }}>See today&apos;s menu</ConversionLink>}</div>;
}

function EraVisual({ era }: { era: (typeof eras)[number] }) {
  if (era.kind === "letters") return <div className="era-board letter-board" aria-label="Heritage-inspired removable-letter menu-board interpretation"><span>JUMBO&apos;S HAMBURGERS</span><span>BURGERS · GYROS</span><span>SALADS · SUBS · SIDES</span></div>;
  return <figure className="era-board"><Image unoptimized loading="eager" src={era.image} fill sizes="(max-width: 760px) 92vw, 52vw" alt={era.alt} /></figure>;
}

/** Deliberate scroll-linked depth: artifacts become the visual focus while chronology remains normal document scrolling. */
export function StoryTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = [...root.querySelectorAll<HTMLElement>("[data-era]")];
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting && !seen.has(entry.target)) {
        seen.add(entry.target);
        emitConversion("story_interaction", { era: (entry.target as HTMLElement).dataset.era, action: "era_view" });
      }
    }), { threshold: 0.5 });
    nodes.forEach((node) => observer.observe(node));
    const desktop = matchMedia("(min-width: 981px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduced.matches) return () => observer.disconnect();
    let frame = 0;
    const update = () => {
      frame = 0;
      const center = innerHeight / 2;
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const p = Math.max(-1, Math.min(1, (center - (rect.top + rect.height / 2)) / innerHeight));
        node.style.setProperty("--era-shift", `${(p * -18).toFixed(1)}px`);
        node.style.setProperty("--era-depth", `${((1 - Math.abs(p)) * 42).toFixed(1)}px`);
        node.style.setProperty("--era-tilt", `${(index % 2 ? 1 : -1) * (4 + Math.abs(p) * 3)}deg`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); addEventListener("scroll", schedule, { passive: true });
    return () => { observer.disconnect(); removeEventListener("scroll", schedule); if (frame) cancelAnimationFrame(frame); };
  }, []);
  return <div className="story-timeline" ref={rootRef}>{eras.map((era, index) => <article className="story-era" data-era={`era-${index + 1}`} key={era.title}><EraCopy era={era} index={index} showFinalCta={index === eras.length - 1} /><EraVisual era={era} /></article>)}</div>;
}
