import type { Metadata } from "next";
import { BrushUnderline } from "@/components/brush-stroke";
import { ConversionLink } from "@/components/conversion-link";
import { SiteShell } from "@/components/site-shell";
import { menuSections, restaurant } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Menu | Jumbo's Hamburgers Tulsa",
  description: "Browse current Jumbo's Hamburgers menu highlights for burgers, gyros, salads, subs, sides and sweets in Tulsa.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return <SiteShell>
    <header className="page-hero menu-page-hero board-texture"><div><p className="kicker">Big flavor · Tulsa portions</p><BrushUnderline /><h1>Our menu</h1><p>Current highlights transcribed from in-store menu-board photographs dated September 2025. Call Jumbo&apos;s to confirm availability and pricing.</p></div></header>
    <section className="content-section board-texture">
      <div className="menu-board">
        <nav className="menu-board-tabs" aria-label="Menu categories">{menuSections.map(section => <ConversionLink key={section.slug} href={`#${section.slug}`} event="menu_category_view" detail={{ category: section.slug }}>{section.name}</ConversionLink>)}</nav>
        <div className="menu-groups">{menuSections.map(section => <section className="menu-group" id={section.slug} key={section.slug}><h2 className="menu-group-title">{section.name}</h2><ul>{section.items.map(([item, price]) => <li key={item}><span>{item}</span><span>{price}</span></li>)}</ul><p className="menu-source">{section.note}. Prices may change; call to confirm.</p></section>)}</div>
      </div>
      <div className="action-row menu-final-actions"><ConversionLink className="paint-button yellow" href={restaurant.phoneHref} event="click_phone">Call {restaurant.phoneDisplay}</ConversionLink><ConversionLink className="text-action light" href={restaurant.directionsHref} target="_blank" rel="noreferrer" event="click_directions">Get directions</ConversionLink></div>
    </section>
  </SiteShell>;
}
