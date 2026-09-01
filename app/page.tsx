"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Clock3, MapPin, Menu, Phone, Quote, Star, Utensils, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Jumbo%27s%20Hamburgers%2C%206558%20E%2041st%20St%2C%20Tulsa%2C%20OK%2074145";
const phoneUrl = "tel:+19186630944";

const menuGroups = [
  { kicker: "The classics", title: "Burgers", items: ["Old-fashioned cheeseburger", "Gyro cheeseburger", "Burger & fries", "Burger combo"], tone: "dark" },
  { kicker: "A local surprise", title: "Gyros & more", items: ["Gyro platter", "Falafel wrap", "Hummus & pita", "Gyro salad"], tone: "red" },
  { kicker: "Bring an appetite", title: "Sides", items: ["Chili cheese fries", "Onion rings", "Chili cheese nachos", "Baklava"], tone: "cream" },
];

const reviews = [
  { quote: "Excellent food, super amazing service. The line is out the door.", name: "Susan Sneed", detail: "Local Guide" },
  { quote: "A hidden gem in Tulsa with that old-fashioned, no-frills feel.", name: "Dmitri N. Apostolides", detail: "Local Guide" },
  { quote: "The staff were so friendly and kind — and the food was delicious.", name: "Stephanie Young", detail: "Local Guide" },
];

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const trackConversion = (action: "order_by_phone" | "get_directions") => {
    const trackedWindow = window as Window & { dataLayer?: Array<Record<string, unknown>> };
    trackedWindow.dataLayer ??= [];
    trackedWindow.dataLayer.push({ event: "restaurant_conversion", conversion_action: action });
    window.dispatchEvent(new CustomEvent("jumbos:conversion", { detail: { action } }));
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let animationFrame = 0;
    const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopLayout = window.matchMedia("(min-width: 641px)");
    const updateScroll = () => {
      if (!motionAllowed || !desktopLayout.matches) return;
      const y = window.scrollY;
      root.style.setProperty("--scroll-y", `${y}px`);
      root.style.setProperty("--scroll-progress", `${Math.min(y / 1200, 1)}`);
    };
    const scheduleScrollUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        updateScroll();
        animationFrame = 0;
      });
    };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
    }, { threshold: 0.14 });
    root.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));
    updateScroll();
    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", scheduleScrollUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <main ref={rootRef} className="site-shell">
      <a className="skip-link" href="#menu">Skip to menu</a>
      <header className={`site-header${menuOpen ? " menu-open" : ""}`}>
        <a className="wordmark" href="#top" aria-label="Jumbo's Hamburgers home"><span>Jumbo&apos;s</span><small>Hamburgers · Tulsa</small></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#menu">Menu</a><a href="#reviews">Reviews</a><a href="#visit">Visit</a></nav>
        <Button asChild className="header-cta"><a href={phoneUrl} data-conversion="order_by_phone" onClick={() => trackConversion("order_by_phone")}><Phone aria-hidden="true" /> Order by phone</a></Button>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation"><Menu className="open-icon" /><X className="close-icon" /></button>
        <nav id="mobile-navigation" className={`mobile-menu${menuOpen ? " is-open" : ""}`} aria-label="Mobile navigation"><a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a><a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a><a href="#visit" onClick={() => setMenuOpen(false)}>Visit</a><a href={phoneUrl} data-conversion="order_by_phone" onClick={() => trackConversion("order_by_phone")}>Order by phone · +1 918-663-0944</a></nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Star fill="currentColor" /> Tulsa&apos;s neighborhood favorite</div>
          <h1>Big flavor.<br /><em>No fuss.</em></h1>
          <p className="hero-intro">Old-fashioned burgers, loaded gyros and the kind of welcome that keeps Tulsa coming back.</p>
          <div className="hero-actions">
            <Button asChild size="lg" className="primary-cta"><a href={phoneUrl} data-conversion="order_by_phone" onClick={() => trackConversion("order_by_phone")}><Phone aria-hidden="true" /> Order by phone</a></Button>
            <Button asChild size="lg" variant="outline" className="outline-cta"><a href={directionsUrl} target="_blank" rel="noreferrer" data-conversion="get_directions" onClick={() => trackConversion("get_directions")}>Get directions <ArrowUpRight aria-hidden="true" /></a></Button>
          </div>
          <div className="quick-facts" aria-label="Restaurant details"><span><Star fill="currentColor" /> <strong>4.8</strong> · 1,052 reviews</span><span>•</span><span>$10–20 per person</span></div>
        </div>
        <div className="hero-scene" aria-label="Cheeseburger and fries">
          <div className="scene-shadow" /><div className="photo-card photo-card-back" /><div className="photo-card photo-card-mid" />
          <figure className="photo-card photo-card-main"><Image src="/burger-hero.webp" alt="Old-fashioned cheeseburger with golden fries" fill priority unoptimized sizes="(max-width: 980px) 90vw, 52vw" /><figcaption>Fresh off the grill</figcaption></figure>
          <div className="rating-ticket"><span>Rated</span><strong>4.8</strong><div>{[1,2,3,4,5].map((n) => <Star key={n} fill="currentColor" />)}</div></div>
        </div>
        <a className="scroll-cue" href="#menu">Scroll for the good stuff <ArrowDown aria-hidden="true" /></a>
      </section>

      <section className="marquee" aria-label="Restaurant highlights"><div className="marquee-track">{["BURGERS", "GYROS", "FRIES", "FALAFEL", "BAKLAVA", "BURGERS", "GYROS", "FRIES", "FALAFEL", "BAKLAVA"].map((item, i) => <span key={`${item}-${i}`}>{item}<b>✦</b></span>)}</div></section>

      <section id="menu" className="menu-section" aria-labelledby="menu-heading">
        <div className="section-heading" data-reveal><p className="section-kicker">Menu highlights</p><h2 id="menu-heading">Your next order<br />starts here.</h2><p>From classic cheeseburgers to gyros and falafel, there&apos;s a reason the line keeps forming.</p></div>
        <div className="menu-stage">
          <figure className="menu-photo gyro-photo" data-reveal><Image src="/gyro-banner.webp" alt="Gyro wrap with hummus, pita and falafel" fill unoptimized sizes="(max-width: 640px) 100vw, 72vw" /><figcaption>More than burgers</figcaption></figure>
          <div className="menu-cards">{menuGroups.map((group, index) => (
            <article className={`menu-card tone-${group.tone}`} key={group.title} data-reveal style={{"--card-index": index} as React.CSSProperties}>
              <div><span>{group.kicker}</span><h3>{group.title}</h3></div><ul>{group.items.map((item) => <li key={item}>{item}<ArrowUpRight aria-hidden="true" /></li>)}</ul>
            </article>
          ))}</div>
        </div>
        <p className="menu-note" data-reveal>Looking for something specific? <a href={phoneUrl} data-conversion="order_by_phone" onClick={() => trackConversion("order_by_phone")}>Call us and ask.</a></p>
      </section>

      <section className="split-story">
        <div className="story-copy" data-reveal><p className="section-kicker">Small place. Big following.</p><h2>The kind of spot you tell a friend about.</h2><p>Jumbo&apos;s is loved for generous food, friendly service and a no-frills atmosphere that feels refreshingly real.</p><div className="story-stats"><div><strong>1,052</strong><span>Google reviews</span></div><div><strong>4.8</strong><span>Average rating</span></div><div><strong>3 ways</strong><span>Dine in · takeout · delivery</span></div></div></div>
        <figure className="spread-photo" data-reveal><Image src="/favorites-banner.webp" alt="Burger combo, onion rings and loaded fries" fill unoptimized sizes="(max-width: 980px) 100vw, 50vw" /><figcaption><span>Come hungry</span><strong>Leave happy.</strong></figcaption></figure>
      </section>

      <section id="reviews" className="reviews-section">
        <div className="reviews-heading" data-reveal><p className="section-kicker">Straight from the regulars</p><h2>People really love this place.</h2><a href="https://www.google.com/maps/place/Jumbo's+Hamburgers/" target="_blank" rel="noreferrer">Read more reviews <ArrowUpRight aria-hidden="true" /></a></div>
        <div className="review-grid">{reviews.map((review, index) => <article className="review-card" data-reveal key={review.name} style={{"--review-index": index} as React.CSSProperties}><Quote aria-hidden="true" /><p>“{review.quote}”</p><footer><div className="review-stars">★★★★★</div><strong>{review.name}</strong><span>{review.detail}</span></footer></article>)}</div>
      </section>

      <section id="visit" className="visit-section">
        <div className="visit-panel" data-reveal>
          <div className="visit-copy"><p className="section-kicker">Find your way to Jumbo&apos;s</p><h2>Hungry yet?</h2><p>6558 E 41st St<br />Tulsa, OK 74145</p><div className="visit-facts"><span><Clock3 aria-hidden="true" /> Call for today&apos;s hours</span><span><Utensils aria-hidden="true" /> Dine-in · takeout · delivery</span></div><div className="visit-actions"><Button asChild size="lg" className="light-cta"><a href={directionsUrl} target="_blank" rel="noreferrer" data-conversion="get_directions" onClick={() => trackConversion("get_directions")}><MapPin /> Get directions</a></Button><a className="phone-link" href={phoneUrl} data-conversion="order_by_phone" onClick={() => trackConversion("order_by_phone")}>+1 918-663-0944 <ArrowUpRight /></a></div></div>
          <div className="map-art" aria-hidden="true"><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" /><div className="map-pin"><MapPin fill="currentColor" /></div><span className="map-label">Jumbo&apos;s</span></div>
        </div>
      </section>

      <footer className="site-footer"><div className="footer-wordmark">Jumbo&apos;s</div><div className="footer-details"><p>Hamburgers · Gyros · Tulsa</p><p>6558 E 41st St · +1 918-663-0944</p></div><a href="#top">Back to top <ArrowUpRight /></a></footer>
      <div className="mobile-conversion-bar" aria-label="Quick actions"><a href={phoneUrl} data-conversion="order_by_phone" onClick={() => trackConversion("order_by_phone")}><Phone aria-hidden="true" /> Order by phone</a><a href={directionsUrl} target="_blank" rel="noreferrer" data-conversion="get_directions" onClick={() => trackConversion("get_directions")}><MapPin aria-hidden="true" /> Directions</a></div>
    </main>
  );
}
