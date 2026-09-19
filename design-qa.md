# Design QA

## Comparison target

- Source visual truth: https://hibiya-g09-floorplan.borapado.chatgpt.site/ at REV. 05 · 2026.09.19.
- Implementation: http://localhost:4174/.
- States checked: default 2D, circulation off, electrical off, artwork selection, 3D, desktop, and mobile.

## Capture normalization

- Desktop viewport: 1728 × 958 CSS px.
- Desktop page: 1728 × 1041; sheet 1420 × 933.5; body columns 1068 / 310; SVG 785.55 × 700.
- Mobile viewport: 390 × 844 CSS px.
- Mobile page: 390 × 1499; sheet 374 × 1339; drawing 348 × 373.5; legend 348 × 748; SVG 324 × 361.5.
- Source and implementation were measured at equal viewport sizes and visually compared in-browser.

## REV.05 fidelity checks

- Revision, title block, dimensions, fixed fixtures, shelf structure, and electrical notes match the latest source.
- Artwork sequence 01–06 matches: 홍선옥, 지은실, 권정륜·신하진, 권정현, 윤보라, 이지우.
- Shelf allocation matches the 2900 / 1450 / 1450 split and its updated colors.
- Candle uses the centered 900 × 600 cabinet-B zone with two shared 775 zones.
- 잃어버린 방 includes the 1100 × 600 cabinet-A footprint and updated device/tea props.
- Half Chairs uses the revised central placement.
- The revised circulation path, direction arrows, label, and layer toggle match the source.
- The 3D view carries the updated six-artwork arrangement, shelf segmentation, cabinet objects, and central chair.

## Interaction and browser checks

- 2D/3D switching: passed.
- Circulation and electrical toggles: passed; both layers hide independently without layout shift.
- Legend and plan selection synchronization: passed.
- 3D drag, wheel zoom, and mesh selection: passed.
- A3 print action and print stylesheet: retained.
- Desktop and mobile responsive layouts: passed.
- Browser console errors and warnings: none.
- Production build: passed.
- Sites-compatible worker tests: 4/4 passed.

## Findings

- No actionable P0, P1, P2, or P3 fidelity differences remain in the checked surfaces.
- Babylon.js remains bundled locally with the app; no source assets are hotlinked.

final result: passed
