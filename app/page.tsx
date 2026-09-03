"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { ConversionLink, emitConversion } from "@/components/conversion-link";
import { CheckerDivider } from "@/components/checker-divider";
import { SiteShell } from "@/components/site-shell";
import { menuSections, restaurant } from "@/lib/site-data";

function menuItem(slug: string, itemName: string) {
  const item = menuSections.find((section) => section.slug === slug)?.items.find(([name]) => name === itemName);
  if (!item) throw new Error(`Featured meal "${itemName}" was not found`);
  return { name: item[0], price: item[1] };
}

const featured = [
  { id: "burger", ...menuItem("meals", "Hamburger meal"), description: "Burger, crispy fries and a cold drink.", image: "/brand/food-featured.png", position: "center 58%" },
  { id: "gyro", ...menuItem("meals", "Gyro + fries"), description: "A Jumbo's gyro with a hot side of fries.", image: "/photos/menu-meals.webp", position: "28% 58%" },
  { id: "mushrooms", ...menuItem("sides", "Fried mushrooms"), description: "Golden mushrooms, fried crisp.", image: "/photos/fried-mushrooms.jpg", position: "center" },
] as const;

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<(typeof featured)[number]>(featured[0]);

  const moveHero = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    heroRef.current?.style.setProperty("--pointer-x", (((event.clientX - bounds.left) / bounds.width - 0.5) * 2).toFixed(3));
    heroRef.current?.style.setProperty("--pointer-y", (((event.clientY - bounds.top) / bounds.height - 0.5) * 2).toFixed(3));
  };

  return (
    <SiteShell>
      <section className="home-hero board-texture" onPointerMove={moveHero} onPointerLeave={() => { heroRef.current?.style.setProperty("--pointer-x", "0"); heroRef.current?.style.setProperty("--pointer-y", "0"); }}>
        <div className="hero-copy">
          <p className="kicker">Tulsa&apos;s original neighborhood flavor</p>
          <h1>Big flavor.<br /><span>Made to order.</span></h1>
          <span className="red-swipe" aria-hidden="true" />
          <p className="hero-lede">Burgers, gyros, crispy sides and the no-fuss welcome Tulsa keeps coming back for.</p>
          <div className="action-row">
            <ConversionLink className="paint-button yellow" href="/menu" event="view_menu">View menu <ArrowRight /></ConversionLink>
            <ConversionLink className="outline-button" href={restaurant.directionsHref} target="_blank" rel="noreferrer" event="click_directions"><MapPin /> Get directions</ConversionLink>
          </div>
        </div>
        <div className="hero-depth" ref={heroRef} aria-label="Jumbo's branded burger, fries and drink composition">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-tray" aria-hidden="true" />
          <div className="hero-checker" aria-hidden="true" />
          <figure className="hero-food-card"><Image unoptimized src="/brand/food-hero.png" fill priority sizes="(max-width: 760px) 100vw, 66vw" alt="Jumbo's branded burger, fries and drink composition" /></figure>
          <span className="hero-stamp">Jumbo&apos;s.<br />Made to order.</span>
        </div>
      </section>

      <section className="conversion-strip" aria-label="Quick restaurant actions">
        <ConversionLink href="/menu" event="view_menu"><strong>Menu</strong><span>See current favorites</span></ConversionLink>
        <ConversionLink href={restaurant.directionsHref} target="_blank" rel="noreferrer" event="click_directions"><strong>Directions</strong><span>{restaurant.address}</span></ConversionLink>
        <ConversionLink href={restaurant.phoneHref} event="click_phone"><strong>Call ahead</strong><span>{restaurant.phoneDisplay}</span></ConversionLink>
      </section>

      <section className="featured-section board-texture" aria-labelledby="featured-title">
        <div className="section-heading-row">
          <div><p className="paint-label">Featured meals</p><h2 id="featured-title">Pick your craving.</h2></div>
          <p>Select a favorite, then head to the full menu or get directions to Jumbo&apos;s.</p>
        </div>
        <div className="featured-layout">
          <div className="featured-copy">
            <p className="kicker">Jumbo&apos;s pick</p>
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
            <strong className="price">{selected.price}</strong>
            <div className="action-row">
              <ConversionLink className="paint-button yellow" href="/menu" event="view_menu" detail={{ source: "featured_meals", meal: selected.id }}>View menu <ArrowRight /></ConversionLink>
              <ConversionLink className="text-action light" href={restaurant.directionsHref} target="_blank" rel="noreferrer" event="click_directions" detail={{ source: "featured_meals" }}><MapPin /> Directions</ConversionLink>
            </div>
          </div>
          <div className="featured-stage">
            <div className="meal-tray" aria-hidden="true" />
            <div className="meal-paper" aria-hidden="true" />
            <figure className="meal-photo"><Image unoptimized src={selected.image} fill sizes="(max-width: 760px) 92vw, 52vw" alt={`${selected.name} featured at Jumbo's`} style={{ objectPosition: selected.position }} /></figure>
            <span className="meal-badge">Local favorite</span>
          </div>
        </div>
        <div className="meal-tabs" role="list" aria-label="Featured meals">
          {featured.map((meal) => <button key={meal.id} aria-pressed={selected.id === meal.id} className={selected.id === meal.id ? "is-active" : ""} onClick={() => { setSelected(meal); emitConversion("featured_meal_interaction", { meal: meal.id }); }}><span>{meal.name}</span><strong>{meal.price}</strong></button>)}
        </div>
      </section>

      <section className="menu-preview paper-section" aria-labelledby="menu-preview-title">
        <div className="section-heading-row dark">
          <div><p className="paint-label">Menu preview</p><h2 id="menu-preview-title">The board, made easy.</h2></div>
          <ConversionLink className="outline-button dark" href="/menu" event="view_menu" detail={{ source: "menu_preview" }}>See full menu <ArrowRight /></ConversionLink>
        </div>
        <div className="category-grid">
          {menuSections.slice(0, 6).map((section, index) => <a href={`/menu#${section.slug}`} key={section.slug} onClick={() => emitConversion("menu_category_view", { category: section.slug })} className="category-card"><span>0{index + 1}</span><h3>{section.name}</h3><p>{section.items.slice(0, 3).map(item => item[0]).join(" · ")}</p><strong>Explore <ArrowRight /></strong></a>)}
        </div>
      </section>

      <section className="home-story-visit board-texture">
        <article className="story-teaser">
          <div className="story-teaser-copy"><p className="paint-label">Our story</p><h2>Made in Tulsa.<br />Loved for generations.</h2><p>See the storefront, heritage letter board and today&apos;s bright menu panels.</p><a className="outline-button" href="/our-story" onClick={() => emitConversion("story_interaction", { source: "home_teaser" })}>Learn our story <ArrowRight /></a></div>
          <figure className="story-photo"><Image unoptimized loading="eager" src="/photos/storefront.jpg" fill sizes="(max-width: 760px) 92vw, 28vw" alt="Jumbo's Hamburgers storefront in Tulsa" /></figure>
        </article>
        <article className="visit-home">
          <div><p className="paint-label">Visit Jumbo&apos;s</p><h2>Come hungry.</h2><p><strong>{restaurant.address}</strong><br />{restaurant.city}, {restaurant.region} {restaurant.postalCode}</p><p className="truth-note">{restaurant.hoursNote}</p><div className="action-row"><ConversionLink className="paint-button yellow" href={restaurant.directionsHref} target="_blank" rel="noreferrer" event="click_directions">Get directions <MapPin /></ConversionLink><ConversionLink className="text-action light" href={restaurant.phoneHref} event="click_phone"><Phone /> Call</ConversionLink></div></div>
          <figure className="visit-photo"><Image unoptimized loading="eager" src="/photos/restaurant-front.jpg" fill sizes="(max-width: 760px) 92vw, 32vw" alt="Front entrance of Jumbo's Hamburgers in Tulsa" /></figure>
        </article>
      </section>
      <CheckerDivider />
    </SiteShell>
  );
}
