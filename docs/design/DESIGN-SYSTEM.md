# Design System

## Visual direction
Near-black textured boards, cream type, yellow painted labels, restrained red prices/actions, olive brush fields, red/cream checker accents, authentic source photography, condensed display typography, physical shadows, and intentionally imperfect rotations.

## Authoritative system
`app/globals.css` is the single visual source. It defines shared header/sticky offsets, the 90rem content container, responsive gutters, spacing, type, paint labels, checker edges, image frames, and breakpoints. Page-specific override layers are not permitted.

## Tokens
`--ink #090b0a`, `--cream #f2ecd9`, `--paper #d8ceb5`, `--yellow #f5cf08`, `--red #e02c2f`, `--header-h`, `--container`, and `--gutter`.

Display and navigation typography use self-hosted Barlow Condensed and Oswald subsets from `public/fonts` so local preview and production use the same metrics.

## Rules
Yellow identifies navigation and primary menu actions. Red is limited to prices and high-intent actions. Texture never reduces legibility. Physical depth is shallow and food remains undistorted.
