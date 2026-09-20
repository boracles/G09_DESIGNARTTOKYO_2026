import { useEffect, useRef, useState } from "react";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

const works = [
  { id: "sunok", index: "01", zone: "하단 1/2", color: "#b5477b", title: "홍선옥 · Code to Coil", detail: "우측 선반 · 하단 절반", size: "가로 2900 × 세로 450mm", shelfY: 4475, shelfHeight: 2900 },
  { id: "eunsil", index: "02", zone: "상단 1/2", color: "#6b8f71", title: "지은실 · Hybrid Nature", detail: "우측 선반 · 상단 절반", size: "가로 2900 × 세로 450mm", shelfY: 1575, shelfHeight: 2900 },
  { id: "candle", index: "03", color: "#f26a21", title: "권정현 · Candle", detail: "목재장 B · 3점 + 태블릿 · 전원", prep: "개별 준비 · 멀티탭", size: "가로 900 × 세로 600mm" },
  { id: "bora", index: "04", color: "#258b85", title: "윤보라 · 잃어버린 방", detail: "LG 17MT70 · Quest 3 · 충전 독 · 티백 · 찻잔", prep: "개별 준비 · 멀티탭 · PD 충전기 · 충전 독 어댑터 · 전원·영상 케이블", size: "목재장 A 폭 기준 · VR 동작 구역 1500 × 1500mm" },
  { id: "blue-by-jjok", index: "05", color: "#386a8c", title: "권정륜 · 신하진 · Blue by jjok", detail: "외부 조망 유리벽 앞 · 바닥 자립 2점", prep: "패널 H2500 · 프레임 H720 2점 · 적층 큐브 H1000", size: "패널 W700 · 프레임 W420/W520mm" },
  { id: "halfchairs", index: "06", color: "#6d50d4", title: "이지우 · Half Chairs", detail: "중앙 우측 · 관람 동선 사이 바닥 설치", size: "가로 330 × 세로 425 × 높이 885mm" },
];

const shelfWorks = ["eunsil", "sunok"].map((id) => works.find((work) => work.id === id));

const selectionBounds = {
  "blue-by-jjok": { x: 4050, y: 7850, width: 2530, height: 900 },
  eunsil: { x: 6664, y: 1599, width: 407, height: 2852 },
  sunok: { x: 6664, y: 4499, width: 407, height: 2852 },
  candle: { x: 5153, y: 1128, width: 900, height: 560 },
  bora: { x: 2353, y: 1105, width: 1524, height: 2130 },
  halfchairs: { x: 4500, y: 4250, width: 800, height: 900 },
};

