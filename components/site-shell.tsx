"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- vinext's Link shim causes a duplicate React renderer in this client shell. */

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Clock3, MapPin, Menu, Phone, X } from "lucide-react";
import { ConversionLink } from "@/components/conversion-link";
import { JumbosLogo } from "@/components/jumbos-logo";
import { restaurant } from "@/lib/site-data";

const nav = [["Home", "/"], ["Menu", "/menu"], ["Our Story", "/our-story"], ["Gallery", "/gallery"], ["Visit", "/contact"]];
const subscribePath = () => () => {};
const getPath = () => window.location.pathname;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useSyncExternalStore(subscribePath, getPath, () => "");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const onPointerDown = (event: PointerEvent) => { if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" ref={headerRef}>
        <a className="wordmark" href="/" aria-label="Jumbo's Hamburgers home"><JumbosLogo priority /></a>
        <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, href]) => <a href={href} key={href} className={pathname === href ? "is-current" : ""} aria-current={pathname === href ? "page" : undefined}>{label}</a>)}</nav>
        <ConversionLink className="header-action" href="/menu" event="view_menu">View menu</ConversionLink>
        <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <nav id="mobile-nav" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation">{nav.map(([label, href]) => <a href={href} key={href} className={pathname === href ? "is-current" : ""} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</a>)}</nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <a className="footer-logo" href="/" aria-label="Jumbo's Hamburgers home"><JumbosLogo /></a>
        <div><strong>Hamburgers · Gyros · Tulsa</strong><p>{restaurant.address}, {restaurant.city}, {restaurant.region} {restaurant.postalCode}</p><p>{restaurant.phoneDisplay}</p></div>
        <nav aria-label="Footer navigation">{nav.slice(1).map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      </footer>
      <div className="mobile-action-bar" aria-label="Quick actions">
        <ConversionLink href="/menu" event="view_menu">Menu</ConversionLink>
        <ConversionLink href={restaurant.directionsHref} event="click_directions" target="_blank" rel="noreferrer"><MapPin /> Directions</ConversionLink>
        <ConversionLink href={restaurant.phoneHref} event="click_phone"><Phone /> Call</ConversionLink>
        <ConversionLink href={restaurant.phoneHref} event="click_phone" detail={{ source: "mobile_bar_hours" }} data-source="mobile_bar_hours"><Clock3 /> Hours</ConversionLink>
      </div>
    </div>
  );
}
