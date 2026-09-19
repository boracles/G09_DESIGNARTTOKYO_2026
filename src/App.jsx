import { useEffect, useRef, useState } from "react";
import * as BABYLON from "babylonjs";

const works = [
  { id: "sunok", index: "01", color: "#a56b2a", title: "홍선옥 · Code to Coil", detail: "우측 선반 하단 · LED 전원", size: "1450mm", kind: "pending", shelfY: 5925, shelfHeight: 1450 },
  { id: "eunsil", index: "02", color: "#6b8f71", title: "지은실 · Hybrid Nature", detail: "우측 선반 중단 · LED 전원", size: "1450mm", kind: "details", shelfY: 4475, shelfHeight: 1450 },
  { id: "blue-by-jjok", index: "03", color: "#386a8c", title: "권정륜 · 신하진 · Blue by jjok", detail: "우측 선반 상단 2구획 · 공동 설치", size: "2900mm", kind: "details", shelfY: 1575, shelfHeight: 2900 },
  { id: "candle", index: "04", color: "#f26a21", title: "권정현 · Candle", detail: "목재장 B · 3점 + 태블릿 · 전원", size: "900×600", kind: "details" },
  { id: "bora", index: "05", color: "#258b85", title: "윤보라 · 잃어버린 방", detail: "목재장 A · LG 17MT70 · Quest 3 충전 독 · 티백 · 찻잔", size: "1100 × 600mm", kind: "details" },
  { id: "halfchairs", index: "06", color: "#6d50d4", title: "이지우 · Half Chairs", detail: "바닥 설치 · 전기 사용 여부 확인 필요", size: "330×425", kind: "details" },
];

const shelfWorks = ["blue-by-jjok", "eunsil", "sunok"].map((id) => works.find((work) => work.id === id));

