"use client";

import { useMemo, useState } from "react";
import { FigureCaption } from "@/components/Callouts";

const ASSET_A = { name: "资产 A", mu: 0.08, sigma: 0.15 };
const ASSET_B = { name: "资产 B", mu: 0.12, sigma: 0.22 };

function portfolio(weightA: number, rho: number) {
  const w = weightA;
  const mu = w * ASSET_A.mu + (1 - w) * ASSET_B.mu;
  const varP =
    w ** 2 * ASSET_A.sigma ** 2 +
    (1 - w) ** 2 * ASSET_B.sigma ** 2 +
    2 * w * (1 - w) * rho * ASSET_A.sigma * ASSET_B.sigma;
  return { mu, sigma: Math.sqrt(Math.max(varP, 0)) };
}

export function EfficientFrontier() {
  const [rho, setRho] = useState(-0.2);
  const weights = useMemo(() => Array.from({ length: 81 }, (_, i) => i / 40 - 0.5), []);
  const points = useMemo(() => weights.map((w) => ({ w, ...portfolio(w, rho) })), [weights, rho]);

  const minVar = points.reduce((best, p) => (p.sigma < best.sigma ? p : best), points[0]);
  const efficient = points.filter((p) => p.mu >= minVar.mu - 1e-12);

  const width = 640;
  const height = 420;
  const pad = { l: 58, r: 20, t: 20, b: 48 };
  const sigmas = points.map((p) => p.sigma);
  const mus = points.map((p) => p.mu);
  const xMin = 0;
  const xMax = Math.max(0.32, ...sigmas) + 0.02;
  const yMin = 0.04;
  const yMax = Math.max(0.16, ...mus) + 0.01;
  const x = (sigma: number) => pad.l + ((sigma - xMin) / (xMax - xMin)) * (width - pad.l - pad.r);
  const y = (mu: number) => height - pad.b - ((mu - yMin) / (yMax - yMin)) * (height - pad.t - pad.b);
  const pathOf = (pts: typeof points) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.sigma).toFixed(2)} ${y(p.mu).toFixed(2)}`).join(" ");

  return (
    <figure className="my-6 border border-rule bg-white/70 p-4">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3 font-sans text-sm">
        <label className="flex flex-col gap-1 text-ink-soft">
          <span>相关系数 ρ = {rho.toFixed(2)}</span>
          <input
            type="range"
            min={-0.8}
            max={0.9}
            step={0.05}
            value={rho}
            onChange={(event) => setRho(Number(event.target.value))}
            className="w-56 accent-cinnabar"
          />
        </label>
        <p className="text-xs leading-6 text-ink-faint">
          示意参数：A 的期望 8%、波动 15%；B 的期望 12%、波动 22%。权重可超出 0 与 1，表示允许卖空。
        </p>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="两资产均值方差可行集示意">
        <rect width={width} height={height} fill="#fbf8f1" />
        {[0.05, 0.1, 0.15, 0.2, 0.25, 0.3].map((tick) => (
          <g key={`x-${tick}`}>
            <line x1={x(tick)} y1={pad.t} x2={x(tick)} y2={height - pad.b} stroke="#eadfcb" />
            <text x={x(tick)} y={height - 22} textAnchor="middle" fontSize="11" fill="#5c574c">
              {(tick * 100).toFixed(0)}%
            </text>
          </g>
        ))}
        {[0.06, 0.08, 0.1, 0.12, 0.14, 0.16].map((tick) => (
          <g key={`y-${tick}`}>
            <line x1={pad.l} y1={y(tick)} x2={width - pad.r} y2={y(tick)} stroke="#eadfcb" />
            <text x={pad.l - 8} y={y(tick) + 4} textAnchor="end" fontSize="11" fill="#5c574c">
              {(tick * 100).toFixed(0)}%
            </text>
          </g>
        ))}
        <path d={pathOf(points)} stroke="#8a8376" strokeWidth="1.5" fill="none" />
        <path d={pathOf(efficient)} stroke="#9c2f2f" strokeWidth="2.8" fill="none" />
        <circle cx={x(ASSET_A.sigma)} cy={y(ASSET_A.mu)} r="4.5" fill="#2c4a3e" />
        <circle cx={x(ASSET_B.sigma)} cy={y(ASSET_B.mu)} r="4.5" fill="#2c4a3e" />
        <circle cx={x(minVar.sigma)} cy={y(minVar.mu)} r="4.5" fill="#9c2f2f" />
        <text x={x(ASSET_A.sigma) + 8} y={y(ASSET_A.mu) - 8} fontSize="12" fill="#1b1914">
          A
        </text>
        <text x={x(ASSET_B.sigma) + 8} y={y(ASSET_B.mu) - 8} fontSize="12" fill="#1b1914">
          B
        </text>
        <text x={x(minVar.sigma) + 8} y={y(minVar.mu) + 16} fontSize="11" fill="#9c2f2f">
          最小方差
        </text>
        <text x={width / 2} y={height - 6} textAnchor="middle" fontSize="12" fill="#5c574c">
          组合波动率 σ
        </text>
        <text x={16} y={24} fontSize="12" fill="#5c574c">
          期望收益 μ
        </text>
      </svg>
      <FigureCaption>
        灰色曲线是全部可行组合，红色加粗段是有效前沿（同样风险下期望更高的部分）。拖动相关系数，观察分散化如何改变弯曲程度。这些数字是为讲解指定的示意参数，不是某段历史回测的结果。
      </FigureCaption>
    </figure>
  );
}
