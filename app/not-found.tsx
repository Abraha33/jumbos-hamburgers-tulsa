import { ConversionLink } from "@/components/conversion-link";
import { Mascot } from "@/components/mascot";
import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return <SiteShell><section className="not-found board-texture"><div><strong>404</strong><h1>Page not found</h1><p>Looks like you took a wrong turn. Let&apos;s get you back on track.</p><Mascot pose="wave" size={140} animate="wave-in" alt="Jumbo's mascot waving" /><ConversionLink className="paint-button yellow" href="/menu" event="view_menu">Back to the menu</ConversionLink></div></section></SiteShell>;
}
