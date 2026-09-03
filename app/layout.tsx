import type { Metadata } from "next";
import "./globals.css";
import { restaurant, siteUrl } from "@/lib/site-data";

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurant.name,
  url: siteUrl,
  telephone: restaurant.phoneHref.replace("tel:", ""),
  servesCuisine: ["Hamburgers", "Gyros", "Mediterranean"],
  hasMenu: `${siteUrl}/menu`,
  image: `${siteUrl}/photos/menu-meals.webp`,
  sameAs: [restaurant.facebookHref],
  address: {
    "@type": "PostalAddress",
    streetAddress: restaurant.address,
    addressLocality: restaurant.city,
    addressRegion: restaurant.region,
    postalCode: restaurant.postalCode,
    addressCountry: "US",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jumbo's Hamburgers | Burgers & Gyros in Tulsa",
  description: "Explore Jumbo's Hamburgers menu, see real in-store favorites, get directions to 6558 E 41st St, or call ahead in Tulsa.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jumbo's Hamburgers",
    title: "Jumbo's Hamburgers | Big Flavor in Tulsa",
    description: "Burgers, gyros, crispy sides and a Tulsa neighborhood welcome.",
    url: siteUrl,
    images: [{ url: "/photos/menu-meals.webp", width: 1390, height: 867, alt: "Jumbo's current burger and gyro meals menu board" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jumbo's Hamburgers | Big Flavor in Tulsa",
    description: "Burgers, gyros, crispy sides and a Tulsa neighborhood welcome.",
    images: ["/photos/menu-meals.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="icon" href="/favicon.svg" /><link rel="shortcut icon" href="/favicon.svg" /></head><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema).replace(/</g, "\\u003c") }} /></body></html>;
}
