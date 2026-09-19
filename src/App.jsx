import { useEffect, useRef, useState } from "react";
import * as BABYLON from "babylonjs";

const works = [
  { id: "candle", index: "04", color: "#f26a21", title: "권정현 · Candle", detail: "목재장 B · 3점 + 태블릿 · 전원", prep: "개별 준비 · 멀티탭", size: "가로 900 × 세로 600mm" },
  { id: "bora", index: "05", color: "#258b85", title: "윤보라 · 잃어버린 방", detail: "LG 17MT70 · Quest 3 · 충전 독 · 티백 · 찻잔", prep: "개별 준비 · 멀티탭 · PD 충전기 · 충전 독 어댑터 · 전원·영상 케이블", size: "가로 1100 × 세로 600mm" },
  { id: "blue-by-jjok", index: "03", zone: "구획 3", color: "#386a8c", title: "권정륜 · 신하진 · Blue by jjok", detail: "우측 선반 · 구획 3", size: "가로 1933 × 세로 450mm", shelfY: 1575, shelfHeight: 1933.3333333333333 },
  { id: "eunsil", index: "02", zone: "구획 2", color: "#6b8f71", title: "지은실 · Hybrid Nature", detail: "우측 선반 · 구획 2", size: "가로 1933 × 세로 450mm", shelfY: 3508.333333333333, shelfHeight: 1933.3333333333333 },
  { id: "sunok", index: "01", zone: "구획 1", color: "#b5477b", title: "홍선옥 · Code to Coil", detail: "우측 선반 · 구획 1", size: "가로 1933 × 세로 450mm", shelfY: 5441.666666666666, shelfHeight: 1933.3333333333333 },
  { id: "halfchairs", index: "06", color: "#6d50d4", title: "이지우 · Half Chairs", detail: "바닥 설치", size: "가로 330 × 세로 425 × 높이 885mm" },
];

const shelfWorks = ["blue-by-jjok", "eunsil", "sunok"].map((id) => works.find((work) => work.id === id));

const selectionBounds = {
  "blue-by-jjok": { x: 6840, y: 1575, width: 370, height: 1933.3333333333333 },
  eunsil: { x: 6840, y: 3508.333333333333, width: 370, height: 1933.3333333333333 },
  sunok: { x: 6840, y: 5441.666666666666, width: 370, height: 1933.3333333333333 },
  candle: { x: 4875, y: 975, width: 900, height: 600 },
  bora: { x: 2310, y: 995, width: 1100, height: 560 },
  halfchairs: { x: 4100, y: 3400, width: 330, height: 425 },
};

