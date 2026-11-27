"use client";

import { useMemo, useState } from "react";
import { FigureCaption } from "@/components/Callouts";

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussianRNG(rng: () => number) {
  const u = Math.max(rng(), 1e-12);
  const v = Math.max(rng(), 1e-12);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

type Point = { x: number; y: number };

function regress(points: Point[]) {
  const n = points.length;
  const meanX = points.reduce((s, p) => s + p.x, 0) / n;
  const meanY = points.reduce((s, p) => s + p.y, 0) / n;
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  for (const p of points) {
    sxx += (p.x - meanX) ** 2;
    sxy += (p.x - meanX) * (p.y - meanY);
    syy += (p.y - meanY) ** 2;
  }
  const beta = sxy / sxx;
  const alpha = meanY - beta * meanX;
  const residualVar = points.reduce((s, p) => s + (p.y - alpha - beta * p.x) ** 2, 0) / (n - 2);
  const totalVar = syy / (n - 1);
  const systematicVar = (beta ** 2 * (sxx / (n - 1)));
  const r2 = 1 - (residualVar * (n - 2)) / syy;
  return { alpha, beta, residualVol: Math.sqrt(residualVar), totalVol: Math.sqrt(totalVar), systematicVol: Math.sqrt(systematicVar), r2 };
}

export function BetaDecomposition() {
  const [betaTrue, setBetaTrue] = useState(1.1);
  const [idio, setIdio] = useState(0.025);
  const [seed, setSeed] = useState(7);

  const { points, fit } = useMemo(() => {
    const rng = mulberry32(seed);
    const pts: Point[] = [];
    for (let i = 0; i < 80; i += 1) {
      const x = 0.01 * gaussianRNG(rng);
      const y = 0.0005 + betaTrue * x + idio * gaussianRNG(rng);
      pts.push({ x, y });
    }
    return { points: pts, fit: regress(pts) };
  }, [betaTrue, idio, seed]);

  const width = 640;
  const height = 400;
  const pad = { l: 52, r: 16, t: 16, b: 44 };
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const maxAbsX = Math.max(0.03, ...xs.map(Math.abs));
  const maxAbsY = Math.max(0.05, ...ys.map(Math.abs));
  const X = (x: number) => pad.l + ((x + maxAbsX) / (2 * maxAbsX)) * (width - pad.l - pad.r);
  const Y = (y: number) => height - pad.b - ((y + maxAbsY) / (2 * maxAbsY)) * (height - pad.t - pad.b);
  const lineX = [-maxAbsX, maxAbsX];
  const lineY = lineX.map((x) => fit.alpha + fit.beta * x);

  const sysShare = fit.systematicVol ** 2 / fit.totalVol ** 2;

  return (
    <figure className="my-6 border border-rule bg-white/70 p-4">
      <div className="mb-3 grid gap-3 font-sans text-sm sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-ink-soft">
          <span>设定的 beta = {betaTrue.toFixed(2)}</span>
          <input type="range" min={0.2} max={1.8} step={0.05} value={betaTrue} onChange={(e) => setBetaTrue(Number(e.target.value))} className="accent-cinnabar" />
        </label>
        <label className="flex flex-col gap-1 text-ink-soft">
          <span>残差波动 = {(idio * 100).toFixed(1)}%</span>
          <input type="range" min={0.008} max={0.05} step={0.001} value={idio} onChange={(e) => setIdio(Number(e.target.value))} className="accent-cinnabar" />
        </label>
        <button
          type="button"
          className="self-end rounded-sm border border-rule px-3 py-1.5 text-ink hover:border-pine"
          onClick={() => setSeed((s) => s + 1)}
        >
          重新抽取示意样本
        </button>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="单指数回归与 beta 分解示意">
        <rect width={width} height={height} fill="#fbf8f1" />
        <line x1={X(0)} y1={pad.t} x2={X(0)} y2={height - pad.b} stroke="#d4cbb8" />
        <line x1={pad.l} y1={Y(0)} x2={width - pad.r} y2={Y(0)} stroke="#d4cbb8" />
        {points.map((p, i) => (
          <circle key={i} cx={X(p.x)} cy={Y(p.y)} r="3" fill="#2c4a3e" fillOpacity="0.7" />
        ))}
        <line
          x1={X(lineX[0])}
          y1={Y(lineY[0])}
          x2={X(lineX[1])}
          y2={Y(lineY[1])}
          stroke="#9c2f2f"
          strokeWidth="2.2"
        />
        <text x={width / 2} y={height - 10} textAnchor="middle" fontSize="12" fill="#5c574c">
          市场超额收益（示意）
        </text>
        <text x={16} y={22} fontSize="12" fill="#5c574c">
          证券超额收益
        </text>
      </svg>
      <div className="mt-3 overflow-x-auto font-sans text-sm">
        <table>
          <thead>
            <tr>
              <th>估计 alpha</th>
              <th>估计 beta</th>
              <th>R²</th>
              <th>系统方差占比（近似）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{(fit.alpha * 100).toFixed(3)}%</td>
              <td>{fit.beta.toFixed(3)}</td>
              <td>{fit.r2.toFixed(3)}</td>
              <td>{Math.max(0, Math.min(1, sysShare) * 100).toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <FigureCaption>
        散点由设定的 beta、一个很小的截距和残差随机项生成，再做普通最小二乘回归。请把它当作“beta 如何分解收益”的教具，而不是某只真实股票的估计，更不是策略业绩。
      </FigureCaption>
    </figure>
  );
}
