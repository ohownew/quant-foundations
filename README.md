# 量化原理

一门关于量化投资背后的**数学、经济学与金融学原理**的中文课程网站。

课程核心是原理，不是软件操作。聚宽（JoinQuant）只作为各课末尾的可选实验工具，用来验证课堂上的定义与公式，并不构成目录主线。你不会从“如何点回测”开始。

**这不是投资建议。** 本仓库与网站中的内容仅供学习原理与研究方法，不构成任何证券、基金、期货或其他金融产品的推荐、要约或保证。互动图与示例中的数字若未另行说明，均为示意，不是真实回测成绩，也不能推断未来收益。

## 本地运行

需要安装 Node.js（建议 20 或更高版本）与 npm。

```bash
npm install
npm run dev
```

在浏览器中打开提示的本地地址（通常是 `http://localhost:3000`）。

## 构建

```bash
npm run build
```

构建成功后，可用 `npm run start` 预览生产版本。本项目使用 Next.js App Router，页面均为静态可预渲染的课程内容，便于之后部署到 Vercel Hobby。站点不需要环境变量，也不连接任何交易所或聚宽账号；请不要添加 `.env` 或写入 API 密钥。

## 课程结构

1. **经济学**：市场为何可被建模；有效市场与市场失效；无套利；风险、盈余与效用；信息与价格。
2. **数学**：由金融问题引出的概率与统计、线性代数（收益向量与协方差矩阵）、均值–方差最优化、时间序列与随机过程基础。
3. **金融学**：投资组合理论与有效前沿、CAPM 与 beta、系统风险与个股风险、APT 与因子模型、风险指标，以及回测能证实和不能证实的事情。

完整课文入口在 `/course`，学习路径在 `/path`，参考书目在 `/references`，实验说明在 `/lab`。

## 参考来源

课程结构参考了广泛使用的教材、经典论文与公开课程，包括但不限于 Bodie, Kane & Marcus《Investments》，Markowitz、Sharpe、Fama、French、Ross 的论文，Cochrane《Asset Pricing》，Campbell, Lo & MacKinlay《The Econometrics of Financial Markets》，Tsay《Analysis of Financial Time Series》，Grinold & Kahn《Active Portfolio Management》，以及公开的 Quantopian / QuantRocket 讲座、QuantStart、AQR、Alpha Architect、CFA Institute 与 Kenneth French 数据库。站内只引用与概括，不转载受版权保护的书籍或文章正文。完整清单见网站的「参考书目」页。

## 许可与贡献

本仓库用于公开的课程网站草稿。引用他人著作时请回到原始出处。使用本材料产生的任何投资决策，由使用者自行承担后果。
