import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };

async function fetchRoute(path) {
  return worker.fetch(new Request(`https://example.com${path}`, { headers: { accept: "text/html" } }), env, ctx);
}

test("renders every public route and the branded 404", async () => {
  for (const [path, marker] of [["/", "Big flavor"], ["/menu", "Our menu"], ["/our-story", "Our story"], ["/contact", "Contact us"], ["/gallery", "Gallery"]]) {
    const response = await fetchRoute(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), new RegExp(marker, "i"), path);
  }
  const missing = await fetchRoute("/missing-page");
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /Page not found/i);
});

test("renders launch SEO, accessibility, and conversion markers", async () => {
  const response = await fetchRoute("/");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /schema\.org/);
  assert.match(html, /data-conversion="view_menu"/);
  assert.match(html, /data-conversion="click_directions"/);
  assert.match(html, /data-conversion="click_phone"/);
  assert.match(html, /Call ahead/);
  assert.match(html, /Skip to content/);
  assert.match(html, /aria-controls="mobile-nav"/);
  assert.match(html, /aria-pressed="true"/);
  assert.doesNotMatch(html, /data-conversion="click_order"/);
});

test("exposes indexable menu and location facts", async () => {
  const menu = await (await fetchRoute("/menu")).text();
  const contact = await (await fetchRoute("/contact")).text();
  assert.match(menu, /Gyro \+ fries/);
  assert.match(menu, /September 2025/);
  assert.match(contact, /6558 E 41st St/);
  assert.match(contact, /\(918\) 663-0944/);
  assert.match(contact, /Hours vary by public source/);
});

test("declares progressive-enhancement and analytics contracts", async () => {
  const source = await import("node:fs/promises");
  const css = await source.readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const data = await source.readFile(new URL("../lib/site-data.ts", import.meta.url), "utf8");
  const story = await source.readFile(new URL("../components/story-timeline.tsx", import.meta.url), "utf8");
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /update:\s*slow/);
  for (const event of ["view_menu", "click_directions", "click_phone", "click_order", "featured_meal_interaction", "menu_category_view", "story_interaction"]) assert.match(data, new RegExp(event));
  assert.match(story, /requestAnimationFrame/);
  assert.match(story, /prefers-reduced-motion/);
  assert.match(story, /IntersectionObserver/);
  assert.match(story, /heritage-inspired/i);
  assert.doesNotMatch(story, /found(?:ed|ing)\s+(?:in\s+)?\d{4}/i);
});

test("exposes an uncached monitoring endpoint", async () => {
  const response = await worker.fetch(new Request("https://example.com/api/health"), env, ctx);
  const payload = await response.json();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(payload.status, "ok");
  assert.equal(payload.service, "jumbos-hamburgers-tulsa");
});
