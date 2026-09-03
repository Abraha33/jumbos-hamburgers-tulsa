# QA Checklist

- All six routes render and navigation is keyboard-operable.
- Home hierarchy matches the approved conversion order.
- Menu, Directions, and Call work identically on desktop/mobile/static modes.
- Every motion surface has a static reduced-motion result.
- No unverified hours, ratings, ordering links, or claims appear.
- Restaurant JSON-LD, canonical metadata, social metadata, sitemap, and robots are present.
- All seven conversion-action names are represented in source/tests.
- Inspect Home, Menu, Story, Contact, Gallery, and 404 at 320, 360, 390, 430, 768, 1024, 1280, 1440, and 1920px.
- Compare the 1440px and 390px captures directly with the approved mockups; scroll before full-page capture to exercise lazy media and sticky behavior.
- Require zero horizontal overflow, unloaded images, unexpected console errors, clipped labels, or obstructed end-of-page actions.
- Verify mobile disclosure navigation, Escape, keyboard focus, menu anchors, featured selection, analytics hooks, reduced motion, pointer depth, and touch targets.
- Run TypeScript, ESLint, rendered/UI tests, the final local production build, `git diff --check`, and final Git status/file inventory.
- No deployment or production write.
