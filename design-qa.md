# Design QA

## Comparison target

- Source visual truth: https://hibiya-g09-floorplan.borapado.chatgpt.site/ at REV. 26 · 2026.09.20.
- Implementation: http://127.0.0.1:4174/.
- Source evidence: authenticated Chrome full-page captures of the 2D and default 3D states, plus the source inline SVG and stylesheet gathered from the rendered page.
- Implementation evidence: in-app Browser full-page captures of the matching 2D and default 3D states.
- Focused evidence: source and implementation captures were emitted together to compare the glass wall, entrance, missing wall, visitor model, and floor-plan door detail.

## Capture normalization

- Desktop source CSS viewport/page: 1591 × 1026; source sheet 1420 × 918.0.
- Desktop implementation CSS viewport/page: 1591 × 1032; implementation sheet 1420 × 924.5.
- Mobile implementation viewport: 390 × 844 CSS px; page 390 × 1476 in 2D and 390 × 1782 in 3D; sheet 374 × 1316; SVG 324 × 361.5.
- Browser screenshots were compared at device scale 1 after matching the desktop CSS width. The six-pixel sheet-height difference is browser-surface rounding and does not change layout hierarchy or content.

## REV.25 fidelity checks

- Revision, date, title block, dimensions, fixtures, electrical notes, selection behavior, and artwork details match the latest source.
- The floor-plan entrance now exactly follows the source SVG: 1200mm total opening, 250mm fixed glass, 950mm hinged glass door, three jamb marks, door leaf, and 950mm swing arc.
- The exterior viewing glass is split into three equal bays with four vertical frame members and no incorrect mid-height transom.
- The previously missing wall behind the wood cabinets is restored at full 2850mm height.
- The 3D entrance is split into a narrow fixed-glass panel and a wider glass door, with separate jambs, head frame, and handle.
- The supplied `Untitled.glb` is copied locally as `public/assets/person.glb`, loaded with Babylon's glTF loader, rotated upright, centered, and automatically scaled to 170cm.
- Desktop and mobile 2D/3D layouts have no horizontal overflow.

## Interaction and browser checks

- 2D/3D switching: passed.
- Circulation and electrical toggles: passed; both layers hide independently.
- Legend and plan selection synchronization: passed; 윤보라 selection moved the overlay to x=2310.
- 3D drag, wheel zoom, artwork selection, and GLB loading: passed.
- Desktop and mobile responsive rendering: passed.
- Browser console errors and warnings: none.
- Production build: passed.
- Sites-compatible worker tests: 4/4 passed.

## Comparison history

- [P1] Missing cabinet-side wall: the prior implementation omitted the full top wall. Fixed by restoring the 7250 × 2850 wall; post-fix 3D capture shows the same enclosing wall as the source.
- [P1] Exterior glass and entrance anatomy: the prior implementation used four glass bays and one generic entrance pane. Fixed to three bays and the source's 250/950mm entrance split; post-fix plan and 3D captures show the corrected frames.
- [P1] Placeholder visitor: the prior implementation used procedural body shapes and a 176cm label. Fixed with the user-provided GLB and source-matching 170cm label; post-fix capture shows the real model standing upright.

## Findings

- No actionable P0, P1, or P2 fidelity differences remain in the checked surfaces.
- Typography, spacing, colors, image/model quality, and app-specific copy were checked against the source. No source image is hotlinked; the person GLB is bundled locally.

final result: passed