function Plan({ circulation, electrical, selected, onSelect }) {
  const selectedBounds = selectionBounds[selected];
  return (
    <div className="drawing-wrap" id="planView">
      <svg id="floorSvg" viewBox="-1100 -700 9500 10600" role="img" aria-labelledby="planTitle planDesc">
        <title id="planTitle">HIBIYA OKUROJI G09 작품 배치 평면도</title>
        <desc id="planDesc">G09 원도면 비율, 고정 집기, 전기 지점, 우측 선반 작품 배정과 Half Chairs 바닥 설치를 표시한 도면</desc>
        <defs>
          <pattern id="grid500" width="500" height="500" patternUnits="userSpaceOnUse">
            <path d="M500 0H0V500" fill="none" stroke="#dde0e5" strokeWidth="8" strokeDasharray="30 30" />
          </pattern>
          <pattern id="fixedHatch" width="90" height="90" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="90" stroke="#a5aab3" strokeWidth="18" />
          </pattern>
          <marker id="dimArrowStart" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 5L10 0V10Z" fill="#515660" />
          </marker>
          <marker id="dimArrowEnd" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M10 5L0 0V10Z" fill="#515660" />
          </marker>
          <marker id="routeArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0L10 5L0 10Z" fill="#2563eb" />
          </marker>
        </defs>

        <path className="floor" d="M0 0H7250V9100H2850V5300H0Z" />
        <path className="grid" d="M0 0H7250V9100H2850V5300H0Z" fill="url(#grid500)" />
        <path className="wall" d="M0 0H7250V9100H2850V5300H0V0Z" />
        <path className="inner-wall" d="M120 120H7130V8980H2970V5180H120Z" />

        <g className="fixed" aria-label="움직일 수 없는 기존 집기">
          <rect x="0" y="1500" width="1300" height="3100" />
          <text className="partition-label" x="650" y="2640">고정 파티션</text>
          <text className="partition-label" x="650" y="2880">전시 설명 그래픽</text>
          <text className="partition-label" x="650" y="3120">W1300 · L3100</text>
          <text className="partition-label" x="650" y="3360">H2850</text>
          <rect x="1300" y="700" width="800" height="800" className="pillar" />
          <text x="1700" y="1080">구조기둥</text>
          <text x="1700" y="1270">800 × 800</text>
          <rect x="2110" y="975" width="1500" height="600" />
          <text className="cabinet-label" x="2860" y="680">목재장 A</text>
          <text className="cabinet-label" x="2860" y="850">1500 × 600 · H850</text>
          <rect x="4100" y="975" width="2450" height="600" />
          <text x="5325" y="875">목재장 B · 2450 × 600 · H1000</text>
          <rect x="6800" y="1575" width="450" height="5800" className="shelf-base" />
          <text className="rotated-label" x="7040" y="4475">수납형 고정 선반 · 5800 × 450 · H870</text>
          <rect x="2925" y="5300" width="45" height="1250" className="mirror" />
          <text x="3130" y="5925" transform="rotate(-90 3130 5925)">고정 거울</text>
        </g>

        <g className="context-pillars" aria-label="외부 구조기둥">
          <rect x="7480" y="700" width="800" height="800" />
          <rect x="7480" y="5200" width="800" height="800" />
          <text x="7880" y="1110">0.8</text><text x="7880" y="5610">0.8</text>
        </g>

        <g className="glass-wall-plan" aria-label="외부 조망 유리벽">
          <line x1="2850" y1="9040" x2="7250" y2="9040" />
          <line x1="2850" y1="9090" x2="7250" y2="9090" />
          <text x="5050" y="8920">외부 조망 유리벽</text>
        </g>

        <g className="door">
          <line x1="2850" y1="6720" x2="2850" y2="7920" />
          <line x1="2850" y1="6720" x2="4050" y2="7920" />
          <path d="M2850 6720A1200 1200 0 0 1 4050 7920" />
          <text x="3190" y="8140">유리 출입문 W1200</text>
        </g>

        <g className={`circulation-layer${circulation ? "" : " is-hidden"}`} id="circulationLayer" aria-label="출입구에서 시작하는 예상 관람 동선">
          <path className="circulation-line" d="M3000 7600 C4200 7900 5650 7350 6100 6500 C6400 5950 6250 4100 6250 3150 C6250 2600 6000 2350 5450 2350 C4700 2350 3950 2380 3550 2700 C3350 3000 3400 3700 3500 4300 C3650 5100 3600 6050 3300 6700 C3200 6950 3100 7150 2950 7200 C2850 7230 2700 7200 2550 7200" markerEnd="url(#routeArrow)" />
        </g>

        <g id="shelfAssignments" className="assignments" aria-label="우측 선반 작품 배정">
          {shelfWorks.map((work) => (
            <g
              key={work.id}
              className={`shelf-segment${selected === work.id ? " is-selected" : ""}`}
              tabIndex="0"
              role="button"
              aria-label={`${work.title.split(" · ")[0]}, 우측 선반 ${work.zone}, ${work.shelfHeight}밀리미터`}
              data-id={work.id}
              onClick={() => onSelect(work.id)}
              onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect(work.id)}
            >
              <rect x="6840" y={work.shelfY} width="370" height={work.shelfHeight} fill={work.color} />
              <text className="segment-zone" x="7025" y={work.shelfY + work.shelfHeight / 2 - 120}>{work.zone}</text>
              <text className="segment-length" x="7025" y={work.shelfY + work.shelfHeight / 2 + 40}>1933</text>
              <text className="segment-depth" x="7025" y={work.shelfY + work.shelfHeight / 2 + 185}>× 450</text>
            </g>
          ))}
        </g>

        <g className="cabinet-sharing" aria-label="목재장 B 공유 가능 구간">
          <rect x="4100" y="995" width="775" height="560" /><rect x="5775" y="995" width="775" height="560" />
          <text x="4488" y="1320">공유 가능 · 775</text><text x="6163" y="1320">공유 가능 · 775</text>
        </g>

        <g className={`candle-work${selected === "candle" ? " is-selected" : ""}`} data-id="candle" tabIndex="0" role="button" aria-label="권정현 Candle 기존 목재장 B와 벽면 설치" onClick={() => onSelect("candle")} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect("candle")}>
          <rect className="surface" x="4875" y="975" width="900" height="600" />
          <rect className="display-wall" x="4890" y="990" width="480" height="42" />
          <circle className="wall-piece" cx="5010" cy="1070" r="82" />
          <circle cx="5075" cy="1280" r="82" /><circle cx="5325" cy="1280" r="82" />
          <rect className="tablet" x="5540" y="1320" width="170" height="110" rx="16" />
          <text className="work-label" x="5325" y="1780" textAnchor="middle">04 · 권정현 · Candle</text>
          <text className="work-detail" x="5325" y="1970" textAnchor="middle">목재장 B 중앙 · 900 × 600mm · 전원</text>
        </g>

        <g className={`bora-work${selected === "bora" ? " is-selected" : ""}`} data-id="bora" tabIndex="0" role="button" aria-label="윤보라 잃어버린 방 기존 목재장 A 설치" onClick={() => onSelect("bora")} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect("bora")}>
          <rect className="surface" x="2310" y="995" width="1100" height="560" />
          <rect className="monitor" x="2350" y="1035" width="379" height="165" rx="12" />
          <line className="monitor-stand" x1="2539" y1="1200" x2="2585" y2="1280" />
          <g className="charging-dock"><rect x="2670" y="1290" width="500" height="230" rx="45" /><path d="M2780 1410Q2920 1300 3060 1410Q3010 1500 2920 1500Q2830 1500 2780 1410Z" /><circle cx="2735" cy="1405" r="48" /><circle cx="3105" cy="1405" r="48" /></g>
          <rect className="tea-bag" x="2790" y="1040" width="220" height="130" rx="20" /><circle className="tea-cup" cx="3230" cy="1105" r="72" /><circle className="cup-handle" cx="3310" cy="1105" r="34" />
          <rect className="power-strip" x="2720" y="1205" width="350" height="58" rx="24" />
          <text className="work-label" x="2860" y="1780" textAnchor="middle">05 · 윤보라 · 잃어버린 방</text>
          <text className="work-detail" x="2860" y="1970" textAnchor="middle">가로 1100 × 세로 600mm · 전원</text>
        </g>

        <g className={`floor-work${selected === "halfchairs" ? " is-selected" : ""}`} data-id="halfchairs" tabIndex="0" role="button" aria-label="이지우 Half Chairs 바닥 설치" onClick={() => onSelect("halfchairs")} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect("halfchairs")}>
          <rect x="4100" y="3400" width="330" height="425" />
          <text className="work-label" x="4265" y="4050" textAnchor="middle">06 · 이지우</text>
          <text className="work-title" x="4265" y="4225" textAnchor="middle">Half Chairs</text>
          <text className="work-detail" x="4265" y="4390" textAnchor="middle">330 × 425 × H885</text>
        </g>

        <g className={`electrical-layer${electrical ? "" : " is-hidden"}`} id="electricalLayer" aria-label="전기 및 통신 설비">
          <path className="wiring" d="M220 420H6800V8770" />
          <g className="db" transform="translate(420 310)"><path d="M0 0L330 0L0 150Z" /><text x="170" y="-45">분전반 / 전력 인입</text></g>
          <g className="outlet" transform="translate(210 500)"><circle r="72" /><path d="M-36 0H36M0 0V55" /><text x="110" y="45">2P 15A/125V</text></g>
          <g className="outlet" transform="translate(2100 420)"><circle r="72" /><path d="M-36 0H36M0 0V55" /></g>
          <g className="outlet" transform="translate(3010 5100)"><circle r="72" /><path d="M-36 0H36M0 0V55" /><text x="-120" y="-105" textAnchor="end">2P 15A/125V</text></g>
          <g className="outlet" transform="translate(6880 8720)"><circle r="72" /><path d="M-36 0H36M0 0V55" /><text x="-120" y="-90" textAnchor="end">2P 15A/125V</text></g>
          <g className="counter-ports">
            <g className="outlet" transform="translate(5550 1520)"><circle r="66" /><path d="M-32 0H32M0 0V50" /></g>
            <g className="outlet" transform="translate(5880 1520)"><circle r="66" /><path d="M-32 0H32M0 0V50" /></g>
            <g className="tel" transform="translate(6200 1520)"><circle r="66" /><text y="30">T</text></g>
            <g className="lan" transform="translate(6480 1520)"><circle r="66" /><text y="30">L</text></g>
            <text x="6030" y="720">목재장 B 전원 · TEL · LAN</text>
          </g>
        </g>

        <g className="dimensions" aria-hidden="true">
          <line className="dimension-line" x1="0" y1="-430" x2="7250" y2="-430" /><line x1="0" y1="-520" x2="0" y2="-80" /><line x1="7250" y1="-520" x2="7250" y2="-80" /><text x="3625" y="-500">7,250</text>
          <line className="dimension-line" x1="-430" y1="0" x2="-430" y2="9100" /><line x1="-520" y1="0" x2="-80" y2="0" /><line x1="-520" y1="9100" x2="-80" y2="9100" /><text x="-520" y="4550" transform="rotate(-90 -520 4550)">9,100</text>
          <line className="dimension-line" x1="-760" y1="0" x2="-760" y2="5300" /><line x1="-850" y1="0" x2="-620" y2="0" /><line x1="-850" y1="5300" x2="-620" y2="5300" /><text x="-850" y="2650" transform="rotate(-90 -850 2650)">5,300</text>
          <line className="dimension-line" x1="2850" y1="9510" x2="7250" y2="9510" /><line x1="2850" y1="9270" x2="2850" y2="9600" /><line x1="7250" y1="9270" x2="7250" y2="9600" /><text x="5050" y="9710">4,400</text>
          <line className="dimension-line" x1="6650" y1="1575" x2="6650" y2="7375" /><line x1="6580" y1="1575" x2="6750" y2="1575" /><line x1="6580" y1="7375" x2="6750" y2="7375" /><text x="6570" y="4475" transform="rotate(-90 6570 4475)">5,800</text>
          <line className="dimension-line" x1="6800" y1="7600" x2="7250" y2="7600" /><text x="7025" y="7800">450</text>
        </g>
        <g className="north-mark" aria-label="도면 방향"><path d="M430 8300L650 8750L430 8650L210 8750Z" /><text x="430" y="8180">N</text></g>
        <g className="scale-bar" aria-label="축척 막대"><rect x="0" y="8800" width="500" height="120" /><rect x="500" y="8800" width="500" height="120" className="open" /><text x="0" y="9160">0</text><text x="500" y="9160">0.5</text><text x="1000" y="9160">1m</text></g>
        {selectedBounds && <g className="selection-overlay" aria-hidden="true"><rect {...selectedBounds} className="selection-halo" /><rect {...selectedBounds} className="selection-outline" /></g>}
      </svg>
    </div>
  );
}

