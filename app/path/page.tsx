import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { allLessons, course, modules } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "学习路径",
  description: "按经济学、数学与金融学顺序阅读量化原理课程。",
};

export default function PathPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <p className="font-sans text-xs tracking-[0.18em] text-gold uppercase">Curriculum</p>
        <h1 className="mt-3 font-serif text-4xl">学习路径</h1>
        <p className="mt-5 max-w-3xl text-lg leading-9 text-ink-soft">
          建议按这个顺序读：先建立市场与定价的经济学语言，再补上会被反复用到的数学，最后进入组合、因子、风险指标与回测的边界。全部共 {allLessons.length} 课。聚宽练习都放在各课末尾，可以后做。
        </p>

        <ol className="mt-12 space-y-12">
          {modules.map((mod) => (
            <li key={mod.id}>
              <h2 className="font-serif text-2xl">
                {mod.kicker} · {mod.title}
              </h2>
              <p className="mt-2 text-ink-soft leading-7">{mod.description}</p>
              <div className="mt-5 divide-y divide-rule border border-rule bg-white/40">
                {mod.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={lesson.href}
                    className="block px-4 py-4 no-underline transition-colors hover:bg-paper-2/80"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-serif text-lg text-ink">
                        <span className="mr-2 font-mono text-sm text-gold">{lesson.number}</span>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-ink-faint">约 {lesson.minutes} 分钟</p>
                    </div>
                    <p className="mt-1 text-sm leading-7 text-ink-soft">{lesson.subtitle}</p>
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-14 border border-rule p-5">
          <h2 className="font-serif text-2xl">刻意没有放进主线的内容</h2>
          <p className="mt-3 leading-8 text-ink-soft">
            协整交易、高频做市、深度学习选股等内容需要更多前置知识，也更容易把工具细节当成原理。本课把它们留到你掌握有效市场、无套利、估计误差与回测边界之后再自行延伸。López de Prado 的《Advances in Financial Machine Learning》会在回测一章作为提醒出现，但不会成为开课第一章。
          </p>
        </section>
        <div className="mt-10">
          <Disclaimer />
        </div>
        <p className="mt-6 text-sm text-ink-soft">{course.labNote}</p>
      </main>
      <SiteFooter />
    </div>
  );
}
