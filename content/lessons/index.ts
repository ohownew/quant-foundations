import type { ComponentType } from "react";
import EconomicsWhy from "./economics-why-model-markets";
import EconomicsEMH from "./economics-efficient-markets";
import EconomicsNoArb from "./economics-no-arbitrage";
import EconomicsUtility from "./economics-risk-utility";
import EconomicsInfo from "./economics-information-and-prices";
import MathProb from "./mathematics-probability-statistics";
import MathLinalg from "./mathematics-linear-algebra";
import MathOpt from "./mathematics-optimization";
import MathTs from "./mathematics-time-series";
import FinanceFrontier from "./finance-portfolio-theory";
import FinanceCapm from "./finance-capm-beta";
import FinanceSys from "./finance-systematic-risk";
import FinanceApt from "./finance-apt-factors";
import FinanceRisk from "./finance-risk-metrics";
import FinanceBt from "./finance-backtesting-limits";

export const lessonBodies: Record<string, ComponentType> = {
  "economics/why-model-markets": EconomicsWhy,
  "economics/efficient-markets": EconomicsEMH,
  "economics/no-arbitrage": EconomicsNoArb,
  "economics/risk-utility": EconomicsUtility,
  "economics/information-and-prices": EconomicsInfo,
  "mathematics/probability-statistics": MathProb,
  "mathematics/linear-algebra": MathLinalg,
  "mathematics/optimization": MathOpt,
  "mathematics/time-series": MathTs,
  "finance/portfolio-theory": FinanceFrontier,
  "finance/capm-beta": FinanceCapm,
  "finance/systematic-risk": FinanceSys,
  "finance/apt-factors": FinanceApt,
  "finance/risk-metrics": FinanceRisk,
  "finance/backtesting-limits": FinanceBt,
};
