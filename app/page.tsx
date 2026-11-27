import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { course, modules, allLessons } from "@/content/curriculum";

const firstLesson = allLessons[0];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="border-b border-rule bg-[radial-gradient(circle_at_top_right,#efe4cf,transparent_42%),linear-gradient(#f7f2e8,#f3eee4)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_0.8fr] lg:py-24">
            <div>
              <p className="font-sans text-xs font-semibold tracking-[0.22em] text-gold uppercase">
                Quant Foundations
              </p>
              <h1 className="mt-4 font-serif text-5xl leading-tight font-semibold tracking-wide text-ink sm:text-6xl">
                量化原理
              </h1>
              <p className="mt-6 max-w-2xl font-serif text-xl leading-9 text-ink-soft">
                {course.tagline}课程的核心是市场为什么可以被建模，收益与风险应如何度量，以及均衡与无套利给出怎样的约束。
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-ink-soft">
                {course.labNote}你不会从“如何点回测”开始，也不会在还没有概率与定价语言之前被推进因子指标或机器学习。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={firstLesson.href}
                  className="bg-cinnabar px-5 py-2.5 font-sans text-sm text-paper no-underline hover:bg-cinnabar-soft"
                >
                  从第一课开始
                </Link>
                <Link
                  href="/path"
                  className="border border-ink/20 bg-paper px-5 py-2.5 font-sans text-sm text-ink no-underline hover:border-pine"
                >
                  查看学习路径
                </Link>
              </div>
            </div>
            <aside className="border border-rule bg-paper/80 p-6 shadow-[6px_8px_0_rgba(27,25,20,0.04)]">
              <div className="flex items-center gap-3">
                <Logo />
                <div>
                  <p className="font-serif text-lg">三块基石，一条主线</p>
                  <p className="text-sm text-ink-soft">共 {allLessons.length} 课，按原理推进</p>
                </div>
              </div>
              <ol className="mt-6 space-y-4 text-sm leading-6">
                {modules.map((mod) => (
                  <li key={mod.id} className="border-t border-rule pt-4 first:border-0 first:pt-0">
                    <p className="font-sans text-xs tracking-[0.16em] text-gold uppercase">
                      {mod.kicker}
                    </p>
                    <p className="font-serif text-lg text-ink">{mod.title}</p>
                    <p className="text-ink-soft">{mod.description}</p>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="font-serif text-3xl">这门课怎样读</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "原理先于工具",
                body: "目录按经济学、数学、金融学组织。聚宽可以用来做短实验，但任何一课都可以先读完原理再决定是否上机。",
              },
              {
                title: "由问题引出公式",
                body: "数学不是单独的公式手册。期望、协方差、最优化与平稳性，都会从“我们想回答什么金融问题”说起。",
              },
              {
                title: "不编造成绩",
                body: "风险指标用公式讲清。互动图里的数字都会标成示意。回测一章专门讨论它能证明什么、不能证明什么。",
              },
            ].map((item) => (
              <article key={item.title} className="border border-rule bg-white/50 p-5">
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-rule bg-paper-2/50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-serif text-3xl">课程目录</h2>
              <Link href="/course" className="text-sm text-cinnabar">
                进入课程正文
              </Link>
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              {modules.map((mod) => (
                <article key={mod.id} className="border border-rule bg-paper p-5">
                  <p className="font-sans text-xs tracking-[0.16em] text-gold uppercase">{mod.kicker}</p>
                  <h3 className="mt-2 font-serif text-2xl">{mod.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{mod.description}</p>
                  <ol className="mt-5 space-y-2 text-sm">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <Link href={lesson.href} className="text-ink no-underline hover:text-cinnabar">
                          <span className="mr-2 font-mono text-xs text-gold">{lesson.number}</span>
                          {lesson.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="font-serif text-3xl">参考从哪里来</h2>
          <p className="mt-4 max-w-3xl leading-8 text-ink-soft">
            课程结构参考了投资学与资产定价中广泛使用的教材和公开课程，包括 Bodie、Kane 与 Marcus 的《Investments》，Markowitz、Sharpe、Fama、French、Ross 的经典论文，Cochrane 的《Asset Pricing》，Campbell、Lo 与 MacKinlay 的金融计量教材，以及 Tsay 的金融时间序列、Grinold 与 Kahn 的主动管理、公开的 Quantopian / QuantRocket 讲座、QuantStart 自学路径、AQR 与 Alpha Architect 的公开文章，和 CFA Institute 的公开复习材料。站内只引用与概括，不粘贴受版权保护的书籍或文章正文。
          </p>
          <Link href="/references" className="mt-4 inline-block text-sm text-cinnabar">
            查看完整书目与链接
          </Link>
          <div className="mt-10 max-w-3xl">
            <Disclaimer />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
