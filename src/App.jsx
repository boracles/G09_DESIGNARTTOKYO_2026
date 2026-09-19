import { useEffect, useRef, useState } from "react";
import * as BABYLON from "babylonjs";

const works = [
  { id: "candle", index: "A", color: "#f26a21", title: "권정현 · Candle 3점 + 태블릿", detail: "전기 제공 · 현장 통전 확인", size: "1200mm" },
  { id: "bora", index: "B", color: "#258b85", title: "윤보라 · 내면기상관측소", detail: "목재장 A · 착석형 MR · 전원 + LAN", size: "1200×600" },
  { id: "hajin", index: "C", color: "#317db7", title: "신하진 · 작품 정보 대기", detail: "우측 선반 · 전기 미확정", size: "1150mm" },
  { id: "jungryun", index: "D", color: "#b05d89", title: "권정륜 · 작품 정보 대기", detail: "우측 선반 · 전기 미확정", size: "1150mm" },
  { id: "eunsil", index: "E", color: "#b98424", title: "지은실 · 작품 정보 대기", detail: "우측 선반 · 전기 미확정", size: "1150mm" },
  { id: "sunok", index: "F", color: "#617c6b", title: "홍선옥 · 작품 정보 대기", detail: "우측 선반 · 전기 미확정", size: "1150mm" },
  { id: "halfchairs", index: "G", color: "#6d50d4", title: "이지우 · Half Chairs", detail: "바닥 설치 · 전기 불필요(가정)", size: "330×425" },
];

const shelfWorks = works.filter((work) => ["candle", "hajin", "jungryun", "eunsil", "sunok"].includes(work.id));

function Plan({ electrical, selected, onSelect }) {
  const segmentY = [1575, 2775, 3925, 5075, 6225];
  const segmentHeight = [1200, 1150, 1150, 1150, 1150];

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
          <text x="2860" y="1235">기존 목재장 A</text>
          <text x="2860" y="1430">1500 × 600 · H850</text>
          <rect x="4100" y="975" width="2450" height="600" />
          <text x="5325" y="1235">기존 목재장 B</text>
          <text x="5325" y="1430">2450 × 600 · H1000</text>
          <rect x="6800" y="1575" width="450" height="5800" className="shelf-base" />
          <text className="rotated-label" x="7040" y="4475">고정 벽면 선반 · 5800 × 450 · 상판 H870</text>
          <rect x="2760" y="5050" width="90" height="1400" className="mirror" />
          <text x="2640" y="5750" transform="rotate(-90 2640 5750)">고정 거울</text>
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

        <g id="shelfAssignments" className="assignments" aria-label="우측 선반 작품 배정">
          {shelfWorks.map((work, index) => (
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
              <rect x="6840" y={segmentY[index]} width="370" height={segmentHeight[index]} fill={work.color} />
              <text x="7025" y={segmentY[index] + 545}>{work.index}</text>
              <text className="segment-length" x="7025" y={segmentY[index] + 695}>{work.size.replace("mm", "")}</text>
            </g>
          ))}
        </g>

        <g className={`bora-work${selected === "bora" ? " is-selected" : ""}`} data-id="bora" tabIndex="0" role="button" aria-label="윤보라 내면기상관측소 기존 목재장 A 설치" onClick={() => onSelect("bora")} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect("bora")}>
          <rect className="surface" x="2250" y="1000" width="1200" height="550" />
          <rect className="monitor" x="2700" y="1050" width="360" height="90" />
          <circle className="hmd" cx="2450" cy="1275" r="95" />
          <rect className="seat" x="2600" y="1850" width="500" height="500" rx="70" />
          <line x1="3100" y1="2100" x2="3900" y2="2250" /><circle cx="3900" cy="2250" r="50" />
          <text x="4010" y="2200">B · 윤보라 · 내면기상관측소</text>
          <text x="4010" y="2400">착석형 MR · 기존 목재장 A 활용</text>
          <text x="4010" y="2590">1200 × 600 테이블 · 전원 + LAN 필요</text>
        </g>

        <g className={`floor-work${selected === "halfchairs" ? " is-selected" : ""}`} data-id="halfchairs" tabIndex="0" role="button" aria-label="이지우 Half Chairs 바닥 설치" onClick={() => onSelect("halfchairs")} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect("halfchairs")}>
          <rect x="4660" y="8030" width="330" height="425" />
          <line x1="4825" y1="8030" x2="5480" y2="7740" /><circle cx="5480" cy="7740" r="50" />
          <text x="5590" y="7710">G · 이지우</text><text x="5590" y="7910">Half Chairs · 330 × 425 × H885</text>
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
            <text x="6030" y="1780">카운터 전원 · TEL · LAN</text>
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

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI * 0.72, Math.PI * 0.34, 14.2, new BABYLON.Vector3(3.75, 0.8, 4.55), scene);
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
    box("cabinet A", 1.5, 0.85, 0.6, 2.6, 0.425, 2.15, fixtureMat);
    box("cabinet B", 2.45, 1.0, 0.6, 4.55, 0.5, 1.85, fixtureMat);

    const workMaterials = Object.fromEntries(works.map((work) => [work.id, material(work.id, work.color)]));
    [2.0, 2.18, 2.36].forEach((z, index) => box(`candle ${index + 1}`, 0.08, 0.25 + index * 0.04, 0.08, 6.88, 1.05 + index * 0.02, z, workMaterials.candle, "candle"));
    box("bora table", 1.2, 0.12, 0.6, 2.85, 0.92, 1.3, workMaterials.bora, "bora");
    box("bora monitor", 0.36, 0.36, 0.08, 2.85, 1.16, 1.17, workMaterials.bora, "bora");
    box("chair seat", 0.33, 0.1, 0.425, 6.4, 0.46, 4.9, workMaterials.halfchairs, "halfchairs");
    box("chair back", 0.33, 0.78, 0.1, 6.4, 0.88, 5.08, workMaterials.halfchairs, "halfchairs");

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
      <section><h3>배치 기준</h3><p>이동식 단상 없음. 우측 고정 선반과 기존 목재장 상판을 전시 면으로 사용한다.</p></section>
      <section>
        <h3>우측 선반 / 바닥 배정</h3>
        <div className="legend-list" id="legendList">
          {works.map((work) => (
            <button key={work.id} type="button" className={`legend-item${selected === work.id ? " is-selected" : ""}`} data-id={work.id} onClick={() => onSelect(work.id)}>
              <span className="legend-index" style={{ background: work.color }}>{work.index}</span>
              <span><strong>{work.title}</strong><small>{work.detail}</small></span>
              <em>{work.size}</em>
            </button>
          ))}
        </div>
        <p className="small-note">가배정은 작품 치수 제출 후 교환·통합 가능.</p>
      </section>
      <section className="power-key">
        <h3>전기 제공</h3><div className="status-row"><strong>공간 전원</strong><span className="yes">제공 있음</span></div>
        <p>벽부 콘센트 2P 15A/125V, 카운터 전원, TEL, LAN이 도면에 표시됨.</p>
        <p className="warning">권정현 태블릿: 상단 선반 구간 배정. 연장선 길이와 실제 통전은 현장 확인.</p>
      </section>
      <section className="fixture-key">
        <h3>고정물</h3>
        <dl><div><dt>우측 선반</dt><dd>5800 × 450 · H870</dd></div><div><dt>목재장 A</dt><dd>1500 × 600 · H850</dd></div><div><dt>목재장 B</dt><dd>2450 × 600 · H1000</dd></div><div><dt>구조기둥</dt><dd>800 × 800 · 이동 불가</dd></div><div><dt>천장고</dt><dd>CH 2850 · 전기 도면 기준</dd></div></dl>
      </section>
      <section className="print-guide"><h3>PDF 출력</h3><p>A3 가로 · 배율 100% · 머리글/바닥글 끔</p><p className="warning">도면 축척 1:50. 출력 후 1m 막대가 20mm인지 확인.</p></section>
    </aside>
  );
}

