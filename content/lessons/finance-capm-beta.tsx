import { KeyPoints, LabBox, Note } from "@/components/Callouts";
import { Cite } from "@/components/Cite";
import { BetaDecomposition } from "@/components/viz/BetaDecomposition";
import { Math } from "@/components/Math";

export default function Lesson() {
  return (
    <>
      <KeyPoints>
        <ul>
          <li>CAPM 给出均衡关系：证券的期望超额收益与它对市场组合的 beta 成正比。</li>
          <li>beta 是回归斜率，也是系统风险的度量；截距 alpha 是相对该基准的平均偏离。</li>
          <li>检验 CAPM 很困难，因为真正的市场组合不可直接观测，这是 Roll（1977）批判的核心。</li>
        </ul>
      </KeyPoints>

      <h2>从最优组合到一条定价直线</h2>
      <p>
        若所有投资者都按均值–方差选择，并且他们面对同样的输入、同样的无风险利率，那么他们会持有同一个切点风险组合。在均衡里，这个组合必须是市场组合：所有可交易风险资产按市值加权的整体。否则，无人持有的资产会没有需求，价格就还没有达到均衡。
      </p>
      <p>
        Sharpe（1964）由此得到资本资产定价模型。证券 <Math expr="i" /> 的期望收益满足
      </p>
      <Math expr="\mathbb{E}[R_i]=R_f+\beta_i\bigl(\mathbb{E}[R_m]-R_f\bigr),\quad \beta_i=\dfrac{\mathrm{Cov}(R_i,R_m)}{\mathrm{Var}(R_m)}." block />
      <p>
        在超额收益的均值–beta 平面上，这是一条经过原点和市场点的直线，称为证券市场线（SML）。被定价的不是证券自己的全部波动，而是它与市场的共同变动。Lintner 与 Mossin 在相近时期给出了相关推导；教学上通常以 Sharpe–Lintner 形式作为起点。
      </p>

      <h2>把 beta 看成一条回归</h2>
      <p>
        单指数或市场模型把实现收益写成
      </p>
      <Math expr="R_{i,t}-R_{f,t}=\alpha_i+\beta_i(R_{m,t}-R_{f,t})+\varepsilon_{i,t}." block />
      <p>
        若 CAPM 成立，则 <Math expr="\alpha_i=0" />，且残差与市场无关。估计出的 <Math expr="\hat\beta_i" /> 告诉你：市场超额收益变动百分之一时，该证券超额收益平均变动多少；<Math expr="\hat\alpha_i" /> 则是样本内相对这条直线的平均偏离。残差波动是模型没解释的部分。下面的示意散点可以让你看到：增大残差会让点云变胖，R² 下降，但斜率仍然试图抓住共同运动。
      </p>
      <BetaDecomposition />

      <h2>假设、含义与常见误读</h2>
      <p>
        标准 CAPM 需要严厉的假设：投资者均值–方差优化、预期一致、无摩擦地借贷、市场组合可投资，等等。这些假设被放松后，出现了零 beta 形式、消费 CAPM 等扩展，Bodie、Kane 与 Marcus 以及 Cochrane 都有讨论。对学习者更要紧的是分清含义：
      </p>
      <ul>
        <li>高 beta 不是“更好的股票”，它只是要求更高的期望补偿；实现收益完全可以在很长样本里令人失望。</li>
        <li>低波动若伴随着低 beta，可能只是更少的系统风险，而不自动是“更优”。</li>
        <li>样本 alpha 显著，既可能是误定价，也可能是基准错误，还可能是运气。</li>
      </ul>
      <Note>
        Roll（1977）指出，真正的市场组合应包含所有风险资产，而我们通常只用一个股票指数来代替。对替代组合做检验，即使拒绝或接受，也不等于判决了 CAPM 本身。因此，把“对某指数的回归”谨慎地称为市场模型估计，比直接宣布“CAPM 已被证明/证伪”更准确。
      </Note>

      <LabBox title="练习：估计一条证券市场特征线，只解释系数">
        <p>
          选择一只证券和一个你愿意当作市场代理的指数，把超额收益对市场超额收益做普通最小二乘回归，报告 alpha、beta、R² 与残差标准差，并写明样本区间与无风险利率的定义。
        </p>
        <p>
          用文字解释：有多少波动被市场解释，有多少是残差。不要把 alpha 改写成“该股票每月能多赚多少”的承诺，也不要在本练习里加入择时或过滤规则。
        </p>
      </LabBox>

      <h2>延伸阅读</h2>
      <ul>
        <li>
          <Cite id="sharpe-1964" />
        </li>
        <li>
          <Cite id="bodie" /> 与 <Cite id="cochrane" /> 中的 CAPM 章节。
        </li>
        <li>
          <Cite id="roll-1977" />
        </li>
      </ul>
    </>
  );
}
