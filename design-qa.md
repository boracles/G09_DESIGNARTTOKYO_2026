# Design QA

## Comparison target

- Source visual truth: https://hibiya-g09-floorplan.borapado.chatgpt.site/ at REV. 21 · 2026.09.19.
- Implementation: http://localhost:4174/.
- States checked: default 2D, circulation off, electrical off, artwork selection, 3D, desktop, and mobile.

## Capture normalization

- Desktop viewport: 1273 px wide; page 1273 × 1026; sheet 1237 × 918.5; SVG 664.2 × 700.
- Mobile viewport: 390 × 844 CSS px; page 390 × 1470; sheet 374 × 1310; SVG 324 × 361.5.
- Source and implementation match at the same desktop metrics, and the mobile implementation matches the source reference metrics.

## REV.21 fidelity checks

- Revision, title block, dimensions, fixed partition, fixtures, and electrical notes match the latest source.
- Artwork sequence 01–06 and updated dimensions match: 홍선옥, 지은실, 권정륜·신하진, 권정현, 윤보라, 이지우.
- The shelf is split into equal 1933 × 450 sections with the updated magenta, green, and blue assignments.
- Candle includes the revised 900 × 600 surface, repositioned wall display piece, two cabinet pieces, tablet, and the individual power-strip preparation note.
- 잃어버린 방 includes its updated device list and individual charging/cabling preparation note.
- Half Chairs uses the revised central placement and 330 × 425 × H885 dimensions.
- The single-line circulation route, electrical layer, yellow selection treatment, and selection overlay match the source.
- The 3D view includes the full-height fixed partition, five-opening shelf structure, equal shelf assignments, cabinet installations, and central chair.

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
