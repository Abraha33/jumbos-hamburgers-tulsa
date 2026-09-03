# 3D Interaction Specification

| Surface | Attention purpose | Conversion/story purpose | Desktop | Tablet | Mobile/reduced motion |
|---|---|---|---|---|---|
| Home hero | Lead with food/menu | Menu and directions | CSS 3D pointer parallax across tray, checker paper, food and stamp | Reduced transforms | Lightweight stacked depth / static final composition |
| Featured Meals | Focus selected item | Appetite to Menu/Directions | CSS tray, paper and raised-image depth | Shallower depth | Static tray and selection |
| Story timeline | Mark change through time | Build local memory/trust | Scroll-linked CSS artifact depth plus era-view signals | Flat framed artifacts | Flat final boards |
| Cards/buttons | Clarify affordance | Improve scanning/action | 1–2px lift | Reduced lift | No required motion |

Any motion without both an attention purpose and a conversion/story purpose is removed. Interaction never hides content.

The existing R3F modules remain available behind reduced-motion/WebGL safeguards, but are not forced onto a composition where semantic DOM and CSS depth produce better fidelity, faster first content, and more reliable mobile fallbacks.
