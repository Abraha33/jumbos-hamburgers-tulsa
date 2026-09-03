# Conversion Strategy

## Hierarchy
1. View Menu
2. Get Directions
3. Call
4. Order only when a verified destination exists

## Home flow
3D food hero → Featured Meals → Menu Preview → Story/Trust → Location → Directions.

## Mobile
Persistent MENU / DIRECTIONS / CALL actions. The first Home viewport also exposes a truthful `Hours — Call to confirm today` action because authoritative hours conflict. All functionality remains available without motion.

## Event contract
`restaurant_conversion` is pushed to `window.dataLayer` and dispatched as `jumbos:conversion`. `conversion_action` is one of: `view_menu`, `click_directions`, `click_phone`, `click_order`, `featured_meal_interaction`, `menu_category_view`, `story_interaction`.