function Plan({ circulation, electrical, selected, onSelect, onOpen3D }) {
  const selectedBounds = selectionBounds[selected];
  return (
    <div className="drawing-wrap" id="planView">
      <button className="canvas-3d-cta no-print" type="button" onClick={onOpen3D}>
        <span>공간을 입체로 확인하세요</span>
        <strong>3D 공간 열기</strong>
      </button>
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

        <image className="source-plan-vector" href={import.meta.env.BASE_URL + "assets/g09-plan-vector.svg"} x="-1100" y="-700" width="9500" height="10600" preserveAspectRatio="xMidYMid meet" />

        <g className="structural-walls" aria-label="검정 실선 구조 벽체">
          <path d="M0 5300V0H7250V9100" />
          <line x1="0" y1="5300" x2="2850" y2="5300" />
          <line x1="2850" y1="5300" x2="2850" y2="6720" />
          <line x1="2850" y1="7920" x2="2850" y2="8870" />
        </g>
        <rect className="partition-wall-solid" x="2186" y="1859" width="55" height="3322" aria-label="고정 파티션 벽체" />

        <path className="floor manual-plan-geometry" d="M0 0H7250V9100H2850V5300H0Z" />
        <path className="grid manual-plan-geometry" d="M0 0H7250V9100H2850V5300H0Z" fill="url(#grid500)" />
        <path className="wall manual-plan-geometry" d="M0 0H7250V9100H2850V5300H0V0Z" />
        <path className="inner-wall manual-plan-geometry" d="M120 120H7130V8980H2970V5180H120Z" />

        <g className="fixed manual-plan-geometry" aria-label="움직일 수 없는 기존 집기">
          <rect className="storage-zone" x="100" y="1500" width="2200" height="3800" />
          {[1500, 2450, 3400, 4350].map((y) => <rect key={`left-storage-${y}`} className="storage-shelf" x="100" y={y} width="450" height="950" />)}
          {[2450, 3400, 4350].map((y) => <rect key={`partition-storage-${y}`} className="storage-shelf" x="1850" y={y} width="450" height="950" />)}
          <rect className="partition-face" x="2186" y="1859" width="55" height="3322" />
          <text className="storage-label" x="1200" y="3900">파티션 뒤</text>
          <text className="storage-label" x="1200" y="4140">짐 보관 가능 공간</text>
          <text className="storage-label" x="1200" y="4380">H2850</text>
          <g className="storage-dimensions" aria-label="파티션 뒤 기존 선반 치수">
            <line x1="550" y1="1830" x2="1850" y2="1830" /><line x1="550" y1="1765" x2="550" y2="1895" /><line x1="1850" y1="1765" x2="1850" y2="1895" /><text x="1200" y="1760">1300</text>
            <line x1="1420" y1="255" x2="1420" y2="5300" /><line x1="1355" y1="255" x2="1485" y2="255" /><line x1="1355" y1="5300" x2="1485" y2="5300" /><text x="1350" y="2778" transform="rotate(-90 1350 2778)">5045</text>
            <line x1="1660" y1="300" x2="1660" y2="3400" /><line x1="1595" y1="300" x2="1725" y2="300" /><line x1="1595" y1="3400" x2="1725" y2="3400" /><text x="1590" y="1850" transform="rotate(-90 1590 1850)">3100</text>
            <line x1="1660" y1="3400" x2="1660" y2="5300" /><line x1="1595" y1="5300" x2="1725" y2="5300" /><text x="1590" y="4350" transform="rotate(-90 1590 4350)">1900</text>
          </g>
          <rect x="1550" y="875" width="800" height="800" className="pillar" />
          <text x="1950" y="1255">구조기둥</text>
          <text x="1950" y="1445">800 × 800</text>
          <rect x="2350" y="975" width="1500" height="600" />
          <text className="cabinet-label" x="3100" y="680">목재장 A</text>
          <text className="cabinet-label" x="3100" y="850">1500 × 600 · H850</text>
          <rect x="4575" y="975" width="2000" height="600" />
          <path className="cabinet-corner" d="M6575 975H6800V1575H6575V1420L6705 1290L6575 1160Z" />
          <text x="5800" y="875">목재장 B · 2450 × 600 · H1000</text>
          <rect x="6800" y="120" width="450" height="1455" className="shelf-base shelf-return" />
          <rect x="6800" y="1575" width="450" height="5800" className="shelf-base" />
          <text className="rotated-label" x="7040" y="4475">수납형 고정 선반 · 5800 × 450 · H870</text>
          <rect x="2925" y="5300" width="45" height="1250" className="mirror" />
          <text x="3130" y="5925" transform="rotate(-90 3130 5925)">고정 거울</text>
          <rect x="7168" y="7610" width="70" height="1250" className="intro-graphic-plan" />
          <text className="intro-graphic-label" x="6960" y="8235" transform="rotate(-90 6960 8235)">전시 설명 현수막 · 선반 끝 빈 벽</text>
        </g>

        <g className="context-pillars manual-plan-geometry" aria-label="외부 구조기둥">
          <rect x="1550" y="5525" width="800" height="800" />
          <rect x="7480" y="875" width="800" height="800" />
          <rect x="7480" y="5525" width="800" height="800" />
          <text x="1950" y="5935">0.8</text><text x="7880" y="1285">0.8</text><text x="7880" y="5935">0.8</text>
        </g>

        <g className="glass-wall-plan manual-plan-geometry" aria-label="외부 조망 유리벽">
          <line x1="2850" y1="9040" x2="7250" y2="9040" />
          <line x1="2850" y1="9090" x2="7250" y2="9090" />
          <text x="5050" y="8920">외부 조망 유리벽</text>
        </g>

        <g className="door manual-plan-geometry" aria-label="고정 유리와 여닫이 유리문으로 구성된 폭 1200밀리미터 출입구">
          <line className="door-opening" x1="2850" y1="6720" x2="2850" y2="7920" />
          <line className="door-jamb" x1="2805" y1="6720" x2="2895" y2="6720" />
          <line className="door-jamb" x1="2805" y1="7920" x2="2895" y2="7920" />
          <circle className="door-hinge" cx="2850" cy="6720" r="34" />
          <line className="door-leaf" x1="2850" y1="6720" x2="4050" y2="6720" />
          <path className="door-swing" d="M2850 7920A1200 1200 0 0 1 4050 6720" />
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
              <rect x="6640" y={work.shelfY} width="455" height={work.shelfHeight} fill={work.color} />
              <text className="segment-zone" x="6867" y={work.shelfY + 235}>{work.zone}</text>
              <text className="segment-length" x="6867" y={work.shelfY + 430}>2900</text>
              <text className="segment-depth" x="6867" y={work.shelfY + 595}>× 450</text>
              <text className="segment-name" x="6867" y={work.shelfY + work.shelfHeight / 2} transform={`rotate(-90 6867 ${work.shelfY + work.shelfHeight / 2})`}>{work.index} · {work.title}</text>
            </g>
          ))}
        </g>

        <g className={`blue-work${selected === "blue-by-jjok" ? " is-selected" : ""}`} data-id="blue-by-jjok" tabIndex="0" role="button" aria-label="권정륜 신하진 Blue by jjok, 외부 조망 유리벽 앞 바닥 자립형 2점" onClick={() => onSelect("blue-by-jjok")} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect("blue-by-jjok")}>
          <text className="work-label" x="4070" y="7550">05 · 권정륜 · 신하진</text>
          <text className="work-detail" x="4070" y="7720">문 회전 반경 밖 · 벽에서 이격 · 3점 균등 배치</text>
          <rect className="installation-envelope" x="4050" y="7850" width="2530" height="900" rx="32" />
          <rect className="stacked-cube" x="4120" y="8010" width="460" height="460" />
          <rect className="stacked-cube stacked-cube-top" x="4220" y="7930" width="460" height="460" />
          <rect className="panel" x="4950" y="8580" width="700" height="70" />
          <rect className="panel" x="5850" y="8580" width="700" height="70" />
          <rect className="module module-a" x="5090" y="7950" width="420" height="520" />
          <rect className="module module-b" x="5940" y="7950" width="520" height="520" />
          <line x1="5090" y1="7950" x2="5510" y2="8470" />
          <line x1="5510" y1="7950" x2="5090" y2="8470" />
          <line x1="5940" y1="7950" x2="6460" y2="8470" />
          <line x1="6460" y1="7950" x2="5940" y2="8470" />
        </g>

        <g className="cabinet-sharing" aria-label="목재장 B 공유 가능 구간">
          <rect x="4603" y="1128" width="550" height="560" /><rect x="6053" y="1128" width="550" height="560" />
          <text x="4878" y="1453">공유 가능 · 550</text><text x="6328" y="1453">공유 가능 · 550</text>
        </g>

        <g className={`candle-work${selected === "candle" ? " is-selected" : ""}`} data-id="candle" tabIndex="0" role="button" aria-label="권정현 Candle 기존 목재장 B와 벽면 설치" onClick={() => onSelect("candle")} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect("candle")}>
          <rect className="surface" x="5153" y="1128" width="900" height="560" />
          <rect className="display-wall" x="5168" y="1143" width="480" height="42" />
          <circle className="wall-piece" cx="5288" cy="1223" r="82" />
          <circle cx="5353" cy="1413" r="82" /><circle cx="5603" cy="1413" r="82" />
          <rect className="tablet" x="5818" y="1453" width="170" height="110" rx="16" />
          <text className="work-label" x="5603" y="2075" textAnchor="middle">03 · 권정현 · Candle</text>
          <text className="work-detail" x="5603" y="2240" textAnchor="middle">목재장 B 직선부 중앙 · 900 × 600mm · 전원</text>
        </g>

        <g className={`bora-work${selected === "bora" ? " is-selected" : ""}`} data-id="bora" tabIndex="0" role="button" aria-label="윤보라 잃어버린 방 기존 목재장 A 설치" onClick={() => onSelect("bora")} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect("bora")}>
          <rect className="roomscale-zone" x="2365" y="1735" width="1500" height="1500" rx="50" />
          <text className="roomscale-label" x="3115" y="3055" textAnchor="middle">VR 동작 구역 1500 × 1500</text>
          <rect className="surface" x="2565" y="1128" width="1100" height="560" />
          <rect className="monitor" x="2605" y="1168" width="379" height="165" rx="12" />
          <line className="monitor-stand" x1="2794" y1="1333" x2="2840" y2="1413" />
          <g className="charging-dock"><rect x="2925" y="1423" width="500" height="230" rx="45" /><path d="M3035 1543Q3175 1433 3315 1543Q3265 1633 3175 1633Q3085 1633 3035 1543Z" /><circle cx="2990" cy="1538" r="48" /><circle cx="3360" cy="1538" r="48" /></g>
          <rect className="tea-bag" x="3045" y="1173" width="220" height="130" rx="20" /><circle className="tea-cup" cx="3485" cy="1238" r="72" /><circle className="cup-handle" cx="3565" cy="1238" r="34" />
          <rect className="power-strip" x="2975" y="1338" width="350" height="58" rx="24" />
          <text className="work-label" x="3115" y="1913" textAnchor="middle">04 · 윤보라 · 잃어버린 방</text>
          <text className="work-detail" x="3115" y="2103" textAnchor="middle">가로 1100 × 세로 600mm · 전원</text>
        </g>

        <g className={`floor-work${selected === "halfchairs" ? " is-selected" : ""}`} data-id="halfchairs" tabIndex="0" role="button" aria-label="이지우 Half Chairs 바닥 설치" onClick={() => onSelect("halfchairs")} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onSelect("halfchairs")}>
          <rect className="floor-zone" x="4500" y="4250" width="800" height="900" rx="34" />
          <rect className="chair-footprint" x="4735" y="4488" width="330" height="425" />
          <text className="work-label" x="4900" y="5375" textAnchor="middle">06 · 이지우</text>
          <text className="work-title" x="4900" y="5550" textAnchor="middle">Half Chairs</text>
          <text className="work-detail" x="4900" y="5715" textAnchor="middle">바닥 구획 800 × 900</text>
        </g>

        <g className="staff-station" aria-label="전시 지킴이 2인 분리 배치">
          <g aria-label="거울 앞 전시 지킴이 자리">
            <rect className="staff-zone" x="3100" y="5600" width="700" height="650" rx="34" />
            <rect className="staff-seat" x="3275" y="5830" width="350" height="350" rx="28" /><line x1="3275" y1="5830" x2="3625" y2="6180" /><line x1="3625" y1="5830" x2="3275" y2="6180" />
            <text x="3450" y="5740" textAnchor="middle">전시 지킴이 A</text>
          </g>
          <g aria-label="목재장 사이 전시 지킴이 자리">
            <rect className="staff-zone" x="3915" y="280" width="650" height="650" rx="34" />
            <rect className="staff-seat" x="4065" y="430" width="350" height="350" rx="28" /><line x1="4065" y1="430" x2="4415" y2="780" /><line x1="4415" y1="430" x2="4065" y2="780" />
            <text x="4240" y="900" textAnchor="middle">전시 지킴이 B</text>
          </g>
        </g>

        <g className={`electrical-layer${electrical ? "" : " is-hidden"}`} id="electricalLayer" aria-label="전기 및 통신 설비">
          <path className="wiring" d="M220 420H6800V8770" />
          <g className="db" transform="translate(420 310)"><path d="M0 0L330 0L0 150Z" /><text x="170" y="-45">분전반 / 전력 인입</text></g>
          <g className="outlet" transform="translate(210 500)"><circle r="72" /><path d="M-36 0H36M0 0V55" /><text x="110" y="45">2P 15A/125V</text></g>
          <g className="outlet" transform="translate(2100 420)"><circle r="72" /><path d="M-36 0H36M0 0V55" /><text className="outlet-caption" y="-115" textAnchor="middle">콘센트</text></g>
          <g className="outlet" transform="translate(3010 5100)"><circle r="72" /><path d="M-36 0H36M0 0V55" /><text x="-120" y="-105" textAnchor="end">2P 15A/125V</text></g>
          <g className="outlet" transform="translate(6880 8720)"><circle r="72" /><path d="M-36 0H36M0 0V55" /><text x="-120" y="-90" textAnchor="end">2P 15A/125V</text><text className="outlet-caption" x="-120" y="65" textAnchor="end">콘센트</text></g>
          <g className="counter-ports">
            <g className="outlet emphasized" transform="translate(5325 1775)"><circle className="outlet-halo" r="104" /><circle r="66" /><path d="M-32 0H32M0 0V50" /><text className="port-caption" y="175">콘센트</text></g>
            <g className="outlet emphasized" transform="translate(5675 1775)"><circle className="outlet-halo" r="104" /><circle r="66" /><path d="M-32 0H32M0 0V50" /><text className="port-caption" y="175">콘센트</text></g>
            <g className="tel" transform="translate(6075 1775)"><circle r="66" /><text y="30">T</text><text className="port-caption" y="175">TEL</text></g>
            <g className="lan" transform="translate(6425 1775)"><circle r="66" /><text y="30">L</text><text className="port-caption" y="175">LAN</text></g>
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
        <g className="fixture-dimensions" aria-label="원도면 상단 연속 치수">
          <line x1="1340" y1="560" x2="2350" y2="560" /><line x1="1340" y1="515" x2="1340" y2="610" /><line x1="2350" y1="515" x2="2350" y2="610" /><text x="1845" y="500">1010</text>
          <line x1="2350" y1="560" x2="3850" y2="560" /><line x1="3850" y1="515" x2="3850" y2="610" /><text x="3100" y="500">1500</text>
          <line x1="3850" y1="560" x2="4576" y2="560" /><line x1="4576" y1="515" x2="4576" y2="610" /><text x="4213" y="500">726</text>
          <line x1="4576" y1="560" x2="6576" y2="560" /><line x1="6576" y1="515" x2="6576" y2="610" /><text x="5576" y="500">2000</text>
          <line x1="6800" y1="560" x2="7250" y2="560" /><line x1="6800" y1="515" x2="6800" y2="610" /><line x1="7250" y1="515" x2="7250" y2="610" /><text x="7025" y="500">450</text>
          <line x1="3970" y1="0" x2="3970" y2="975" /><line x1="3925" y1="0" x2="4015" y2="0" /><line x1="3925" y1="975" x2="4015" y2="975" /><text x="3900" y="488" transform="rotate(-90 3900 488)">975</text>
        </g>
        <g className="source-plan-labels" aria-label="원도면 주요 치수와 고정물 명칭">
          <text x="3100" y="850">목재장 A · 1500 × 600 · H850</text><text x="5575" y="850">목재장 B · 2000 + 반환 450 · H1000</text>
        </g>
        <g className="north-mark" aria-label="도면 방향"><path d="M430 8300L650 8750L430 8650L210 8750Z" /><text x="430" y="8180">N</text></g>
        <g className="scale-bar" aria-label="축척 막대"><rect x="0" y="8800" width="500" height="120" /><rect x="500" y="8800" width="500" height="120" className="open" /><text x="0" y="9160">0</text><text x="500" y="9160">0.5</text><text x="1000" y="9160">1m</text></g>
        {selectedBounds && <g className="selection-overlay" aria-hidden="true"><rect {...selectedBounds} className="selection-halo" /><rect {...selectedBounds} className="selection-outline" /></g>}
      </svg>
    </div>
  );
}

