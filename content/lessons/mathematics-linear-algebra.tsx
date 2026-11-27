import { KeyPoints, LabBox, Note } from "@/components/Callouts";
import { Cite } from "@/components/Cite";
import { Math } from "@/components/Math";

export default function Lesson() {
  return (
    <>
      <KeyPoints>
        <ul>
          <li>一组资产的收益是向量，组合权重也是向量；组合收益是权重与收益的内积。</li>
          <li>组合方差是二次型 <Math expr="w^{\top}\Sigma w" />，其中 <Math expr="\Sigma" /> 必须是对称的半正定协方差矩阵。</li>
          <li>分散化是否有效，取决于协方差而不是只取决于各自波动；估计 <Math expr="\Sigma" /> 本身会引入可观的误差。</li>
        </ul>
      </KeyPoints>

      <h2>从一只证券到一排证券</h2>
      <p>
        当资产多于一个，用标量叙述会很快变得笨拙。把单期收益写成列向量 <Math expr="R=(R_1,\ldots,R_N)^{\top}" />，把组合权重写成 <Math expr="w=(w_1,\ldots,w_N)^{\top}" />，通常还有预算约束 <Math expr="w^{\top}\mathbf{1}=1" />。组合收益就是内积
      </p>
      <Math expr="R_p = w^{\top} R." block />
      <p>
        取期望，得到 <Math expr="\mathbb{E}[R_p]=w^{\top}\mu" />，其中 <Math expr="\mu=\mathbb{E}[R]" />。这看起来只是记法上的节省，但它让“许多资产如何共同决定一个结果”变成线性代数里的标准对象，也让后面的优化问题可以写得干净。
      </p>

      <h2>协方差矩阵与二次型</h2>
      <p>
        组合方差不能由各资产方差简单相加得到，因为资产一起变动。定义协方差矩阵 <Math expr="\Sigma" />，其第 <Math expr="(i,j)" /> 个元素是 <Math expr="\mathrm{Cov}(R_i,R_j)" />，对角线就是各资产方差。于是
      </p>
      <Math expr="\mathrm{Var}(R_p)=w^{\top}\Sigma w." block />
      <p>
        对两个资产展开，就是常常见到的
      </p>
      <Math expr="\sigma_p^2=w_1^2\sigma_1^2+w_2^2\sigma_2^2+2w_1 w_2\rho\sigma_1\sigma_2." block />
      <p>
        交叉项里的相关系数决定了分散化的空间：<Math expr="\rho" /> 越小，同样的波动越可能互相抵消。若所有资产完全正相关，矩阵会退化成更“瘦”的结构，分散化几乎帮不上忙。
      </p>
      <p>
        作为协方差矩阵，<Math expr="\Sigma" /> 必须对称，并且对任意权重都有 <Math expr="w^{\top}\Sigma w\ge 0" />，也就是半正定。若你从数据里估出一个不对称或不满足半正定的矩阵，那不是市场的新性质，而是估计或数值误差，不能直接送进优化器。
      </p>

      <h2>分散化在矩阵语言里的含义</h2>
      <p>
        考虑等权组合 <Math expr="w_i=1/N" />。若所有方差相等、所有相关系数等于同一个 <Math expr="\rho" />，则组合方差近似为
      </p>
      <Math expr="\sigma_p^2=\dfrac{1}{N}\,\bar\sigma^2 + \left(1-\dfrac{1}{N}\right)\rho\,\bar\sigma^2." block />
      <p>
        当 <Math expr="N" /> 变大，第一项消失，第二项留存。这就是“分散化能去掉的是彼此不完全相关的那部分，去不掉共同变动的部分”的最简单代数版本。Bodie、Kane 与 Marcus 用类似的例子说明分散化的力量与边界；后面讨论系统风险时，会把“留存下来的部分”命名为因子风险。
      </p>
      <Note>
        代数上很干净的矩阵，在样本里却可能很嘈杂。证券数量变多时，需要估计的协方差参数以大约 <Math expr="N(N+1)/2" /> 的速度增长，而独立的时间观测并不会同样快地增加。输入误差会在下一步优化里被放大。这是均值–方差方法最现实的弱点之一。
      </Note>

      <LabBox title="练习：亲手构造并检查一个协方差矩阵">
        <p>
          选择 4 到 8 只证券，用同一段样本估计协方差矩阵与相关矩阵。确认矩阵对称、对角线等于各序列的方差，并检查最小特征值是否非负。然后把样本切成前后两段，比较两段相关矩阵的差别。
        </p>
        <p>
          练习的重点不是得到一张“正确”的矩阵，而是看见估计对样本有多敏感。若最小特征值接近 0 或为负，记录你准备怎样处理（缩短资产名单、增加样本，或使用更有结构的估计），但先不必展开复杂的收缩估计细节。
        </p>
      </LabBox>

      <h2>延伸阅读</h2>
      <ul>
        <li>
          <Cite id="bodie" /> 中关于组合风险与分散化的章节。
        </li>
        <li>
          <Cite id="markowitz-1952" />：把协方差结构写成组合选择的核心输入。
        </li>
        <li>
          <Cite id="quantopian" /> 中关于线性代数与组合风险的讲座。
        </li>
      </ul>
    </>
  );
}
