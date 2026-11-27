import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { modules } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "实验说明",
  description: "如何把聚宽当作验证原理的实验工具，而不是课程本身。",
};

export default function LabPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="font-sans text-xs tracking-[0.18em] text-gold uppercase">Laboratory</p>
        <h1 className="mt-3 font-serif text-4xl">把聚宽当作实验室</h1>
        <p className="mt-5 text-lg leading-9 text-ink-soft">
          本课的主线是原理。聚宽（JoinQuant）只是一个可选的研究环境：你可以在里面取行情、写几行统计或回归，看看课堂上的定义在数据上长什么样。它不是目录结构，也不承担“教你如何点回测按钮”的任务。
        </p>
        <h2 className="mt-10 font-serif text-2xl">建议的使用方式</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 leading-8 text-ink-soft">
          <li>先读完当课的概念与公式，明确自己要验证哪一句话。</li>
          <li>打开研究环境（笔记本），只写能够对应该原理的最小代码：描述统计、相关、回归、滚动窗口或一个故意写坏的对照实验。</li>
          <li>记录样本区间、频率、复权方式与缺失值处理。换一段样本，看结论是否还站得住。</li>
          <li>不要把一次练习的收益率、夏普比率或回撤写成“策略业绩”。若必须报告数字，应同时报告它们对样本的敏感性。</li>
          <li>本站不连接聚宽账号，也不需要、不应写入任何 API 密钥。</li>
        </ol>
        <h2 className="mt-10 font-serif text-2xl">各课练习一览</h2>
        <div className="mt-5 divide-y divide-rule border border-rule">
          {modules.flatMap((mod) =>
            mod.lessons.map((lesson) => (
              <div key={lesson.id} className="px-4 py-4">
                <p className="font-sans text-xs text-gold">
                  {lesson.number} · {mod.title}
                </p>
                <p className="font-serif text-lg">
                  <Link href={lesson.href}>{lesson.title}</Link>
                </p>
                <p className="mt-1 text-sm leading-7 text-ink-soft">{lesson.lab}</p>
              </div>
            )),
          )}
        </div>
        <p className="mt-8 leading-8 text-ink-soft">
          如果你更习惯其他研究环境，完全可以改用本地 Python、R 或其他平台完成同样的练习。工具可以替换，原理不能替换。聚宽文档见
          <a href="https://www.joinquant.com/" target="_blank" rel="noopener noreferrer">
            joinquant.com
          </a>
          。
        </p>
        <div className="mt-10">
          <Disclaimer />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
