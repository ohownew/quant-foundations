import type { LessonMeta, ModuleId, ModuleMeta } from "./types";

function lesson(
  module: ModuleId,
  slug: string,
  number: string,
  title: string,
  subtitle: string,
  minutes: number,
  summary: string,
  lab?: string,
): LessonMeta {
  return {
    id: `${module}/${slug}`,
    module,
    slug,
    href: `/course/${module}/${slug}`,
    number,
    title,
    subtitle,
    minutes,
    summary,
    lab,
  };
}

export const modules: ModuleMeta[] = [
  {
    id: "economics",
    order: 1,
    title: "经济学",
    kicker: "第一部",
    description:
      "先问市场为什么可以被建模。有效价格、无套利、风险与效用、信息如何进入价格，是后面所有公式的语境。",
    lessons: [
      lesson(
        "economics",
        "why-model-markets",
        "1.1",
        "市场为何可被建模",
        "把价格当成可研究的信号，而不是神秘的涨跌",
        28,
        "金融市场把稀缺资本配置到不同用途。量化研究的前提，不是预测永远正确，而是价格、收益与风险可以用明确的假设来讨论。",
        "在研究环境中观察一条收益率序列，只做描述统计，先不下交易结论。",
      ),
      lesson(
        "economics",
        "efficient-markets",
        "1.2",
        "有效市场与市场失效",
        "把有效市场当作有用的原假设，而不是一句口号",
        35,
        "Fama 把“价格充分反映信息”分成弱式、半强式与强式。真正难的是：任何检验都与资产定价模型缠在一起，而表面上的失效既可能是风险补偿，也可能是错误定价或统计幻觉。",
        "计算日收益率的自相关系数，体会弱式检验在做什么，以及它不能证明什么。",
      ),
      lesson(
        "economics",
        "no-arbitrage",
        "1.3",
        "无套利",
        "定价理论里最硬的约束",
        30,
        "无套利比“平均能赚钱”严格得多：它要求不能以零或负的净投入，获得只赚不赔且有时严格为正的收益。统计优势、风险溢价与套利是三件不同的事。",
        "用两笔高度相关的价格序列构造价差，观察“看起来像套利”的机会如何被成本与风险改写。",
      ),
      lesson(
        "economics",
        "risk-utility",
        "1.4",
        "风险、盈余与效用",
        "为什么人们需要为承担风险要求补偿",
        32,
        "若投资者厌恶风险，不确定的未来消费就必须用效用或随机贴现来衡量。风险溢价是补偿，不是免费午餐；方差成为常用风险度量，首先是因为均值–方差分析在数学上可处理。",
        "用一个极简单的两点分布，数值比较不同风险厌恶下对风险资产的需求。",
      ),
      lesson(
        "economics",
        "information-and-prices",
        "1.5",
        "信息与价格",
        "价格如何汇总信息，又为什么不能“完美”汇总",
        30,
        "价格会把分散的私人信息部分地揭示出来，但 Grossman 与 Stiglitz 指出：若价格已经完全揭示信息，就没有人愿意支付成本去收集信息。这决定了我们对“超额收益”应抱有怎样的预期。",
        "设计一个极简的事件研究步骤：在公告窗口观察平均收益，但先不要把它解释成可交易策略。",
      ),
    ],
  },
  {
    id: "mathematics",
    order: 2,
    title: "数学",
    kicker: "第二部",
    description:
      "数学从金融问题里长出来，而不是先背一本公式手册。概率、线性代数、最优化与时间序列，都对应后面要处理的收益、风险与估计误差。",
    lessons: [
      lesson(
        "mathematics",
        "probability-statistics",
        "2.1",
        "概率与统计",
        "期望、方差、分布、大数定律、中心极限定理、估计与假设检验",
        40,
        "收益是随机变量。期望与方差是投资决策的第一组语言；正态分布便于计算，但真实收益常有厚尾。大数定律与中心极限定理解释样本为什么有用，也解释为什么短样本里的夏普比率会不可靠。",
        "画收益率直方图，计算偏度与峰度，并与正态分布对照。图中若用示例数据，必须标明示意。",
      ),
      lesson(
        "mathematics",
        "linear-algebra",
        "2.2",
        "线性代数：收益向量与协方差矩阵",
        "组合风险为什么是一个二次型",
        30,
        "一组资产的收益是向量，权重也是向量。组合期望收益是内积，方差是协方差矩阵夹在权重中间的二次型。分散化能不能成立，取决于协方差结构，而估计这个矩阵本身就会引入误差。",
        "对少数几只证券估计协方差矩阵，检查它是否对称、对角线是否为方差，并观察样本长度如何改变结果。",
      ),
      lesson(
        "mathematics",
        "optimization",
        "2.3",
        "最优化与均值–方差",
        "在给定约束下寻找风险与收益的边界",
        32,
        "Markowitz 问题是：在权重约束下，最小化组合方差，或在给定方差下最大化期望收益。几何上这会画出一条有效前沿。输入稍有误差，最优权重就可能剧烈变化——这是后面讨论估计风险的伏笔。",
        "用两到三只资产的历史样本均值与协方差，数值求解一条前沿。结果只用于理解方法，不得写成业绩宣传。",
      ),
      lesson(
        "mathematics",
        "time-series",
        "2.4",
        "时间序列与随机过程基础",
        "随机游走、鞅与平稳性",
        36,
        "价格是按时间排列的。随机游走与鞅是有效市场最常见的数学模型；平稳性则决定“均值、方差、相关系数”能否被当作稳定参数来估计。先把这些基础站稳，再考虑更复杂的波动率模型。",
        "观察滚动均值与滚动波动率，讨论它们看起来是否稳定，以及不稳定时估计意味着什么。",
      ),
    ],
  },
  {
    id: "finance",
    order: 3,
    title: "金融学",
    kicker: "第三部",
    description:
      "把前面的经济学直觉与数学工具，落实为投资组合、风险分解、因子模型、风险指标，以及回测能够证明和不能证明的事情。",
    lessons: [
      lesson(
        "finance",
        "portfolio-theory",
        "3.1",
        "投资组合理论与有效前沿",
        "分散化如何改变可行的风险–收益集合",
        36,
        "两只风险资产就能看出相关性如何弯曲可行集；加入无风险资产后，最优选择可以分解为“切点风险组合 + 现金或杠杆”。本课用示意数据演示几何，不提供任何历史业绩承诺。",
        "自己准备若干只证券的收益数据，画出可行集与前沿，并明确标注样本区间与这不是预测。",
      ),
      lesson(
        "finance",
        "capm-beta",
        "3.2",
        "CAPM 与 beta",
        "均衡时，被定价的是不可分散的风险",
        34,
        "若投资者都按均值–方差持有市场组合，则单只证券的期望超额收益与它相对市场的 beta 成正比。beta 是回归斜率，也是风险分解的起点。本课会说明假设、含义，以及 Roll 批判指出的检验困难。",
        "把一只证券的超额收益对市场超额收益做回归，读取 alpha、beta 与残差波动，只解释系数，不断言“能赚多少”。",
      ),
      lesson(
        "finance",
        "systematic-risk",
        "3.3",
        "系统风险与个股风险",
        "分散化能去掉什么，去不掉什么",
        28,
        "单指数或因子模型把收益拆成共同驱动项与残差。残差可以在组合中被削弱，共同因子带来的风险通常不能。因此，被定价的应是投资者不得不承担的那部分风险。",
        "用示意或真实样本，观察等权组合的残差波动如何随证券数量下降，并讨论下降为何会减速。",
      ),
      lesson(
        "finance",
        "apt-factors",
        "3.4",
        "APT 与因子模型",
        "从单一市场因子走到规模、价值与动量",
        38,
        "Ross 的 APT 用无套利约束多因子结构；Fama 与 French 则从经验上识别出规模与价值等常见差异。因子究竟是风险补偿还是错误定价，是持续争论。本课先把模型和检验逻辑讲清楚。",
        "阅读 Ken French 数据库的因子定义，并在研究环境中把一条收益序列对市场、规模、价值因子回归。",
      ),
      lesson(
        "finance",
        "risk-metrics",
        "3.5",
        "风险指标",
        "波动率、回撤、夏普比率：公式、假设与误用",
        32,
        "常用指标都有明确公式，也有明确的盲区。波动率不区分上下行；最大回撤依赖路径；夏普比率依赖无风险利率、年化方式与分布假设。本课只用公式与示意计算，不编造回测成绩。",
        "对一条自己准备的净值或收益序列计算这些指标，并做样本切分，观察数字有多不稳定。",
      ),
      lesson(
        "finance",
        "backtesting-limits",
        "3.6",
        "回测能证实什么，不能证实什么",
        "过拟合、未来函数与交易成本",
        38,
        "回测只能说明：某个规则在既有样本中的表现如何。它不能单独证明未来期望收益。过拟合、未来函数、生存偏差与忽略成本，会让研究结果看起来远好于它真正知道的东西。",
        "故意写一个带未来函数的规则，记录它有多“好看”，再删掉泄漏后重做，体会差别来自方法而不是市场。",
      ),
    ],
  },
];