function ThreeView({ selected, onSelect }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color4.FromHexString("#f2f3f5ff");

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI * 0.44, Math.PI * 0.24, 12.6, new BABYLON.Vector3(4.7, 1.22, 4.55), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 7;
    camera.upperRadiusLimit = 19;
    camera.wheelPrecision = 45;
    camera.panningSensibility = 0;

    const hemi = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    hemi.intensity = 1.2;
    const light = new BABYLON.DirectionalLight("key", new BABYLON.Vector3(-0.5, -1, 0.4), scene);
    light.position = new BABYLON.Vector3(6, 10, -4);
    light.intensity = 0.18;

    const material = (name, hex) => {
      const mat = new BABYLON.StandardMaterial(name, scene);
      mat.diffuseColor = BABYLON.Color3.FromHexString(hex);
      mat.specularColor = new BABYLON.Color3(0.06, 0.06, 0.06);
      return mat;
    };
    const wallMat = material("walls", "#bfc0bd");
    const floorMat = material("floor", "#ffffff");
    const fixtureMat = material("fixtures", "#e6e9ee");
    const shelfMat = material("shelf fixture", "#303235");
    const shelfInsetMat = material("shelf openings", "#dad8d2");
    const frameMat = material("window frames", "#22262c");
    const glassMat = material("glass", "#8fa7b5");
    glassMat.alpha = 0.34;
    glassMat.backFaceCulling = false;

    const selectableMeshes = [];
    const box = (name, width, height, depth, x, y, z, mat, id) => {
      const mesh = BABYLON.MeshBuilder.CreateBox(name, { width, height, depth }, scene);
      mesh.position.set(x, y, z);
      mesh.material = mat;
      mesh.metadata = id ? { id } : null;
      mesh.isPickable = Boolean(id);
      if (id) selectableMeshes.push(mesh);
      return mesh;
    };

    box("upper floor", 7.25, 0.08, 5.3, 3.625, -0.04, 2.65, floorMat);
    box("lower floor", 4.4, 0.08, 3.8, 5.05, -0.04, 7.2, floorMat);
    const wallHeight = 2.85;
    const t = 0.12;
    box("right wall", t, wallHeight, 9.1, 7.25, wallHeight / 2, 4.55, wallMat);
    box("inner vertical", t, wallHeight, 3.8, 2.85, wallHeight / 2, 7.2, wallMat);
    box("inner horizontal", 2.85, wallHeight, t, 1.425, wallHeight / 2, 5.3, wallMat);
    box("left wall", t, wallHeight, 5.3, 0, wallHeight / 2, 2.65, wallMat);
    box("fixed partition", 1.3, wallHeight, 3.1, 0.65, wallHeight / 2, 3.05, wallMat);
    box("pillar", 0.8, wallHeight, 0.8, 1.7, wallHeight / 2, 1.1, wallMat);
    box("cabinet A", 1.5, 0.85, 0.6, 2.86, 0.425, 1.275, fixtureMat);
    box("cabinet B", 2.45, 1.0, 0.6, 5.325, 0.5, 1.275, fixtureMat);
    box("shelf fixture", 0.45, 0.75, 5.8, 7.025, 0.435, 4.475, shelfMat);
    [2.155, 3.315, 4.475, 5.635, 6.795].forEach((z, index) => box(`shelf opening ${index + 1}`, 0.025, 0.32, 0.9, 6.79, 0.43, z, shelfInsetMat));

    [3.4, 4.5, 5.6, 6.7].forEach((x, index) => box(`glass panel ${index + 1}`, 1.02, 2.28, 0.035, x, 1.33, 9.08, glassMat));
    [2.85, 3.95, 5.05, 6.15, 7.25].forEach((x, index) => box(`glass mullion ${index + 1}`, 0.07, 2.55, 0.09, x, 1.38, 9.08, frameMat));
    box("glass sill", 4.4, 0.08, 0.12, 5.05, 0.08, 9.08, frameMat);
    box("glass transom", 4.4, 0.08, 0.12, 5.05, 1.82, 9.08, frameMat);
    box("glass head", 4.4, 0.12, 0.14, 5.05, 2.64, 9.08, frameMat);
    box("exterior beam", 4.55, 0.2, 0.52, 5.05, 2.92, 9.42, frameMat);

    box("glass entry", 0.035, 2.45, 1.1, 2.87, 1.35, 7.32, glassMat);
    box("entry post north", 0.09, 2.55, 0.09, 2.87, 1.38, 6.77, frameMat);
    box("entry post south", 0.09, 2.55, 0.09, 2.87, 1.38, 7.87, frameMat);
    box("entry head", 0.11, 0.09, 1.2, 2.87, 2.64, 7.32, frameMat);

    const posterTexture = new BABYLON.DynamicTexture("exhibition graphic", { width: 600, height: 960 }, scene, false);
    const poster = posterTexture.getContext();
    poster.fillStyle = "#f5f5f2";
    poster.fillRect(0, 0, 600, 960);
    poster.fillStyle = "#205bd8";
    poster.fillRect(0, 0, 600, 120);
    poster.fillStyle = "#ffffff";
    poster.font = "700 34px Arial";
    poster.fillText("DESIGNART TOKYO", 34, 54);
    poster.font = "700 22px Arial";
    poster.fillText("2026 · HIBIYA OKUROJI", 34, 91);
    poster.fillStyle = "#20242a";
    poster.font = "800 46px Arial";
    poster.fillText("EXHIBITION", 34, 210);
    poster.fillText("INTRODUCTION", 34, 264);
    poster.font = "700 24px Arial";
    poster.fillText("NAME · MEMORY", 34, 350);
    poster.fillText("NATURE · TECHNOLOGY", 34, 390);
    poster.strokeStyle = "#9ca3ad";
    poster.lineWidth = 5;
    [460, 535, 610, 685, 760, 835].forEach((y) => { poster.beginPath(); poster.moveTo(34, y); poster.lineTo(566, y); poster.stroke(); });
    posterTexture.update();
    const posterMat = new BABYLON.StandardMaterial("exhibition graphic material", scene);
    posterMat.diffuseTexture = posterTexture;
    posterMat.emissiveColor = new BABYLON.Color3(0.18, 0.18, 0.18);
    posterMat.backFaceCulling = false;
    const posterMesh = BABYLON.MeshBuilder.CreatePlane("exhibition graphic", { width: 0.92, height: 1.48 }, scene);
    posterMesh.position.set(1.306, 1.57, 2.95);
    posterMesh.rotation.y = Math.PI / 2;
    posterMesh.material = posterMat;

    const workMaterials = Object.fromEntries(works.map((work) => [work.id, material(work.id, work.color)]));
    box("shelf upper", 0.45, 0.12, 1.933, 7.025, 0.87, 2.542, workMaterials["blue-by-jjok"], "blue-by-jjok");
    box("shelf middle", 0.45, 0.12, 1.933, 7.025, 0.87, 4.475, workMaterials.eunsil, "eunsil");
    box("shelf lower", 0.45, 0.12, 1.933, 7.025, 0.87, 6.408, workMaterials.sunok, "sunok");
    box("candle surface", 0.9, 0.08, 0.6, 5.325, 1.04, 1.275, workMaterials.candle, "candle");
    [[5.01, 1.07], [5.075, 1.28], [5.325, 1.28]].forEach(([x, z], index) => box(`candle ${index + 1}`, 0.09, 0.2 + index * 0.04, 0.09, x, 1.17 + index * 0.02, z, workMaterials.candle, "candle"));
    box("candle tablet", 0.17, 0.13, 0.08, 5.625, 1.16, 1.42, material("tablet", "#22252b"), "candle");
    box("bora surface", 1.1, 0.08, 0.56, 2.86, 0.89, 1.275, workMaterials.bora, "bora");
    box("bora monitor", 0.379, 0.36, 0.08, 2.54, 1.11, 1.09, material("monitor", "#22252b"), "bora");
    box("bora charging dock", 0.5, 0.14, 0.245, 3.06, 1.03, 1.17, workMaterials.bora, "bora");
    box("bora tea bag", 0.22, 0.07, 0.13, 2.52, 1.0, 1.40, material("tea", "#d6b06b"), "bora");
    workMaterials.halfchairs.alpha = 0.45;
    box("chair seat", 0.33, 0.12, 0.425, 4.265, 0.47, 3.61, workMaterials.halfchairs, "halfchairs");
    box("chair back", 0.33, 0.76, 0.11, 4.265, 0.88, 3.77, workMaterials.halfchairs, "halfchairs");
    box("chair lower half", 0.33, 0.36, 0.16, 4.265, 0.2, 3.48, workMaterials.halfchairs, "halfchairs");

    const skinMat = material("visitor skin", "#a86d4d");
    const visitorTopMat = material("visitor top", "#59616b");
    const visitorPantsMat = material("visitor pants", "#182027");
    const visitorX = 4.38;
    const visitorZ = 7.45;
    const head = BABYLON.MeshBuilder.CreateSphere("visitor head", { diameter: 0.24, segments: 16 }, scene);
    head.position.set(visitorX, 1.66, visitorZ);
    head.material = skinMat;
    box("visitor torso", 0.42, 0.68, 0.24, visitorX, 1.23, visitorZ, visitorTopMat);
    box("visitor left leg", 0.12, 0.72, 0.13, visitorX - 0.12, 0.54, visitorZ, visitorPantsMat);
    box("visitor right leg", 0.12, 0.72, 0.13, visitorX + 0.12, 0.54, visitorZ, visitorPantsMat);
    box("visitor left arm", 0.1, 0.68, 0.1, visitorX - 0.28, 1.18, visitorZ, skinMat);
    box("visitor right arm", 0.1, 0.68, 0.1, visitorX + 0.28, 1.18, visitorZ, skinMat);

    const visitorLabelTexture = new BABYLON.DynamicTexture("visitor label", { width: 512, height: 96 }, scene, true);
    visitorLabelTexture.drawText("관람객 · 176cm", 28, 64, "700 42px Arial", "#272b31", "transparent", true, true);
    visitorLabelTexture.hasAlpha = true;
    const visitorLabelMat = new BABYLON.StandardMaterial("visitor label material", scene);
    visitorLabelMat.diffuseTexture = visitorLabelTexture;
    visitorLabelMat.emissiveColor = BABYLON.Color3.White();
    visitorLabelMat.opacityTexture = visitorLabelTexture;
    visitorLabelMat.backFaceCulling = false;
    const visitorLabel = BABYLON.MeshBuilder.CreatePlane("visitor label", { width: 1.25, height: 0.23 }, scene);
    visitorLabel.position.set(visitorX, 1.98, visitorZ);
    visitorLabel.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    visitorLabel.material = visitorLabelMat;

    if (workMaterials[selected]) workMaterials[selected].emissiveColor = BABYLON.Color3.FromHexString("#f5b700").scale(0.3);
    selectableMeshes.filter((mesh) => mesh.metadata?.id === selected).forEach((mesh) => {
      mesh.enableEdgesRendering();
      mesh.edgesWidth = 5;
      mesh.edgesColor = BABYLON.Color4.FromHexString("#f5b700ff");
    });
    scene.onPointerPick = (_event, pickInfo) => {
      const id = pickInfo?.pickedMesh?.metadata?.id;
      if (id) onSelect(id);
    };

    engine.runRenderLoop(() => scene.render());
    const resize = () => engine.resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      scene.dispose();
      engine.dispose();
    };
  }, [selected, onSelect]);

  return (
    <div className="three-view is-active no-print" id="threeView">
      <canvas ref={canvasRef} id="renderCanvas" aria-label="G09 전시 공간 3D 확인" style={{ touchAction: "none" }} />
      <p>드래그 회전 · 휠 확대 · 작품 클릭</p>
    </div>
  );
}

