# 3D Storyboard Template

Use one table per route. Do not implement motion until the static composition is approved.

## Effect contract

| Field | Required decision |
|---|---|
| Scene ID | Stable name such as `home-hero-burger` |
| User purpose | What the visitor should notice or understand |
| Conversion/story purpose | Why the effect helps Menu / Order / Call / Directions / trust |
| Trigger | load, pointer, hover, tap, scroll range, section entry |
| Technique | CSS 3D, 2.5D DOM layers, canvas/WebGL |
| Inputs | Approved assets/models/textures |
| Start state | Exact visual state before motion |
| End state | Exact final composition |
| Mobile behavior | Reduced or alternate choreography |
| Reduced-motion behavior | Static or simplified final state |
| Failure fallback | What appears if JS/WebGL/model loading fails |
| Performance budget | Texture/model/JS budget and loading strategy |
| Analytics | Optional interaction event if useful |

## Recommended home sequence

### Scene 01 — Appetite Hero
- **Purpose:** Make the signature food immediately desirable.
- **Technique:** Prefer layered 2.5D composition first. Escalate to WebGL only if real depth materially improves the result.
- **Motion:** Slow camera/depth response; no uncontrolled spinning.
- **CTA:** `View Menu` remains in semantic DOM and visible without the effect.
- **Fallback:** Premium static food composition.

### Scene 02 — Ingredient / Meal Reveal
- **Purpose:** Explain the product while increasing appetite.
- **Technique:** CSS/2.5D or lightweight WebGL exploded stack.
- **Scroll behavior:** One controlled scrub range; content must not be trapped behind long pinning.
- **Fallback:** Complete assembled product plus short ingredient/product copy.

### Scene 03 — Restaurant Atmosphere
- **Purpose:** Build trust and location familiarity.
- **Technique:** 2.5D exterior/interior image layers.
- **Constraint:** Documentary assets stay visually truthful; do not generate fake architectural details and present them as real.

### Scene 04 — Final Conversion Composition
- **Purpose:** End the experience with an action, not decoration.
- **Technique:** Reuse loaded assets; avoid loading a new heavy 3D scene only for the footer.
- **CTA:** Order / Directions / Call according to the conversion brief.

## Motion rules
- Motion never hides required information.
- No effect may block scrolling or navigation if it fails.
- Avoid continuous render loops for static scenes; use demand rendering where possible.
- Pointer parallax must ignore touch and respect reduced motion.
- Avoid simultaneous competing motions in adjacent sections.
- The final visual state must be intentionally composed, not simply the last animation keyframe.
