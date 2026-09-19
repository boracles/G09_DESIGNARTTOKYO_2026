# Design QA

## Comparison target

- Source visual truth: `G09-floorplan-source-REV29.zip` supplied by the user, plus the live ChatGPT site at `REV. 29 · 2026.09.20`.
- Source archive: `/Users/boracles/Downloads/G09-floorplan-source-REV29.zip`.
- Implementation: `http://127.0.0.1:4174/`.
- Desktop source and implementation captures were emitted together at a normalized 1591 × 1026 CSS-pixel viewport.

## REV.29 fidelity checks

- The 3D camera, room shell, three-bay exterior glass, 250/950 entrance split, passage floor, and cabinet-side wall match the supplied source.
- The entrance mirror uses the source's 1024px planar reflection texture, reflective material, double-sided plane, raised position, and frame geometry.
- The exhibition intro banner matches the source position, dimensions, orientation, texture, and wall placement.
- The supplied `person.glb` uses the source normalization, upright rotation, world position, facing angle, and 170cm label.
- Bora Youn and Candle Janga artwork geometry, display angle, wall panel, tablet position, dimensions, and materials match REV.29.
- The cabinet gap no-entry barrier is present in both the 2D plan and 3D floor.
- 3D navigation supports left-drag orbit, right-drag or two-finger pan, wheel or pinch zoom, and artwork focus.

## Interaction and browser checks

- 2D/3D switching: passed.
- Circulation and electrical toggles: passed.
- Legend, plan, and 3D selection synchronization: passed.
- 3D orbit, pan, zoom, artwork focus, mirror reflection, and GLB loading: passed.
- Desktop and mobile responsive rendering: passed.
- Browser console errors and warnings: none.
- Production build: passed.
- Sites-compatible worker tests: 4/4 passed.

## Comparison history

- [P1] Mirror missing or visually incorrect: fixed with the exact REV.29 planar reflection texture, material parameters, raised plane, and frame assembly.
- [P1] Intro banner reversed and mis-sized: fixed to the exact source transform and 1.7 × 2.2m plane.
- [P1] Visitor position and orientation differed: fixed to source pivot `(5.25, 0, 6.45)`, yaw `-0.38`, and model rotation `-π/2`.
- [P1] Candle display geometry and tablet side differed: fixed to the exact source layout.
- [P1] Artwork view angles differed: restored the REV.29 selection-specific camera targets and angles.
- [P2] Missing cabinet gap barrier, mirror height, and scene colors: fixed to the supplied source values.
- [P2] 3D panning unavailable: enabled right-button mouse panning and two-finger touch panning, with context-menu suppression on the canvas.

## Findings

- No actionable P0, P1, or P2 fidelity differences remain in the checked surfaces.
- Typography, spacing, colors, geometry, model quality, materials, and copy were checked against the supplied REV.29 source.
- The person model is bundled locally; no source image or model is hotlinked.

final result: passed