function Legend({ selected, onSelect }) {
  return (
    <aside className="legend">
      <section>
        <h3>배치 기준</h3>
        <p>이동식 단상 없음. 우측 고정 선반과 기존 목재장 상판을 전시 면으로 사용.</p>
        <div className="visual-key" aria-label="도면 색상 범례"><span className="known">작품 배정</span><span className="selected">선택 위치</span><span className="route">예상 동선</span><span className="power">전기</span></div>
      </section>
      <section>
        <h3>작품 배치</h3>
        <div className="legend-list" id="legendList">
          {works.map((work) => (
            <button key={work.id} type="button" className={`legend-item exhibit-card${selected === work.id ? " is-selected" : ""}`} data-id={work.id} onClick={() => onSelect(work.id)}>
              <span className="legend-index" style={{ background: work.color }}>{work.index}</span>
              <span><strong>{work.title}</strong><small>{work.detail}</small>{work.prep && <small className="personal-prep">{work.prep}</small>}</span>
              <em>{work.size}</em>
            </button>
          ))}
        </div>
      </section>
      <section className="power-key">
        <h3>전기 설비</h3><div className="status-row"><strong>공간 전원</strong><span className="yes">제공됨</span></div>
        <p><strong>전시장 제공</strong> · 벽부 콘센트 2P 15A/125V, 목재장 B 전원, TEL, LAN</p>
      </section>
      <section className="fixture-key">
        <h3>고정물</h3>
        <dl><div><dt>우측 선반</dt><dd>5800 × 450 · H870</dd></div><div><dt>선반 구조</dt><dd>전면부 200 · 개구 900 × 350 · 하부 320</dd></div><div><dt>목재장 A</dt><dd>1500 × 600 · H850</dd></div><div><dt>목재장 B</dt><dd>2450 × 600 · H1000</dd></div><div><dt>고정 파티션</dt><dd>전시 전체 설명 그래픽 설치면</dd></div><div><dt>구조기둥</dt><dd>800 × 800 · 이동 불가</dd></div><div><dt>천장고</dt><dd>CH 2850 · 전기 도면 기준</dd></div></dl>
      </section>
    </aside>
  );
}