export function App() {
  const [view, setView] = useState("plan");
  const [electrical, setElectrical] = useState(true);
  const [selected, setSelected] = useState("candle");

  return (
    <>
      <header className="appbar no-print">
        <div><p>DESIGNART TOKYO 2026 · HIBIYA OKUROJI</p><h1>G09 작품 배치도</h1></div>
        <div className="actions">
          <button className={`tab${view === "plan" ? " is-active" : ""}`} type="button" onClick={() => setView("plan")}>2D 도면</button>
          <button className={`tab${view === "three" ? " is-active" : ""}`} type="button" onClick={() => setView("three")}>3D 공간</button>
          <label className="layer-toggle"><input aria-label="전기" type="checkbox" checked={electrical} onChange={(event) => setElectrical(event.target.checked)} /> 전기</label>
          <button className="print-button" type="button" onClick={() => window.print()}>A3 PDF 출력</button>
        </div>
      </header>
      <main>
        <section className="sheet">
          <div className="sheet-heading"><div><p className="drawing-no">EXHIBITION LAYOUT · G09 / B-111</p><h2>작품 배치 평면도</h2></div><div className="revision">REV. 02 · 2026.09.19</div></div>
          <div className="sheet-body">
            {view === "plan" ? <Plan electrical={electrical} selected={selected} onSelect={setSelected} /> : <ThreeView selected={selected} onSelect={setSelected} />}
            <Legend selected={selected} onSelect={setSelected} />
          </div>
          <footer className="title-block"><div><span>PROJECT</span><strong>DESIGNART TOKYO 2026</strong></div><div><span>SPACE</span><strong>HIBIYA OKUROJI G09 / B-111</strong></div><div><span>DRAWING</span><strong>작품 · 전기 배치 평면도</strong></div><div><span>SCALE</span><strong>1:50 @ A3</strong></div><div><span>AREA / CH</span><strong>55.15㎡ / 2850</strong></div><div><span>STATUS</span><strong>가배정 · 현장 실측 전</strong></div></footer>
        </section>
      </main>
    </>
  );
}
