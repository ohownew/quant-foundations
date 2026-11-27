"use client";

import { useMemo, useState } from "react";
import { FigureCaption } from "@/components/Callouts";

function gaussian(x: number) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

function studentT(x: number, nu: number) {
  return (
    Math.exp(logGamma((nu + 1) / 2) - logGamma(nu / 2)) /
    Math.sqrt(nu * Math.PI) *
    (1 + (x * x) / nu) ** (-(nu + 1) / 2)
  );
}

// Lanczos approximation
function logGamma(z: number): number {
  const p = [
    676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
    12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
  }
  z -= 1;
  let x = 0.99999999999980993;
  for (let i = 0; i < p.length; i += 1) x += p[i] / (z + i + 1);
  const t = z + p.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

function erfc(x: number) {
  // Abramowitz and Stegun approximation
  const z = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * z);
  const a =
    t *
    (0.254829592 +
      t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const y = a * Math.exp(-z * z);
  return x >= 0 ? y : 2 - y;
}

function normalTail(threshold: number) {
  return erfc(threshold / Math.SQRT2);
}

function simpsonTail(threshold: number, nu: number) {
  const max = 40;
  const n = 400;
  const h = (max - threshold) / n;
  let sum = studentT(threshold, nu) + studentT(max, nu);
  for (let i = 1; i < n; i += 1) {
    const x = threshold + i * h;
    sum += (i % 2 === 0 ? 2 : 4) * studentT(x, nu);
  }
  return (2 * (sum * h) / 3);
}

export function FatTails() {
  const [nu, setNu] = useState(4);
  const xs = useMemo(() => Array.from({ length: 241 }, (_, i) => -6 + i * 0.05), []);
  const normal = useMemo(() => xs.map((x) => ({ x, y: gaussian(x) })), [xs]);
  const heavy = useMemo(() => xs.map((x) => ({ x, y: studentT(x, nu) })), [xs, nu]);

  const width = 640;
  const height = 360;
  const pad = { l: 20, r: 20, t: 16, b: 36 };
  const yMax = 0.45;
  const X = (x: number) => pad.l + ((x + 6) / 12) * (width - pad.l - pad.r);
  const Y = (y: number) => height - pad.b - (y / yMax) * (height - pad.t - pad.b);
  const line = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${X(p.x).toFixed(2)} ${Y(p.y).toFixed(2)}`).join(" ");

  const pNormal = normalTail(3);
  const pHeavy = simpsonTail(3, nu);

  return (
    <figure className="my-6 border border-rule bg-white/70 p-4">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3 font-sans text-sm">
        <label className="flex flex-col gap-1 text-ink-soft">
          <span>学生 t 分布自由度 ν = {nu}</span>
          <input
            type="range"
            min={3}
            max={30}
            step={1}
            value={nu}
            onChange={(event) => setNu(Number(event.target.value))}
            className="w-56 accent-cinnabar"
          />
        </label>
        <p className="max-w-sm text-xs leading-6 text-ink-faint">
          自由度越小，尾部越厚。ν 很大时，曲线会靠近正态分布。
        </p>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="正态分布与厚尾分布对照示意">
        <rect width={width} height={height} fill="#fbf8f1" />
        {[-6, -3, 0, 3, 6].map((tick) => (
          <g key={tick}>
            <line x1={X(tick)} y1={pad.t} x2={X(tick)} y2={height - pad.b} stroke={Math.abs(tick) === 3 ? "#e2c7c2" : "#eadfcb"} />
            <text x={X(tick)} y={height - 14} textAnchor="middle" fontSize="11" fill="#5c574c">
              {tick}
            </text>
          </g>
        ))}
        <path d={line(normal)} stroke="#2c4a3e" strokeWidth="2.2" fill="none" />
        <path d={line(heavy)} stroke="#9c2f2f" strokeWidth="2.2" fill="none" />
        <text x={X(1.2)} y={Y(gaussian(0)) - 8} fontSize="12" fill="#2c4a3e">
          标准正态
        </text>
        <text x={X(2.1)} y={Y(studentT(2.1, nu)) - 10} fontSize="12" fill="#9c2f2f">
          学生 t
        </text>
      </svg>
      <div className="mt-3 overflow-x-auto font-sans text-sm">
        <table>
          <thead>
            <tr>
              <th>事件</th>
              <th>标准正态</th>
              <th>当前学生 t</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>|X| &gt; 3 的概率（双侧）</td>
              <td>{pNormal.toFixed(4)}</td>
              <td>{Math.min(1, pHeavy).toFixed(4)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <FigureCaption>
        这是标准化后的密度曲线对照，用来说明“厚尾”会让极端值比正态假设更常见。数字由分布公式算出，不是某只证券或某条策略的回测结果。学生 t 的尾部概率用数值积分近似，仅供观察数量级。
      </FigureCaption>
    </figure>
  );
}
