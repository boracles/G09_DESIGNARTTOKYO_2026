# Design QA

## Comparison target

- Source visual truth: https://hibiya-g09-floorplan.borapado.chatgpt.site/ (browser captures of 2D and 3D states).
- Implementation: http://localhost:4174/ (browser captures of 2D and 3D states).
- State: default 2D view with electrical layer on; electrical layer off; 3D view; artwork G selected.

## Capture normalization

- Desktop viewport: 1728 × 958 CSS px at device scale factor 1.
- Desktop full-page pixels: 1728 × 1090 for both source and implementation.
- Mobile viewport: 390 × 844 CSS px at device scale factor 1.
- Mobile full-page pixels: 390 × 1518 for the 2D state and 390 × 1825 for the 3D state, for both source and implementation.
- Browser chrome was excluded. Source and implementation were captured at equal viewport sizes and reviewed together in the same comparison pass.
- The browser provider returned the screenshots inline rather than as persistent filesystem files; the source and implementation URLs above are the durable evidence locations.

## Findings

- No actionable P0, P1, or P2 differences remain in the primary 2D plan, responsive layout, typography, color system, copy, legend, title block, or controls.
- P3: the rebuilt Babylon 3D scene has a slightly different camera perspective and fixture occlusion than the source. Room massing, neutral material treatment, the purple Half Chairs marker, drag/zoom behavior, and artwork selection remain equivalent.

## Required fidelity surfaces

- Fonts and typography: matched the source system stack, weights, sizes, line heights, letter spacing, wrapping, and monospaced drawing metadata.
- Spacing and layout rhythm: desktop sheet width, 1068/310 body columns, 700 px drawing height, mobile single-column stacking, gutters, borders, and title-block geometry match the source measurements.
- Colors and visual tokens: matched the black app bar, white sheet, neutral page background, blue action, electrical red, fixture neutrals, and A–G artwork colors.
- Image quality and asset fidelity: the source uses an inline SVG rather than raster imagery; the full floor plan was recreated as vector geometry without placeholders or hotlinked assets. The 3D scene uses local Babylon.js code and materials.
- Copy and content: headings, revision, dimensions, artwork assignments, power notes, fixture data, scale, area, and status match the source.

## Interaction and browser checks

- 2D/3D switching: passed.
- Electrical layer toggle: passed; the SVG layer becomes hidden without layout shift.
- Legend and drawing artwork selection: passed; selected styles synchronize.
- 3D drag, wheel zoom, and mesh selection: passed.
- A3 print action: connected to the browser print dialog; print stylesheet retained.
- Console errors and warnings in a fresh browser tab: none.
- Production build: passed.
- Sites-compatible worker tests: 4/4 passed.

## Comparison history

1. Initial comparison found a P2 3D drift: the colored shelf strip and structural pillar were more visually prominent than the source.
2. Fixes: removed the colored shelf strip, reduced the pillar to fixture height, simplified the fixed objects, adjusted neutral materials, moved the Half Chairs marker, and retuned the camera.
3. Post-fix comparison: the dominant room massing and artwork emphasis align with the source; the remaining 3D perspective difference is P3 only.

## Focused-region comparison

- Floor-plan drawing: checked dimension labels, electrical symbols, fixed-fixture hatching, shelf segment colors, B/G callouts, north mark, and scale bar.
- Right legend: checked every A–G row, measurements, selected state, power badge, warnings, fixture definitions, and PDF instructions.
- Title block: checked all six metadata cells and the mobile two-column wrap.
- Additional focused crops were not needed because all small text remained readable in the equal-size captures.

## Implementation checklist

- [x] Match desktop and mobile layouts.
- [x] Match vector plan content and labels.
- [x] Implement 2D/3D, electrical, selection, and print interactions.
- [x] Verify responsive dimensions and console output.
- [x] Build and test the production package.

final result: passed
