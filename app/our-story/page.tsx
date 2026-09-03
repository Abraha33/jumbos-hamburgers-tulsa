import type { Metadata } from "next";
import { BrushUnderline } from "@/components/brush-stroke";
import { SiteShell } from "@/components/site-shell";
import { StoryTimeline } from "@/components/story-timeline";

export const metadata: Metadata = {
  title: "Our Story | Jumbo's Hamburgers Tulsa",
  description: "See Jumbo's Hamburgers through its storefront, heritage-inspired menu identity and verified present-day Tulsa menu boards.",
  alternates: { canonical: "/our-story" },
};

export default function StoryPage() {
  return <SiteShell>
    <header className="page-hero story-page-hero board-texture"><div><p className="kicker">Made in Tulsa</p><BrushUnderline /><h1>Our story</h1><p>A visual journey from the neighborhood storefront through the heritage menu-board language to Jumbo&apos;s today. No undocumented dates are claimed.</p></div></header>
    <section className="content-section board-texture"><StoryTimeline /></section>
  </SiteShell>;
}