export const allLessons: LessonMeta[] = modules.flatMap((item) => item.lessons);

export function getModule(id: string): ModuleMeta | undefined {
  return modules.find((item) => item.id === id);
}

export function getLesson(moduleId: string, slug: string): LessonMeta | undefined {
  return allLessons.find((item) => item.module === moduleId && item.slug === slug);
}

export function getLessonById(id: string): LessonMeta | undefined {
  return allLessons.find((item) => item.id === id);
}

export function getAdjacentLessons(id: string): {
  prev?: LessonMeta;
  next?: LessonMeta;
} {
  const index = allLessons.findIndex((item) => item.id === id);
  if (index < 0) return {};
  return {
    prev: index > 0 ? allLessons[index - 1] : undefined,
    next: index < allLessons.length - 1 ? allLessons[index + 1] : undefined,
  };
}

export const course = {
  title: "量化原理",
  englishTitle: "Quant Foundations",
  tagline: "一门关于量化投资背后的数学、经济学与金融学原理的课程。",
  labNote: "聚宽只是验证原理的实验工具，不是本课的目录主线。",
  disclaimer:
    "这不是投资建议。本站内容仅供学习原理与研究方法，不构成任何证券、基金、期货或其他金融产品的推荐、要约或保证。课程中的图示数据若未另行说明，均为示意，不是真实回测成绩，也不能推断未来收益。",
};