export function App() {
  const [view, setView] = useState("plan");
  const [circulation, setCirculation] = useState(true);
  const [electrical, setElectrical] = useState(true);
  const [selected, setSelected] = useState("sunok");

  return (
    <>
      <header className="appbar no-print">
        <div><p>DESIGNART TOKYO 2026 · HIBIYA OKUROJI</p><h1>G09 작품 배치도</h1></div>
        <div className="actions">
          <button className={`tab${view === "plan" ? " is-active" : ""}`} type="button" onClick={() => setView("plan")}>2D 도면</button>
          <button className={`tab${view === "three" ? " is-active" : ""}`} type="button" onClick={() => setView("three")}>3D 공간</button>
          <label className="layer-toggle"><input aria-label="예상 동선" type="checkbox" checked={circulation} onChange={(event) => setCirculation(event.target.checked)} /> 예상 동선</label>
          <label className="layer-toggle"><input aria-label="전기" type="checkbox" checked={electrical} onChange={(event) => setElectrical(event.target.checked)} /> 전기</label>
          <button className="print-button" type="button" onClick={() => window.print()}>A3 PDF 출력</button>
        </div>
      </header>
      <main>
        <section className="sheet">
          <div className="sheet-heading"><div><p className="drawing-no">EXHIBITION LAYOUT · G09 / B-111</p><h2>작품 배치 평면도</h2></div><div className="revision">REV. 23 · 2026.09.19</div></div>
          <div className="sheet-body">
            {view === "plan" ? <Plan circulation={circulation} electrical={electrical} selected={selected} onSelect={setSelected} /> : <ThreeView selected={selected} onSelect={setSelected} />}
            <Legend selected={selected} onSelect={setSelected} />
          </div>
          <footer className="title-block"><div><span>PROJECT</span><strong>DESIGNART TOKYO 2026</strong></div><div><span>SPACE</span><strong>HIBIYA OKUROJI G09 / B-111</strong></div><div><span>DRAWING</span><strong>작품 · 전기 배치 평면도</strong></div><div><span>SCALE</span><strong>1:50 @ A3</strong></div><div><span>AREA / CH</span><strong>55.15㎡ / 2850</strong></div><div><span>STATUS</span><strong>배치 계획안 · 현장 실측 전</strong></div></footer>
        </section>
      </main>
    </>
  );
}
