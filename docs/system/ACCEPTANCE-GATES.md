# Production Acceptance Gates

A restaurant site is not release-ready until every applicable gate is PASS or a documented external blocker exists.

## Gate 1 — Content truth
- Business name, phone, address, order URL, social links, and hours are verified or clearly qualified.
- Menu items/prices are tied to a dated source.
- No invented history, awards, ingredients, or restaurant features are stated as fact.
- AI-generated imagery is not presented as documentary photography of the business.
- Asset provenance is recorded.

## Gate 2 — Conversion
- Primary CTA is visible in the first useful viewport on desktop and mobile.
- Menu, phone, directions, and order actions work where applicable.
- Sticky mobile actions do not cover content or browser controls.
- Featured food leads naturally to a menu/order/directions action.
- Conversion events have stable names and useful source details.

## Gate 3 — Visual fidelity
- Intentional hierarchy at 360, 390, 430, 768, 1280, and 1440 widths.
- No clipped labels, broken intrinsic sizing, awkward orphaned headings, stretched food photography, or accidental empty regions.
- Food crops stay appetizing at every breakpoint.
- Brand treatment is consistent across routes.

## Gate 4 — 3D and motion
- Every scene has a documented attention and conversion/story purpose.
- Reduced-motion mode preserves all information and actions.
- Touch devices are not dependent on hover/pointer parallax.
- WebGL/model failure has a static fallback.
- Scroll effects do not trap the user or create excessive blank scroll distance.
- No decorative effect justifies a major usability/performance regression.

## Gate 5 — Accessibility
- Keyboard path reaches all interactive elements.
- Focus state is visible.
- Heading hierarchy is logical.
- Images have useful alt text or are explicitly decorative.
- Controls have accessible names and appropriate semantics.
- Text/controls meet practical contrast requirements.
- Motion respects `prefers-reduced-motion`.

## Gate 6 — Performance
- Target LCP ≤ 2.5 s at the 75th percentile.
- Target INP ≤ 200 ms at the 75th percentile.
- Target CLS ≤ 0.1 at the 75th percentile.
- Hero asset is intentionally prioritized and correctly sized.
- Below-the-fold media is lazy-loaded where appropriate.
- Images use efficient formats/crops.
- 3D models/textures are compressed and loaded only when justified.
- No permanent WebGL render loop when demand rendering is sufficient.

## Gate 7 — Technical
- TypeScript passes.
- Lint passes.
- Production build passes.
- Automated tests pass.
- No unintended console errors on core routes.
- Internal links and anchors resolve.
- 404 route behaves intentionally.

## Gate 8 — SEO/local discovery
- Unique route titles/descriptions.
- Canonical URL.
- Open Graph metadata.
- Sitemap/robots.
- Restaurant/LocalBusiness structured data matches visible, verified content.
- Address, phone, cuisine, menu link, and opening-hour data are not contradictory.

## Gate 9 — Release
- Stable branch is unchanged during experimentation.
- Final diff reviewed for accidental deletions or generated junk.
- Deployment target builds the reviewed commit.
- Critical conversion links tested after deployment.
- Release commit/PR is recorded as the rollback point.
