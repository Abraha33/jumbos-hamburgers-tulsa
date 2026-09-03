import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Clock3 } from "lucide-react";
import { BrushUnderline } from "@/components/brush-stroke";
import { ConversionLink } from "@/components/conversion-link";
import { SiteShell } from "@/components/site-shell";
import { restaurant } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Visit Jumbo's Hamburgers | Tulsa Location & Phone",
  description: "Find Jumbo's Hamburgers at 6558 E 41st St in Tulsa, get directions, or call (918) 663-0944 before visiting.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <SiteShell>
    <header className="page-hero contact-page-hero board-texture"><div><p className="kicker">We&apos;d love to see you</p><BrushUnderline /><h1>Contact us</h1><p>Get directions to East 41st Street or call ahead to confirm today&apos;s hours and menu availability.</p></div></header>
    <section className="content-section paper-section"><div className="contact-layout"><div className="contact-card"><p className="kicker">Visit us</p><h2>Jumbo&apos;s Hamburgers</h2><div className="contact-list"><div><MapPin /><p><strong>{restaurant.address}</strong><br />{restaurant.city}, {restaurant.region} {restaurant.postalCode}</p></div><div><Phone /><p><strong>{restaurant.phoneDisplay}</strong><br />Tap to call ahead</p></div><div><Clock3 /><p><strong>Confirm today&apos;s hours</strong><br />{restaurant.hoursNote}</p></div></div><div className="action-row"><ConversionLink className="paint-button red" href={restaurant.directionsHref} target="_blank" rel="noreferrer" event="click_directions">Get directions</ConversionLink><ConversionLink className="text-action" href={restaurant.phoneHref} event="click_phone">Call now</ConversionLink></div></div><figure className="location-art"><Image unoptimized src="/photos/restaurant-front.jpg" fill sizes="(max-width: 760px) 92vw, 52vw" alt="Front entrance of Jumbo's Hamburgers at 6558 E 41st St in Tulsa" /></figure></div></section>
  </SiteShell>;
}
