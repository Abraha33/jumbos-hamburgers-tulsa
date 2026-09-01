import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://jumbos-hamburgers-tulsa.contact479101.chatgpt.site";

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Jumbo's Hamburgers",
  url: siteUrl,
  telephone: "+1-918-663-0944",
  priceRange: "$10–20",
  servesCuisine: ["Hamburgers", "Gyros", "Mediterranean"],
  hasMenu: `${siteUrl}/#menu`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "6558 E 41st St",
    addressLocality: "Tulsa",
    addressRegion: "OK",
    postalCode: "74145",
    addressCountry: "US",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jumbo's Hamburgers | Burgers & Gyros in Tulsa",
  description: "Old-fashioned burgers, gyros, fries and friendly service at Jumbo's Hamburgers, 6558 E 41st St in Tulsa. Call for takeout or get directions.",
  alternates: { canonical: "/" },
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </body>
    </html>
  );
}
