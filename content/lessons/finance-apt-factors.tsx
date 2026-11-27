import { KeyPoints, LabBox, Note } from "@/components/Callouts";
import { Cite } from "@/components/Cite";
import { Math } from "@/components/Math";

export default function Lesson() {
  return (
    <>
      <KeyPoints>
        <ul>
          <li>APT 从无套利出发：若收益由若干因子加上可分散残差生成，则期望收益应近似等于因子暴露的线性组合。</li>
          <li>Fama 与 French（1993）用市场、规模与价值构造了影响深远的三因子经验模型；动量常作为第四个因子出现。</li>
          <li>因子既可以是风险的价格，也可以被解释为持续的错误定价；区分二者需要理论与样本外证据，而不是一张历史表格。</li>
        </ul>
      </KeyPoints>

      <h2>当一个市场因子不够用</h2>
      <p>
        CAPM 把所有系统风险压到市场组合上。经验上，不同股票的平均收益差异，并不能被 beta 完全说明。规模、账面市值比、过往收益等特征，反复与截面平均收益一起变动。要把这些差异写进一个融贯的框架，有两条相互补充的路：一条是 Ross（1976）的套利定价理论，一条是 Fama 与 French 式的经验因子模型。
      </p>

      <h2>APT：用无套利约束因子结构</h2>
      <p>
        设证券收益由 <Math expr="K" /> 个因子生成
      </p>
      <Math expr="R_i=\mathbb{E}[R_i]+\beta_{i1}f_1+\cdots+\beta_{iK}f_K+\varepsilon_i," block />
      <p>
        残差在充分分散的组合里几乎消失。若因子暴露相近的两个充分分散组合，期望收益却持续不同，交易者就可以买入便宜的一侧、卖出昂贵的一侧，构造近似套利。为了排除这种机会，期望收益必须近似满足
      </p>
      <Math expr="\mathbb{E}[R_i]\approx R_f+\beta_{i1}\lambda_1+\cdots+\beta_{iK}\lambda_K," block />
      <p>
        其中 <Math expr="\lambda_k" /> 是第 k 个因子的风险价格。APT 并不先验指定因子是什么，它只给出结构：有因子结构，再加上无套利，就会有线性的期望收益关系。Cochrane 会强调它与均衡定价的联系与差别：APT 依赖可交易组合的近似套利，而不必从偏好中推导市场组合。
      </p>

      <h2>Fama–French 与其后的常见因子</h2>
      <p>
        Fama 与 French（1993）提出，除市场超额收益外，规模因子 SMB（小市值减去大市值）与价值因子 HML（高账面市值比减去低账面市值比）能够共同描述许多股票组合的收益差异。1996 年的论文进一步讨论，若干原先被称为异象的形态，如何被多因子框架重新解释。Carhart（1997）在基金业绩研究中加入动量，形成常见的四因子设定。
      </p>
      <p>
        这些因子的官方构造与历史序列，可在 Kenneth French 的数据库免费获得，这是复现与教学中最标准的公共来源之一。AQR 的公开研究，例如 Asness、Moskowitz 与 Pedersen 的 “Value and Momentum Everywhere”，则把价值与动量放到多种资产类别中考察，并强调二者较低的相关性。Alpha Architect 的公开文章提供了更偏实践的因子暴露入门。
      </p>
      <table>
        <thead>
          <tr>
            <th>常见因子</th>
            <th>直观构造</th>
            <th>阅读起点</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>市场</td>
            <td>广泛市场组合相对无风险利率的超额收益</td>
            <td>Sharpe；Fama–French</td>
          </tr>
          <tr>
            <td>规模 SMB</td>
            <td>小市值组合减大市值组合</td>
            <td>Fama–French 1993；French 数据库</td>
          </tr>
          <tr>
            <td>价值 HML</td>
            <td>高账面市值比减低账面市值比</td>
            <td>Fama–French 1993、1996</td>
          </tr>
          <tr>
            <td>动量</td>
            <td>近期末表现好的组合减表现差的组合（具体窗口因研究而异）</td>
            <td>Carhart 1997；AQR 公开论文</td>
          </tr>
        </tbody>
      </table>
      <Note>
        不要把因子收益的长期历史平均值写成“未来可锁定的产量”。即便某个因子在很长样本里平均为正，它也可以经历极长的低迷，其解释也可以在“风险补偿”与“行为错误定价”之间摆动。本课要求你先会写模型、会做回归、会读因子定义，再参与这场解释之争。
      </Note>

      <h2>怎样检验，而不是怎样背名单</h2>
      <p>
        时间序列回归把一个组合的超额收益写到因子上，估计暴露与 alpha。截面回归则问：不同资产的平均收益，是否随暴露而变化。两种方法都依赖样本，都受多重检验困扰。公开的 Quantopian 讲座和 Cochrane 的课程都把因子回归当作核心技能，正因为它连接了理论陈述与可重复的计算，而不是因为某张因子名单已经结束了研究。
      </p>

      <LabBox title="练习：阅读因子定义，并做一次时间序列回归">
        <p>
          打开 Kenneth French Data Library，阅读市场、SMB、HML 的构造说明（注意收益以百分数记录等细节）。然后在研究环境中，把一条股票或一个组合的超额收益对这三个因子回归，报告暴露、alpha 与 R²，并写明样本区间。
        </p>
        <p>
          比较只对市场回归与对三因子回归时 alpha 的变化。把变化解释为“基准更丰富之后，未被说明的平均收益如何改变”，而不是“找到了更强的交易信号”。
        </p>
      </LabBox>

      <h2>延伸阅读</h2>
      <ul>
        <li>
          <Cite id="ross-1976" />
        </li>
        <li>
          <Cite id="fama-french-1993" /> 与 <Cite id="fama-french-1996" />
        </li>
        <li>
          <Cite id="carhart-1997" />、<Cite id="asness-2013" />、<Cite id="french-library" />、<Cite id="alpha-architect-factor" />
        </li>
      </ul>
    </>
  );
}