function Plan({ circulation, electrical, selected, onSelect }) {
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
          <marker id="dimArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M10 5L0 0V10Z" fill="#515660" />
          </marker>
          <marker id="routeArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" orient="auto">
            <path d="M0 0L10 5L0 10Z" fill="#2563eb" />
          </marker>
        </defs>

        <path className="floor" d="M0 0H7250V9100H2850V5300H0Z" />
        <path className="grid" d="M0 0H7250V9100H2850V5300H0Z" fill="url(#grid500)" />
        <path className="wall" d="M0 0H7250V9100H2850V5300H0V0Z" />
        <path className="inner-wall" d="M120 120H7130V8980H2970V5180H120Z" />

        <g className="fixed" aria-label="움직일 수 없는 기존 집기">
          <rect x="0" y="1500" width="1300" height="3100" />
          <text x="650" y="2920">고정 카운터</text>
          <text x="650" y="3120">W1300 · L3100</text>
          <rect x="1300" y="700" width="800" height="800" className="pillar" />
          <text x="1700" y="1080">구조기둥</text>
          <text x="1700" y="1270">800 × 800</text>
          <rect x="2110" y="975" width="1500" height="600" />
          <text x="2860" y="875">목재장 A · 1500 × 600 · H850</text>
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

        <g className="door">
          <line x1="2850" y1="6720" x2="2850" y2="7920" />
          <line x1="2850" y1="6720" x2="4050" y2="7920" />
          <path d="M2850 6720A1200 1200 0 0 1 4050 7920" />
          <text x="3190" y="8140">출입구 W1200</text>
        </g>

        <g className={`circulation-layer${circulation ? "" : " is-hidden"}`} id="circulationLayer" aria-label="출입구에서 시작하는 예상 관람 동선">
          <path className="circulation-band" d="M2500 7380 C3350 7440 4550 7240 5550 6850 C6050 6660 6250 6200 6250 5650 L6250 3000 C6250 2650 6000 2470 5580 2450 C4750 2410 3970 2470 3260 2600 C2860 2720 2950 3050 3020 3400 C3110 3950 3230 4520 3520 4820 C3820 5060 4220 5070 4460 4900 C4170 5350 3740 5820 3370 6220 C3060 6620 2840 6930 2680 7160" />
          <path className="circulation-line" d="M2500 7380 C3350 7440 4550 7240 5550 6850 C6050 6660 6250 6200 6250 5650 L6250 3000 C6250 2650 6000 2470 5580 2450 C4750 2410 3970 2470 3260 2600 C2860 2720 2950 3050 3020 3400 C3110 3950 3230 4520 3520 4820 C3820 5060 4220 5070 4460 4900 C4170 5350 3740 5820 3370 6220 C3060 6620 2840 6930 2680 7160" markerEnd="url(#routeArrow)" />
          <path className="circulation-direction" d="M4300 7210C4750 7130 5200 6990 5550 6840" markerEnd="url(#routeArrow)" />
          <path className="circulation-direction" d="M6250 5200L6250 4300" markerEnd="url(#routeArrow)" />
          <path className="circulation-direction" d="M5000 2430C4500 2420 4050 2470 3650 2540" markerEnd="url(#routeArrow)" />
          <path className="circulation-direction" d="M3540 4820C3840 5040 4160 5060 4430 4910" markerEnd="url(#routeArrow)" />
          <g className="circulation-label" transform="translate(4400 7600)"><rect x="0" y="0" width="1220" height="310" rx="155" /><text x="610" y="205">예상 관람 동선</text></g>
        </g>

        <g id="shelfAssignments" className="assignments" aria-label="우측 선반 작품 배정">
          {shelfWorks.map((work) => (
            <g
              key={work.id}
              className={`shelf-segment${selected === work.id ? " is-selected" : ""}`}
              tabIndex="0"
              role="button"
              aria-label={`${work.title.split(" · ")[0]}, 우측 선반 ${work.size.replace("mm", "")}밀리미터 구간`}
              data-id={work.id}
              onClick={() => onSelect(work.id)}
              onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect(work.id)}
            >
              <rect x="6840" y={work.shelfY} width="370" height={work.shelfHeight} fill={work.color} />
              <text x="7025" y={work.shelfY + work.shelfHeight / 2 - 55}>{work.index}</text>
              <text className="segment-length" x="7025" y={work.shelfY + work.shelfHeight / 2 + 95}>{work.shelfHeight}</text>
            </g>
          ))}
        </g>

        <g className="cabinet-sharing" aria-label="목재장 B 공유 가능 구간">
          <rect x="4100" y="995" width="775" height="560" /><rect x="5775" y="995" width="775" height="560" />
          <text x="4488" y="1320">공유 가능 · 775</text><text x="6163" y="1320">공유 가능 · 775</text>
        </g>

        <g className={`candle-work${selected === "candle" ? " is-selected" : ""}`} data-id="candle" tabIndex="0" role="button" aria-label="권정현 Candle 기존 목재장 B와 벽면 설치" onClick={() => onSelect("candle")} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect("candle")}>
          <rect className="surface" x="4875" y="995" width="900" height="560" />
          <circle cx="5075" cy="1280" r="82" /><circle cx="5325" cy="1280" r="82" /><circle className="wall-piece" cx="5525" cy="1080" r="82" />
          <rect className="tablet" x="5540" y="1320" width="170" height="110" rx="16" />
          <rect className="caption-bg" x="4460" y="1640" width="1730" height="450" rx="45" />
          <text x="5325" y="1790" textAnchor="middle">04 · 권정현 · Candle</text>
          <text x="5325" y="1990" textAnchor="middle">목재장 B 중앙 · 900 × 600mm · 전원 필요</text>
        </g>

        <g className={`bora-work${selected === "bora" ? " is-selected" : ""}`} data-id="bora" tabIndex="0" role="button" aria-label="윤보라 잃어버린 방 기존 목재장 A 설치" onClick={() => onSelect("bora")} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect("bora")}>
          <rect className="surface" x="2310" y="995" width="1100" height="560" />
          <rect className="monitor" x="2350" y="1035" width="379" height="165" rx="12" />
          <line className="monitor-stand" x1="2539" y1="1200" x2="2585" y2="1280" />
          <g className="charging-dock"><rect x="2810" y="1045" width="500" height="245" rx="45" /><path d="M2920 1170Q3060 1060 3200 1170Q3150 1260 3060 1260Q2970 1260 2920 1170Z" /><circle cx="2875" cy="1165" r="48" /><circle cx="3245" cy="1165" r="48" /></g>
          <rect className="tea-bag" x="2410" y="1340" width="220" height="130" rx="20" /><circle className="tea-cup" cx="3210" cy="1400" r="72" /><circle className="cup-handle" cx="3290" cy="1400" r="34" />
          <rect className="power-strip" x="2720" y="1450" width="350" height="58" rx="24" />
          <rect className="caption-bg" x="2020" y="1640" width="1680" height="450" rx="45" />
          <text x="2860" y="1790" textAnchor="middle">05 · 윤보라 · 잃어버린 방</text>
          <text x="2860" y="1990" textAnchor="middle">가로 1100 × 세로 600mm · 전원 필요</text>
        </g>

        <g className={`floor-work${selected === "halfchairs" ? " is-selected" : ""}`} data-id="halfchairs" tabIndex="0" role="button" aria-label="이지우 Half Chairs 바닥 설치" onClick={() => onSelect("halfchairs")} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect("halfchairs")}>
          <rect x="4100" y="3400" width="330" height="425" />
          <line x1="4265" y1="3400" x2="4740" y2="3110" /><circle cx="4740" cy="3110" r="50" />
          <text x="4850" y="3060">06 · 이지우</text><text x="4850" y="3260">Half Chairs · 330 × 425 × H885</text>
        </g>

        <g className={`electrical-layer${electrical ? "" : " is-hidden"}`} id="electricalLayer" aria-label="전기 및 통신 설비">
          <path className="wiring" d="M220 420H6800V8770" />
          <g className="db" transform="translate(420 310)"><path d="M0 0L330 0L0 150Z" /><text x="170" y="-45">분전반 / 전력 인입</text></g>
          <g className="outlet" transform="translate(210 500)"><circle r="72" /><path d="M-36 0H36M0 0V55" /><text x="110" y="45">2P 15A/125V</text></g>
          <g className="outlet" transform="translate(2100 420)"><circle r="72" /><path d="M-36 0H36M0 0V55" /></g>
          <g className="outlet" transform="translate(3010 5100)"><circle r="72" /><path d="M-36 0H36M0 0V55" /><text x="120" y="-70">2P 15A/125V</text></g>
          <g className="outlet" transform="translate(6880 8720)"><circle r="72" /><path d="M-36 0H36M0 0V55" /><text x="-120" y="-90" textAnchor="end">2P 15A/125V</text></g>
          <g className="counter-ports">
            <g className="outlet" transform="translate(5550 1520)"><circle r="66" /><path d="M-32 0H32M0 0V50" /></g>
            <g className="outlet" transform="translate(5880 1520)"><circle r="66" /><path d="M-32 0H32M0 0V50" /></g>
            <g className="tel" transform="translate(6200 1520)"><circle r="66" /><text y="30">T</text></g>
            <g className="lan" transform="translate(6480 1520)"><circle r="66" /><text y="30">L</text></g>
            <text x="6030" y="720">카운터 전원 · TEL · LAN</text>
          </g>
        </g>

        <g className="dimensions" aria-hidden="true">
          <line x1="0" y1="-430" x2="7250" y2="-430" /><line x1="0" y1="-520" x2="0" y2="-80" /><line x1="7250" y1="-520" x2="7250" y2="-80" /><text x="3625" y="-500">7,250</text>
          <line x1="-430" y1="0" x2="-430" y2="9100" /><line x1="-520" y1="0" x2="-80" y2="0" /><line x1="-520" y1="9100" x2="-80" y2="9100" /><text x="-520" y="4550" transform="rotate(-90 -520 4550)">9,100</text>
          <line x1="-760" y1="0" x2="-760" y2="5300" /><line x1="-850" y1="0" x2="-620" y2="0" /><line x1="-850" y1="5300" x2="-620" y2="5300" /><text x="-850" y="2650" transform="rotate(-90 -850 2650)">5,300</text>
          <line x1="2850" y1="9510" x2="7250" y2="9510" /><line x1="2850" y1="9270" x2="2850" y2="9600" /><line x1="7250" y1="9270" x2="7250" y2="9600" /><text x="5050" y="9710">4,400</text>
          <line x1="6480" y1="1575" x2="6480" y2="7375" /><line x1="6420" y1="1575" x2="6750" y2="1575" /><line x1="6420" y1="7375" x2="6750" y2="7375" /><text x="6340" y="4475" transform="rotate(-90 6340 4475)">5,800</text>
          <line x1="6800" y1="7600" x2="7250" y2="7600" /><text x="7025" y="7800">450</text>
        </g>
        <g className="north-mark" aria-label="도면 방향"><path d="M430 8300L650 8750L430 8650L210 8750Z" /><text x="430" y="8180">N</text></g>
        <g className="scale-bar" aria-label="축척 막대"><rect x="0" y="8800" width="500" height="120" /><rect x="500" y="8800" width="500" height="120" className="open" /><text x="0" y="9160">0</text><text x="500" y="9160">0.5</text><text x="1000" y="9160">1m</text></g>
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

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI * 0.72, Math.PI * 0.25, 14.2, new BABYLON.Vector3(3.75, 0.8, 4.55), scene);
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

    const box = (name, width, height, depth, x, y, z, mat, id) => {
      const mesh = BABYLON.MeshBuilder.CreateBox(name, { width, height, depth }, scene);
      mesh.position.set(x, y, z);
      mesh.material = mat;
      mesh.metadata = id ? { id } : null;
      mesh.isPickable = Boolean(id);
      return mesh;
    };

    box("upper floor", 7.25, 0.08, 5.3, 3.625, -0.04, 2.65, floorMat);
    box("lower floor", 4.4, 0.08, 3.8, 5.05, -0.04, 7.2, floorMat);
    const wallHeight = 2.85;
    const t = 0.12;
    box("top wall", 7.25, wallHeight, t, 3.625, wallHeight / 2, 0, wallMat);
    box("right wall", t, wallHeight, 9.1, 7.25, wallHeight / 2, 4.55, wallMat);
    box("bottom wall", 4.4, wallHeight, t, 5.05, wallHeight / 2, 9.1, wallMat);
    box("inner vertical", t, wallHeight, 3.8, 2.85, wallHeight / 2, 7.2, wallMat);
    box("inner horizontal", 2.85, wallHeight, t, 1.425, wallHeight / 2, 5.3, wallMat);
    box("left wall", t, wallHeight, 5.3, 0, wallHeight / 2, 2.65, wallMat);
    box("counter", 1.3, 0.95, 2.1, 1.05, 0.475, 3.1, fixtureMat);
    box("pillar", 0.8, 0.95, 0.8, 1.7, 0.475, 1.8, fixtureMat);
    box("cabinet A", 1.5, 0.85, 0.6, 2.86, 0.425, 1.275, fixtureMat);
    box("cabinet B", 2.45, 1.0, 0.6, 5.325, 0.5, 1.275, fixtureMat);

    const workMaterials = Object.fromEntries(works.map((work) => [work.id, material(work.id, work.color)]));
    box("shelf upper", 0.45, 0.12, 2.9, 7.025, 0.87, 3.025, workMaterials["blue-by-jjok"], "blue-by-jjok");
    box("shelf middle", 0.45, 0.12, 1.45, 7.025, 0.87, 5.2, workMaterials.eunsil, "eunsil");
    box("shelf lower", 0.45, 0.12, 1.45, 7.025, 0.87, 6.65, workMaterials.sunok, "sunok");
    box("candle surface", 0.9, 0.08, 0.56, 5.325, 1.04, 1.275, workMaterials.candle, "candle");
    [[5.075, 1.20], [5.325, 1.28], [5.525, 1.08]].forEach(([x, z], index) => box(`candle ${index + 1}`, 0.09, 0.2 + index * 0.04, 0.09, x, 1.17 + index * 0.02, z, workMaterials.candle, "candle"));
    box("candle tablet", 0.17, 0.13, 0.08, 5.625, 1.16, 1.42, material("tablet", "#22252b"), "candle");
    box("bora surface", 1.1, 0.08, 0.56, 2.86, 0.89, 1.275, workMaterials.bora, "bora");
    box("bora monitor", 0.379, 0.36, 0.08, 2.54, 1.11, 1.09, material("monitor", "#22252b"), "bora");
    box("bora charging dock", 0.5, 0.14, 0.245, 3.06, 1.03, 1.17, workMaterials.bora, "bora");
    box("bora tea bag", 0.22, 0.07, 0.13, 2.52, 1.0, 1.40, material("tea", "#d6b06b"), "bora");
    box("chair seat", 0.33, 0.1, 0.425, 4.265, 0.46, 3.61, workMaterials.halfchairs, "halfchairs");
    box("chair back", 0.33, 0.78, 0.1, 4.265, 0.88, 3.78, workMaterials.halfchairs, "halfchairs");

    if (workMaterials[selected]) workMaterials[selected].emissiveColor = BABYLON.Color3.FromHexString(works.find((work) => work.id === selected).color).scale(0.28);
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
        <p>이동식 단상 없음. 우측 고정 선반과 기존 목재장 상판을 전시 면으로 사용한다.</p>
        <div className="visual-key" aria-label="도면 색상 범례"><span className="known">설치 정보 있음</span><span className="pending">정보 대기</span><span className="route">예상 동선</span><span className="power">전기</span></div>
      </section>
      <section>
        <h3>작품 배치 · 관람 순서</h3>
        <div className="legend-list" id="legendList">
          {works.map((work) => (
            <button key={work.id} type="button" className={`legend-item ${work.kind === "pending" ? "is-pending" : "has-details"}${selected === work.id ? " is-selected" : ""}`} data-id={work.id} onClick={() => onSelect(work.id)}>
              <span className="legend-index" style={{ background: work.color }}>{work.index}</span>
              <span><strong>{work.title}</strong><small>{work.detail}</small></span>
              <em>{work.size}</em>
            </button>
          ))}
        </div>
        <p className="small-note">번호는 출입구 → 우측 선반 하단부터 상단 → 목재장 B → 목재장 A → 중앙 작품 → 출구 순서.</p>
      </section>
      <section className="power-key">
        <h3>전기 제공</h3><div className="status-row"><strong>공간 전원</strong><span className="yes">제공 있음</span></div>
        <p><strong>전시장 제공</strong> · 벽부 콘센트 2P 15A/125V, 카운터 전원, TEL, LAN</p>
        <p className="warning"><strong>개별 준비</strong> · 멀티탭, PD 충전기, Quest 3 충전 독 어댑터, 전원·영상 케이블</p>
      </section>
      <section className="fixture-key">
        <h3>고정물</h3>
        <dl><div><dt>우측 선반</dt><dd>5800 × 450 · H870</dd></div><div><dt>선반 구조</dt><dd>전면부 200 · 개구 900 × 350 · 하부 320</dd></div><div><dt>목재장 A</dt><dd>1500 × 600 · H850</dd></div><div><dt>목재장 B</dt><dd>2450 × 600 · H1000</dd></div><div><dt>구조기둥</dt><dd>800 × 800 · 이동 불가</dd></div><div><dt>천장고</dt><dd>CH 2850 · 전기 도면 기준</dd></div></dl>
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
          <div className="sheet-heading"><div><p className="drawing-no">EXHIBITION LAYOUT · G09 / B-111</p><h2>작품 배치 평면도</h2></div><div className="revision">REV. 05 · 2026.09.19</div></div>
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
