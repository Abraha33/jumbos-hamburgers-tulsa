# 3D Restaurant Website Production System

## Purpose
Build restaurant websites that convert hungry local visitors into menu views, calls, directions, orders, and visits while using 3D only where it improves appetite, attention, or story.

## Production rule
The website must remain useful, fast, readable, and conversion-capable when all non-essential animation is disabled.

## Pipeline

1. **Restaurant intelligence**
   - Confirm business name, address, phone, hours, order links, menu, prices, social links, history, signature items, differentiators, and local context.
   - Treat Google Maps as research/verification, not as an unrestricted asset library.
   - Separate verified facts from assumptions and uncertain public-source claims.

2. **Conversion brief**
   - Define primary action: Order, Call, Directions, or Menu.
   - Define secondary action.
   - Identify the 3–6 products most likely to create appetite quickly.
   - Map ATTENTION → APPETITE → INFORMATION → TRUST → ACTION.

3. **Asset system**
   - Classify every asset as `restaurant-owned`, `licensed`, `ai-concept`, or `generated-3d`.
   - Maintain source/provenance, intended route, crop, aspect ratio, and approval status.
   - Never present AI concept imagery as documentary photography of the real restaurant.

4. **Static design first**
   - Complete high-fidelity desktop and mobile compositions before adding 3D.
   - Validate hierarchy, typography, food crops, CTA visibility, and menu readability.

5. **3D storyboard**
   - Every effect needs an attention purpose and a conversion/story purpose.
   - Default order of implementation: CSS depth → 2.5D layers → real WebGL.
   - Prefer 1–2 signature WebGL moments over an all-WebGL site.

6. **Implementation**
   - Shared semantic components and centralized restaurant data.
   - Progressive enhancement for motion and WebGL.
   - Explicit reduced-motion and low-capability fallbacks.

7. **Responsive QA**
   - Verify at 360, 390, 430, 768, 1280, and 1440 widths.
   - No clipped text, horizontal overflow, overlapping CTAs, unusable sticky UI, or hidden content.

8. **Performance and accessibility**
   - LCP target ≤ 2.5 s.
   - INP target ≤ 200 ms.
   - CLS target ≤ 0.1.
   - Keyboard navigation, visible focus, semantic headings, alternative text, sufficient contrast, and `prefers-reduced-motion` behavior are mandatory.

9. **SEO and measurement**
   - Restaurant/LocalBusiness structured data.
   - Metadata, canonical URL, sitemap, robots, Open Graph.
   - Track menu views, order clicks, phone clicks, and directions clicks.

10. **Release gate**
   - No merge to the stable branch until visual, responsive, interaction, accessibility, performance, content-truth, and technical checks pass.

## 3D budget
Use approximately:
- 70% conventional semantic web UI
- 20% CSS/2.5D motion and depth
- 10% real WebGL

This ratio is a guideline, not a quota. Reduce 3D whenever it makes the site slower, less legible, or harder to use.
