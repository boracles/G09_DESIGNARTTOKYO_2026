# Design QA

## Comparison target

- Source visual truth: https://hibiya-g09-floorplan.borapado.chatgpt.site/ at REV. 23 · 2026.09.19.
- Implementation: http://localhost:4174/.
- States checked: default 2D, circulation off, electrical off, artwork selection, 3D, desktop, and mobile.

## Capture normalization

- Desktop viewport: 1273 × 1000 CSS px; page 1273 × 1032; sheet 1237 × 924.5; SVG 664.2 × 700.
- Mobile viewport: 390 × 844 CSS px; page 390 × 1476; sheet 374 × 1316; SVG 324 × 361.5.
- Source and implementation match at the same desktop metrics, and the mobile implementation matches the source reference metrics.

## REV.23 fidelity checks

- Revision, title block, dimensions, fixed partition, fixtures, and electrical notes match the latest source.
- Artwork order and dimensions match the latest source: Candle, 잃어버린 방, Blue by jjok, Hybrid Nature, Code to Coil, Half Chairs.
- The shelf is split into equal 1933 × 450 sections and now uses the source's 구획 3, 구획 2, 구획 1 labels in blue, green, and magenta.
- Candle includes the revised 900 × 600 surface, repositioned wall display piece, two cabinet pieces, tablet, and the individual power-strip preparation note.
- 잃어버린 방 includes its updated device list and individual charging/cabling preparation note.
- Half Chairs uses the revised central placement and 330 × 425 × H885 dimensions.
- The single-line circulation route, electrical layer, yellow selection treatment, and selection overlay match the source.
- The plan now identifies the exterior viewing glass wall and glass entrance door, and uses the revised outlet-label and shelf-dimension positions.
- The 3D view includes the exterior glass façade and mullions, glass entrance, exhibition graphic, 176cm visitor scale figure, five-opening shelf structure, cabinet installations, and translucent central Half Chairs model.

## Interaction and browser checks

- 2D/3D switching: passed.
- Circulation and electrical toggles: passed; both layers hide independently without layout shift.
- Legend and plan selection synchronization: passed; 윤보라 selection moved the overlay to x=2310.
- 3D drag, wheel zoom, and mesh selection: passed.
- A3 print action and print stylesheet: retained.
- Desktop and mobile responsive layouts: passed with no horizontal overflow.
- Browser console errors and warnings: none.
- Production build: passed.
- Sites-compatible worker tests: 4/4 passed.

## Findings

- No actionable P0, P1, P2, or P3 fidelity differences remain in the checked surfaces.
- Babylon.js remains bundled locally with the app; no source assets are hotlinked.

final result: passed
