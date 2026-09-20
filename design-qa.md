# Design QA

## Comparison target

- Primary geometry references: `public/assets/blue-by-jjok-elevations.png` and `public/assets/blue-by-jjok-perspective.png`.
- Architecture references: user-supplied gallery photos and marked 3D screenshots from 2026-09-20.
- Implementation: `http://127.0.0.1:4174/` at the desktop viewport.

## Final layout checks

- Blue by jjok uses two W700 × H2500 panels, two open modular frames (H1000 and H720), and two offset white cubes stacked to approximately H1000.
- The fixed partition now extends continuously from the 1500 line to the 5300 return wall; the former 700mm opening is removed in both 2D and 3D.
- Blue by jjok is relocated from the fixed partition to the exterior-view glass wall, with both panel-and-frame assemblies facing into the gallery.
- The exhibition banner is omitted from the current layout.
- The 5800mm right shelf is split evenly: Ji Eunsil 2900mm and Hong Sunok 2900mm.
- Half Chairs is moved farther inside from the entrance and receives a clearly marked 800 × 900mm floor zone.
- The Lost Room has a 1500 × 1000mm VR movement zone aligned to the full width of cabinet A, beginning directly below the cabinet and ending above the Blue by jjok label.
- The entrance/mirror wall seam is closed and the mirror remains unobstructed.
- The Blue by jjok display wall is modeled as a thin fixed partition, leaving the 1300mm-deep area behind it open and labeled for storage.
- A 700 × 650mm attendant seat is placed in front of the entrance mirror with its back toward the mirror, clear of the door swing.

## Interaction and browser checks

- The 2D architectural base is generated directly from `G09_PLAN.pdf` vector rectangles, lines, and curves, normalized to the stated 7250 × 9100 extents; the three source-only movable pedestals are excluded.
- The fixed partition, internal/external columns, left storage shelving, cabinet return, right-wall shelf, and entrance swing now follow that extracted vector layer. The 3D equivalents use the same millimetre positions at 1/1000 scale.
- Two attendant seats are separated: A at the mirror and B behind the cabinet line inside the 726 cabinet gap.
- Attendant A faces inward from the mirror and attendant B faces inward from the top wall.
- Manual duplicate dimension labels are hidden; the visible dimensions come from the PDF-extracted vector layer only.
- Filled, unstroked PDF glyph masks are filtered from the vector layer, removing pale floating annotation bars while retaining architectural strokes.
- Wall junctions overlap slightly and exhibit surfaces are inset to avoid coplanar flicker and visible seam gaps.
- Partition-side storage shelves terminate behind the partition face, and the partition overlaps the structural column by 25mm so neither z-fighting nor a column gap remains.
- The entrance mirror uses a clean uniform light blue-gray surface, avoiding both black clipping and banded-gradient artifacts.
- The 3D world is mirrored on its X axis and viewed from the entrance side so it matches the 2D plan in both axes: cabinets at top, glass entrance at bottom, fixed partition on left, and colored right-wall shelf on right.

- 2D/3D switching, layer toggles, selection synchronization, orbit, pan, zoom, and artwork focus: passed.
- Production build: passed.
- Sites-compatible worker tests: 4/4 passed.
- Git diff whitespace check: passed.

## Comparison history

- [P1] Blue by jjok was incorrectly shown as a shelf strip: replaced with the supplied floor-standing panel and modular-frame geometry.
- [P1] A 700mm hole remained between the fixed partition and return wall: partition extended to meet the return wall.
- [P1] Banner overlapped Hong Sunok's shelf zone: moved to the independent 1725mm blank wall segment after the shelf.
- [P1] Blue by jjok interfered with the Lost Room approach: shifted to the partition end.
- [P2] Half Chairs read as an unanchored object near the entrance: moved inward and given a dedicated floor zone.
- [P2] Right shelf retained three narrow zones: consolidated into two equal 2900mm allocations.

## Findings

- No actionable P0, P1, or P2 differences remain in the checked surfaces.
- Overall Blue by jjok spacing and anti-tip fastening remain field-confirmation items because they are not specified in the source drawings.

final result: passed