function ThreeView({ selected, onSelect, onOpen2D }) {
  const canvasRef = useRef(null);
  const focusRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }, true);
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.93, 0.94, 0.95, 1);
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, 0.62, 17.5, new BABYLON.Vector3(3.625, 0.25, 4.6), scene);
    camera.attachControl(true, true, 2);
    camera.lowerRadiusLimit = 2.2;
    camera.upperRadiusLimit = 24;
    camera.wheelPrecision = 42;
    camera.panningSensibility = 900;
    camera.panningInertia = 0.86;
    camera.pinchToPanMaxDistance = 24;
    const preventContextMenu = (event) => event.preventDefault();
    canvas.addEventListener("contextmenu", preventContextMenu);

    const hemi = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    hemi.intensity = 0.9;
    const key = new BABYLON.DirectionalLight("key", new BABYLON.Vector3(-0.4, -1, 0.25), scene);
    key.position = new BABYLON.Vector3(7, 10, 2);
    key.intensity = 0.5;

    const material = (name, hex, alpha = 1) => {
      const mat = new BABYLON.StandardMaterial(name, scene);
      mat.diffuseColor = BABYLON.Color3.FromHexString(hex);
      mat.alpha = alpha;
      mat.specularColor = new BABYLON.Color3(0.06, 0.06, 0.06);
      return mat;
    };
    const wallMat = material("wall", "#f5f5f4");
    const floorMat = material("floor", "#d7d8da");
    const fixedMat = material("fixed", "#aeb1b5");
    const whiteMat = material("white", "#f7f7f7");
    const glassMat = material("exterior-glass", "#9fc4d2", 0.24);
    glassMat.backFaceCulling = false;
    glassMat.specularColor = new BABYLON.Color3(0.75, 0.82, 0.88);
    glassMat.needDepthPrePass = true;
    const glassFrameMat = material("glass-frame", "#343a40");
    const anchors = new Map();
    const exhibitMeshes = new Map();
    const orientationRoot = new BABYLON.TransformNode("plan-orientation-root", scene);
    orientationRoot.scaling.x = -1;
    orientationRoot.position.x = 7.25;

    const registerExhibitMesh = (id, mesh, isAnchor = false) => {
      if (!exhibitMeshes.has(id)) exhibitMeshes.set(id, []);
      exhibitMeshes.get(id).push(mesh);
      mesh.metadata = { id };
      mesh.isPickable = true;
      if (isAnchor) anchors.set(id, mesh);
      return mesh;
    };
    const box = (name, width, height, depth, x, y, z, mat, pickable = false) => {
      const mesh = BABYLON.MeshBuilder.CreateBox(name, { width, height, depth }, scene);
      mesh.position.set(x, y, z);
      mesh.parent = orientationRoot;
      mesh.material = mat;
      mesh.isPickable = pickable;
      return mesh;
    };

    box("floor-upper", 7.25, 0.08, 5.3, 3.625, -0.04, 2.65, floorMat);
    box("floor-lower", 4.4, 0.08, 3.8, 5.05, -0.04, 7.2, floorMat);
    box("wall-top", 7.34, 2.85, 0.14, 3.625, 1.425, 0.02, wallMat);
    const rightWall = box("wall-right", 0.14, 2.85, 9.18, 7.23, 1.425, 4.55, wallMat);
    box("exterior-glass-wall", 4.35, 2.08, 0.026, 5.025, 1.08, 9.065, glassMat);
    [2.85, 4.30, 5.75, 7.20].forEach((x, index) => box("glass-mullion-" + index, 0.065, 2.18, 0.045, x, 1.09, 9.035, glassFrameMat));
    box("glass-frame-top", 4.35, 0.07, 0.045, 5.025, 2.18, 9.035, glassFrameMat);
    box("glass-frame-bottom", 4.35, 0.07, 0.045, 5.025, 0.035, 9.035, glassFrameMat);
    box("glass-wall-header", 4.45, 0.67, 0.14, 5.00, 2.515, 9.06, wallMat);
    box("outside-sidewalk", 4.35, 0.08, 1.45, 5.025, -0.04, 9.825, material("outside-sidewalk-material", "#686c70"));
    box("exterior-glass-center-pillar", 1.50, 2.85, 1.20, 5.05, 1.425, 10.45, fixedMat);
    box("wall-left-upper", 0.14, 2.85, 5.38, 0.02, 1.425, 2.65, wallMat);
    box("wall-notch", 2.90, 2.85, 0.14, 1.45, 1.425, 5.28, wallMat);
    box("wall-entry-a", 0.14, 2.85, 1.50, 2.83, 1.425, 6.00, wallMat);
    box("wall-entry-b", 0.14, 2.85, 1.22, 2.83, 1.425, 8.475, wallMat);
    box("entrance-projecting-wall", 0.50, 2.85, 0.12, 2.515, 1.425, 8.75, wallMat);

    const mirrorTexture = new BABYLON.MirrorTexture("entrance-mirror-reflection", 1024, scene, true);
    mirrorTexture.mirrorPlane = new BABYLON.Plane(1, 0, 0, -4.335);
    mirrorTexture.level = 0.88;
    const mirrorMat = new BABYLON.StandardMaterial("entrance-mirror-material", scene);
    mirrorMat.diffuseColor = new BABYLON.Color3(0.08, 0.10, 0.12);
    mirrorMat.specularColor = BABYLON.Color3.White();
    mirrorMat.reflectionTexture = mirrorTexture;
    mirrorMat.backFaceCulling = false;
    const entranceMirror = BABYLON.MeshBuilder.CreatePlane("entrance-mirror", { width: 1.25, height: 1.95, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    entranceMirror.position.set(4.335, 1.155, 5.925);
    entranceMirror.rotation.y = -Math.PI / 2;
    entranceMirror.material = mirrorMat;
    entranceMirror.isPickable = false;
    const mirrorFrameMat = material("entrance-mirror-frame", "#30353b");
    box("mirror-frame-top", 0.035, 0.035, 1.32, 2.925, 2.148, 5.925, mirrorFrameMat);
    box("mirror-frame-bottom", 0.035, 0.035, 1.32, 2.925, 0.163, 5.925, mirrorFrameMat);
    box("mirror-frame-side-a", 0.035, 2.02, 0.035, 2.925, 1.155, 5.285, mirrorFrameMat);
    box("mirror-frame-side-b", 0.035, 2.02, 0.035, 2.925, 1.155, 6.565, mirrorFrameMat);

    box("entry-glass", 0.026, 2.08, 1.12, 2.875, 1.08, 7.32, glassMat);
    box("entry-frame-a", 0.045, 2.18, 0.075, 2.91, 1.09, 6.72, glassFrameMat);
    box("entry-frame-b", 0.045, 2.18, 0.075, 2.91, 1.09, 7.92, glassFrameMat);
    box("entry-frame-top", 0.045, 0.075, 1.29, 2.91, 2.18, 7.32, glassFrameMat);
    box("entry-frame-bottom", 0.045, 0.075, 1.29, 2.91, 0.04, 7.32, glassFrameMat);
    box("entry-side-divider", 0.045, 2.14, 0.055, 2.91, 1.08, 6.98, glassFrameMat);
    box("entry-handle", 0.045, 0.34, 0.05, 2.95, 1.03, 7.70, glassFrameMat);
    box("entry-lintel", 0.10, 0.67, 1.20, 2.845, 2.515, 7.32, wallMat);
    box("entry-passage-floor", 1.70, 0.08, 1.20, 2.00, -0.04, 7.32, material("passage-floor", "#aeb0b2"));
    const fixedPartition = box("fixed-partition", 0.055, 2.85, 3.70, 2.2135, 1.425, 3.48, wallMat);
    const storageShelfMat = material("storage-shelf-material", "#bbb8b0");
    [1.975, 2.925, 3.875, 4.825].forEach((z, index) => box(`left-storage-shelf-${index}`, 0.45, 0.82, 0.90, 0.325, 0.41, z, storageShelfMat));
    [2.925, 3.875, 4.825].forEach((z, index) => box(`partition-storage-shelf-${index}`, 0.38, 0.82, 0.88, 2.01, 0.41, z, storageShelfMat));

    box("pillar", 0.80, 2.85, 0.80, 1.95, 1.425, 1.275, fixedMat);
    box("external-pillar-notch", 0.8, 2.85, 0.8, 1.95, 1.425, 5.925, fixedMat);
    box("external-pillar-right-upper", 0.8, 2.85, 0.8, 7.88, 1.425, 1.275, fixedMat);
    box("external-pillar-right-lower", 0.8, 2.85, 0.8, 7.88, 1.425, 5.925, fixedMat);
    box("cabinet-a", 1.51, 0.85, 0.60, 3.10, 0.425, 1.275, fixedMat);
    box("cabinet-b", 2.0, 1.0, 0.60, 5.575, 0.5, 1.275, fixedMat);
    box("right-shelf-return", 0.45, 1.0, 1.455, 7.025, 0.5, 0.8475, fixedMat);
    box("cabinet-b-connector", 0.225, 1.0, 0.60, 6.6875, 0.5, 1.275, fixedMat);
    const shelfMat = material("shelf", "#a8a39b");
    const shelfRecessMat = material("shelf-recess", "#6f6b66");
    const shelfInteriorMat = material("shelf-interior", "#918c85");
    box("right-shelf-bottom", 0.45, 0.32, 5.81, 7.025, 0.16, 4.47, shelfMat);
    box("right-shelf-fascia", 0.45, 0.20, 5.81, 7.025, 0.77, 4.47, shelfMat);
    const shelfStart = 1.575;
    const shelfPier = (5.8 - 4.5) / 6;
    for (let index = 0; index < 6; index += 1) {
      const z = shelfStart + shelfPier / 2 + index * (0.9 + shelfPier);
      box("right-shelf-pier-" + index, 0.45, 0.35, shelfPier, 7.025, 0.495, z, shelfMat);
    }
    for (let index = 0; index < 5; index += 1) {
      const z = shelfStart + shelfPier + 0.45 + index * (0.9 + shelfPier);
      box("right-shelf-back-" + index, 0.018, 0.31, 0.84, 7.24, 0.495, z, shelfRecessMat);
      box("right-shelf-inside-" + index, 0.40, 0.025, 0.84, 7.025, 0.345, z, shelfInteriorMat);
    }

    const boraMat = material("mat-bora", works.find((work) => work.id === "bora").color, 0.9);
    const boraRoomscaleMat = material("bora-roomscale-zone-material", "#73d8d1", 0.32);
    registerExhibitMesh("bora", box("bora-roomscale-zone", 1.5, 0.025, 1.5, 3.115, 0.0125, 2.485, boraRoomscaleMat, true));
    registerExhibitMesh("bora", box("bora", 1.1, 0.06, 0.56, 3.10, 0.88, 1.275, boraMat, true), true);
    registerExhibitMesh("bora", box("bora-monitor", 0.379, 0.264, 0.02, 2.78, 1.02, 1.08, material("monitor", "#22252b")));
    registerExhibitMesh("bora", box("bora-dock", 0.50, 0.04, 0.23, 3.16, 0.92, 1.405, whiteMat));
    const hmd = BABYLON.MeshBuilder.CreateTorus("bora-hmd", { diameter: 0.2, thickness: 0.06 }, scene);
    hmd.position.set(3.16, 0.98, 1.405);
    hmd.parent = orientationRoot;
    hmd.rotation.x = Math.PI / 2;
    hmd.material = material("hmd", "#424750");
    registerExhibitMesh("bora", hmd);
    [2.99, 3.36].forEach((x, index) => {
      const controller = BABYLON.MeshBuilder.CreateCylinder("bora-controller-" + index, { diameter: 0.09, height: 0.10 }, scene);
      controller.position.set(x - 0.015, 0.98, 1.405);
      controller.parent = orientationRoot;
      controller.material = material("controller-" + index, "#68707b");
      registerExhibitMesh("bora", controller);
    });
    registerExhibitMesh("bora", box("bora-teabag", 0.22, 0.03, 0.13, 3.14, 0.91, 1.105, material("teabag", "#d6b06b")));
    const cup = BABYLON.MeshBuilder.CreateCylinder("bora-cup", { diameter: 0.14, height: 0.10 }, scene);
    cup.position.set(3.47, 0.95, 1.105);
    cup.parent = orientationRoot;
    cup.material = whiteMat;
    registerExhibitMesh("bora", cup);
    registerExhibitMesh("bora", box("bora-power-strip", 0.35, 0.04, 0.06, 3.135, 0.91, 1.235, whiteMat));

    const candleMat = material("mat-candle", works.find((work) => work.id === "candle").color, 0.9);
    registerExhibitMesh("candle", box("candle", 0.9, 0.06, 0.56, 5.575, 1.03, 1.275, candleMat, true), true);
    const smallCandle = BABYLON.MeshBuilder.CreateCylinder("candle-surface-small", { diameter: 0.14, height: 0.10 }, scene);
    smallCandle.position.set(5.88, 1.11, 1.34);
    smallCandle.parent = orientationRoot;
    smallCandle.material = candleMat;
    registerExhibitMesh("candle", smallCandle);
    const largeCandleBase = BABYLON.MeshBuilder.CreateCylinder("candle-surface-base", { diameter: 0.28, height: 0.035 }, scene);
    largeCandleBase.position.set(5.58, 1.078, 1.34);
    largeCandleBase.parent = orientationRoot;
    largeCandleBase.material = whiteMat;
    registerExhibitMesh("candle", largeCandleBase);
    const largeCandle = BABYLON.MeshBuilder.CreateCylinder("candle-surface-large", { diameter: 0.17, height: 0.10 }, scene);
    largeCandle.position.set(5.58, 1.145, 1.34);
    largeCandle.parent = orientationRoot;
    largeCandle.material = candleMat;
    registerExhibitMesh("candle", largeCandle);
    registerExhibitMesh("candle", box("candle-display-wall", 0.48, 0.38, 0.03, 5.38, 1.19, 0.995, whiteMat));
    registerExhibitMesh("candle", box("candle-light-bar", 0.50, 0.06, 0.08, 5.38, 1.41, 1.02, whiteMat));
    const wallPiece = BABYLON.MeshBuilder.CreateCylinder("candle-wall", { diameter: 0.15, height: 0.018 }, scene);
    wallPiece.position.set(5.26, 1.28, 1.02);
    wallPiece.parent = orientationRoot;
    wallPiece.rotation.x = Math.PI / 2;
    wallPiece.material = candleMat;
    registerExhibitMesh("candle", wallPiece);
    registerExhibitMesh("candle", box("candle-tablet", 0.17, 0.16, 0.04, 5.275, 1.12, 1.36, material("tablet", "#22252b")));

    const blueWork = works.find((work) => work.id === "blue-by-jjok");
    const bluePanelMat = material("blue-panel-material", "#ececee");
    const blueCubeLowerMat = material("blue-cube-lower-material", "#d8d5ca");
    const blueCubeUpperMat = material("blue-cube-upper-material", "#f3efe2");
    const blueAnchorMat = material("blue-installation-envelope", blueWork.color, 0.08);
    registerExhibitMesh("blue-by-jjok", box("blue-installation-anchor", 2.53, 0.025, 0.90, 5.315, 0.0125, 8.20, blueAnchorMat, true), true);
    registerExhibitMesh("blue-by-jjok", box("blue-panel-a", 0.70, 2.50, 0.06, 5.30, 1.25, 8.58, bluePanelMat, true));
    registerExhibitMesh("blue-by-jjok", box("blue-panel-b", 0.70, 2.50, 0.06, 4.40, 1.25, 8.58, bluePanelMat, true));
    registerExhibitMesh("blue-by-jjok", box("blue-stacked-cube-lower", 0.46, 0.50, 0.46, 6.40, 0.25, 8.20, blueCubeLowerMat, true));
    registerExhibitMesh("blue-by-jjok", box("blue-stacked-cube-upper", 0.46, 0.50, 0.46, 6.30, 0.75, 8.12, blueCubeUpperMat, true));
    const blueFrameMats = [
      material("blue-frame-blue", "#0755c9"),
      material("blue-frame-purple", "#7130bd"),
      material("blue-frame-cyan", "#42afbd"),
      material("blue-frame-orange", "#c9501d"),
      material("blue-frame-green", "#00a455"),
      material("blue-frame-red", "#e12924"),
    ];
    let blueBeamIndex = 0;
    const blueBeam = (name, width, height, depth, x, y, z) => {
      const mesh = box(name, width, height, depth, x, y, z, blueFrameMats[blueBeamIndex % blueFrameMats.length], true);
      blueBeamIndex += 1;
      return registerExhibitMesh("blue-by-jjok", mesh);
    };
    const createBlueFrame = (prefix, x, z, frameWidth, frameDepth, frameHeight) => {
      const beam = 0.055;
      const innerWidth = frameWidth - beam * 2;
      const innerDepth = frameDepth - beam * 2;
      const xLeft = x - frameWidth / 2 + beam / 2;
      const xRight = x + frameWidth / 2 - beam / 2;
      const zNear = z - frameDepth / 2 + beam / 2;
      const zFar = z + frameDepth / 2 - beam / 2;
      [[xLeft, zNear], [xRight, zNear], [xLeft, zFar], [xRight, zFar]].forEach(([postX, postZ], index) => {
        blueBeam(`${prefix}-post-${index}`, beam, frameHeight, beam, postX, frameHeight / 2, postZ);
      });
      [beam / 2, frameHeight - beam / 2].forEach((y, level) => {
        blueBeam(`${prefix}-rail-x-near-${level}`, innerWidth, beam, beam, x, y, zNear);
        blueBeam(`${prefix}-rail-x-far-${level}`, innerWidth, beam, beam, x, y, zFar);
        blueBeam(`${prefix}-rail-z-left-${level}`, beam, beam, innerDepth, xLeft, y, z);
        blueBeam(`${prefix}-rail-z-right-${level}`, beam, beam, innerDepth, xRight, y, z);
      });
    };
    createBlueFrame("blue-frame-left", 5.30, 8.20, 0.42, 0.52, 0.72);
    createBlueFrame("blue-frame-low", 4.40, 8.20, 0.52, 0.52, 0.72);

    shelfWorks.forEach((work) => {
      const mesh = box(work.id, 0.41, 0.05, work.shelfHeight / 1000 - 0.02, 7.025, 0.895, (work.shelfY + work.shelfHeight / 2) / 1000, material("mat-" + work.id, work.color, 0.9), true);
      registerExhibitMesh(work.id, mesh, true);
    });
    const chairMat = material("chair", works.find((work) => work.id === "halfchairs").color, 0.9);
    const chairZoneMat = material("halfchairs-floor-zone-material", "#c7b5ff");
    chairZoneMat.emissiveColor = BABYLON.Color3.FromHexString("#c7b5ff");
    chairZoneMat.disableLighting = true;
    registerExhibitMesh("halfchairs", box("halfchairs-floor-zone", 0.80, 0.035, 0.90, 4.90, 0.0175, 4.70, chairZoneMat, true), true);
    registerExhibitMesh("halfchairs", box("halfchairs", 0.33, 0.07, 0.425, 4.90, 0.06, 4.70, chairMat, true));
    registerExhibitMesh("halfchairs", box("chair-seat", 0.33, 0.12, 0.425, 4.90, 0.475, 4.70, chairMat));
    registerExhibitMesh("halfchairs", box("chair-back", 0.33, 0.72, 0.09, 4.90, 0.845, 4.5325, chairMat));

    const staffZoneMat = material("staff-zone-material", "#e8e0cf");
    const staffChairMat = material("staff-chair-material", "#8b7650");
    const createStaffStation = (prefix, x, z, zoneWidth, zoneDepth, facing = "x") => {
      box(`${prefix}-zone`, zoneWidth, 0.025, zoneDepth, x, 0.0125, z, staffZoneMat);
      box(`${prefix}-seat`, 0.35, 0.07, 0.35, x, 0.47, z, staffChairMat);
      if (facing === "z") {
        box(`${prefix}-back`, 0.35, 0.58, 0.06, x, 0.78, z - 0.17, staffChairMat);
      } else {
        box(`${prefix}-back`, 0.06, 0.58, 0.35, x - 0.17, 0.78, z, staffChairMat);
      }
      [[-0.15, -0.145], [0.15, -0.145], [-0.15, 0.145], [0.15, 0.145]].forEach(([dx, dz], legIndex) => {
        box(`${prefix}-leg-${legIndex}`, 0.04, 0.44, 0.04, x + dx, 0.22, z + dz, staffChairMat);
      });
    };
    createStaffStation("staff-mirror", 3.45, 5.925, 0.70, 0.65);
    createStaffStation("staff-cabinet-gap", 4.24, 0.605, 0.65, 0.65, "z");

    const loadSeatedAttendant = (name, x, z, rotationY) => {
      BABYLON.SceneLoader.ImportMeshAsync("", import.meta.env.BASE_URL + "assets/", "attendant-woman.glb", scene).then((result) => {
        if (scene.isDisposed) return;
        const modelRoot = result.meshes[0];
        if (!modelRoot) return;
        const personPivot = new BABYLON.TransformNode(name, scene);
        modelRoot.parent = personPivot;
        result.meshes.forEach((mesh) => {
          mesh.isPickable = false;
          mesh.alwaysSelectAsActiveMesh = true;
          mesh.computeWorldMatrix(true);
          if (mirrorTexture.renderList && mesh !== entranceMirror && !mirrorTexture.renderList.includes(mesh)) {
            mirrorTexture.renderList.push(mesh);
          }
        });
        personPivot.computeWorldMatrix(true);
        const bounds = personPivot.getHierarchyBoundingVectors(true);
        const height = bounds.max.y - bounds.min.y;
        if (!Number.isFinite(height) || height <= 0) return;
        modelRoot.position.x -= (bounds.min.x + bounds.max.x) / 2;
        modelRoot.position.y -= bounds.min.y;
        modelRoot.position.z -= (bounds.min.z + bounds.max.z) / 2;
        personPivot.scaling.setAll(1.32 / height);
        personPivot.parent = orientationRoot;
        personPivot.position.set(x, 0, z);
        personPivot.rotation.y = rotationY;
      }).catch((error) => console.error("attendant-woman.glb load failed", error));
    };
    loadSeatedAttendant("attendant-mirror", 3.59, 5.925, Math.PI / 2);
    loadSeatedAttendant("attendant-cabinet-gap", 4.24, 0.745, 0);

    mirrorTexture.renderList = scene.meshes.filter((mesh) => mesh !== entranceMirror);

    const selectionBandMat = material("selection-band-material", "#f5b700", 0.95);
    selectionBandMat.emissiveColor = BABYLON.Color3.FromHexString("#f5b700").scale(0.7);
    selectionBandMat.disableLighting = true;
    const selectionBand = box("selection-band", 1, 0.018, 1, 0, 0, 0, selectionBandMat);
    selectionBand.isPickable = false;
    selectionBand.isVisible = false;

    const focusExhibit = (id) => {
      [...exhibitMeshes.values()].flat().forEach((mesh) => {
        mesh.renderOutline = false;
        mesh.renderOverlay = false;
        mesh.visibility = mesh.name === "halfchairs-floor-zone" ? 1 : 0.34;
      });
      const activeMeshes = exhibitMeshes.get(id) || [];
      activeMeshes.forEach((mesh) => {
        mesh.visibility = 1;
        mesh.overlayColor = BABYLON.Color3.FromHexString("#f5b700");
        mesh.overlayAlpha = 0.22;
        mesh.renderOverlay = true;
      });
      const anchor = anchors.get(id);
      selectionBand.isVisible = false;
      if (!anchor) return;
      anchor.computeWorldMatrix(true);
      const bounds = anchor.getBoundingInfo().boundingBox;
      const width = bounds.maximumWorld.x - bounds.minimumWorld.x;
      const depth = bounds.maximumWorld.z - bounds.minimumWorld.z;
      selectionBand.scaling.set(width + 0.12, 1, depth + 0.12);
      selectionBand.position.set(anchor.position.x, Math.max(0.012, bounds.minimumWorld.y - 0.006), anchor.position.z);
      selectionBand.isVisible = true;
      const worldAnchor = anchor.getAbsolutePosition();
      const target = id === "bora"
        ? new BABYLON.Vector3(worldAnchor.x, 0.55, worldAnchor.z + 0.75)
        : new BABYLON.Vector3(worldAnchor.x, id === "blue-by-jjok" ? 1.20 : Math.max(worldAnchor.y, 0.65), worldAnchor.z);
      const isShelf = shelfWorks.some((work) => work.id === id);
      fixedPartition.isVisible = true;
      rightWall.isVisible = true;
      const view = isShelf
        ? { alpha: 0, beta: 0.82, radius: 3.2 }
        : id === "blue-by-jjok"
          ? { alpha: -1.30, beta: 1.02, radius: 5.4 }
        : id === "halfchairs"
          ? { alpha: Math.PI / 2, beta: 0.90, radius: 4.2 }
        : id === "bora"
          ? { alpha: 1.82, beta: 0.82, radius: 4.2 }
        : id === "candle"
          ? { alpha: Math.PI / 2, beta: 1.02, radius: 4.8 }
          : { alpha: -0.82, beta: 1.02, radius: 5.4 };
      scene.stopAnimation(camera);
      const easing = new BABYLON.CubicEase();
      easing.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
      const animateCamera = (name, property, from, to) => BABYLON.Animation.CreateAndStartAnimation(name, camera, property, 30, 24, from, to, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT, easing);
      animateCamera("focus-target", "target", camera.target.clone(), target);
      animateCamera("focus-alpha", "alpha", camera.alpha, view.alpha);
      animateCamera("focus-beta", "beta", camera.beta, view.beta);
      animateCamera("focus-radius", "radius", camera.radius, view.radius);
    };
    focusRef.current = focusExhibit;

    scene.onPointerObservable.add((info) => {
      if (info.type !== BABYLON.PointerEventTypes.POINTERPICK) return;
      const id = info.pickInfo?.pickedMesh?.metadata?.id;
      if (id) onSelect(id);
    });
    engine.runRenderLoop(() => scene.render());
    const resize = () => engine.resize();
    window.addEventListener("resize", resize);
    return () => {
      focusRef.current = null;
      canvas.removeEventListener("contextmenu", preventContextMenu);
      window.removeEventListener("resize", resize);
      scene.dispose();
      engine.dispose();
    };
  }, [onSelect]);

  useEffect(() => {
    focusRef.current?.(selected);
  }, [selected]);

  return (
    <div className="three-view is-active no-print" id="threeView">
      <button className="canvas-2d-cta" type="button" onClick={onOpen2D}>
        <span>배치와 치수를 확인하세요</span>
        <strong>2D 도면 보기</strong>
      </button>
      <canvas ref={canvasRef} id="renderCanvas" aria-label="G09 전시 공간 3D 확인" style={{ touchAction: "none" }} />
      <p>좌클릭 드래그 회전 · 우클릭/두 손가락 드래그 이동 · 휠/핀치 확대 · 작품 클릭</p>
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
        <dl><div><dt>우측 선반</dt><dd>상단 ㄱ자 연결 + 직선부 5800 × 450 · H870</dd></div><div><dt>선반 배정</dt><dd>지은실 상단 2900 · 홍선옥 하단 2900</dd></div><div><dt>선반 구조</dt><dd>전면부 200 · 개구 900 × 350 · 하부 320</dd></div><div><dt>목재장 A</dt><dd>1500 × 600 · H850</dd></div><div><dt>목재장 B</dt><dd>직선 2000 + 우측 450 반환 · H1000</dd></div><div><dt>고정 파티션</dt><dd>뒤 1300 통로와 양측 기존 선반 · 작품 미설치</dd></div><div><dt>Blue by jjok</dt><dd>외부 조망 유리벽 앞 · 바닥 자립 2점</dd></div><div><dt>Half Chairs</dt><dd>연보라 바닥 구획 800 × 900 · 입구에서 안쪽 이동</dd></div><div><dt>전시 지킴이</dt><dd>A 거울 전면 · B 목재장 사이 726 간격 뒤쪽</dd></div><div><dt>구조기둥</dt><dd>800 × 800 · 이동 불가</dd></div><div><dt>천장고</dt><dd>CH 2850 · 전기 도면 기준</dd></div></dl>
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
          <div className="view-switch" aria-label="도면 보기 전환">
            <span className="view-switch-label">보기 전환</span>
            <button className={`tab plan-tab${view === "plan" ? " is-active" : ""}`} aria-pressed={view === "plan"} type="button" onClick={() => setView("plan")}>2D 도면</button>
            <button className={`tab three-tab${view === "three" ? " is-active" : ""}`} aria-pressed={view === "three"} type="button" onClick={() => setView("three")}>3D로 둘러보기</button>
          </div>
          <label className="layer-toggle"><input aria-label="예상 동선" type="checkbox" checked={circulation} onChange={(event) => setCirculation(event.target.checked)} /> 예상 동선</label>
          <label className="layer-toggle"><input aria-label="전기" type="checkbox" checked={electrical} onChange={(event) => setElectrical(event.target.checked)} /> 전기</label>
          <button className="print-button" type="button" onClick={() => window.print()}>A3 PDF 출력</button>
        </div>
      </header>
      <main>
        <section className="sheet">
          <div className="sheet-heading"><div><p className="drawing-no">EXHIBITION LAYOUT · G09 / B-111</p><h2>작품 배치 평면도</h2></div><div className="revision">REV. 30 · 2026.09.20</div></div>
          <div className="sheet-body">
            {view === "plan" ? <Plan circulation={circulation} electrical={electrical} selected={selected} onSelect={setSelected} onOpen3D={() => setView("three")} /> : <ThreeView selected={selected} onSelect={setSelected} onOpen2D={() => setView("plan")} />}
            <Legend selected={selected} onSelect={setSelected} />
          </div>
          <footer className="title-block"><div><span>PROJECT</span><strong>DESIGNART TOKYO 2026</strong></div><div><span>SPACE</span><strong>HIBIYA OKUROJI G09 / B-111</strong></div><div><span>DRAWING</span><strong>작품 · 전기 배치 평면도</strong></div><div><span>SCALE</span><strong>1:50 @ A3</strong></div><div><span>AREA / CH</span><strong>55.15㎡ / 2850</strong></div><div><span>STATUS</span><strong>배치 계획안 · 현장 실측 전</strong></div></footer>
        </section>
      </main>
    </>
  );
}
