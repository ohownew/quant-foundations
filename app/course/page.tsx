import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { modules } from "@/content/curriculum";

export const metadata: Metadata = {
  title: "课程正文",
  description: "量化原理课程的全部模块与课文入口。",
};

export default function CourseIndexPage() {
  return (
    <main className="px-4 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="font-sans text-xs tracking-[0.18em] text-gold uppercase">Lessons</p>
        <h1 className="mt-3 font-serif text-4xl">课程正文</h1>
        <p className="mt-4 leading-8 text-ink-soft">
          左侧目录可以跟踪进度。建议按模块顺序阅读；每一课读完后可标记完成。进度只保存在你的浏览器里。
        </p>
        <div className="mt-10 space-y-10">
          {modules.map((mod) => (
            <section key={mod.id}>
              <h2 className="font-serif text-2xl">
                {mod.kicker} · {mod.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{mod.description}</p>
              <ul className="mt-4 divide-y divide-rule border border-rule">
                {mod.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link href={lesson.href} className="block px-4 py-3 no-underline hover:bg-paper-2/70">
                      <p className="font-serif text-lg text-ink">
                        <span className="mr-2 font-mono text-sm text-gold">{lesson.number}</span>
                        {lesson.title}
                      </p>
                      <p className="mt-1 text-sm leading-7 text-ink-soft">{lesson.subtitle}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="mt-10">
          <Disclaimer />
        </div>
      </div>
    </main>
  );
}
