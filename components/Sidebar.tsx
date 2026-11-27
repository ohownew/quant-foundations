"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { modules, allLessons } from "@/content/curriculum";
import { useProgress } from "@/lib/progress";

export function Sidebar() {
  const pathname = usePathname();
  const { completed, ready } = useProgress();
  const total = allLessons.length;
  const done = ready ? completed.length : 0;
  const percent = Math.round((done / total) * 100);

  return (
    <aside className="flex h-full flex-col bg-sidebar text-paper">
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/" className="font-serif text-xl font-semibold tracking-wide text-paper no-underline">
          量化原理
        </Link>
        <p className="mt-2 text-xs leading-5 text-sidebar-muted">数学 · 经济学 · 金融学</p>
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-[11px] tracking-wide text-sidebar-muted">
            <span>模块进度</span>
            <span>
              {done}/{total}
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/10">
            <div className="h-1.5 bg-cinnabar-soft transition-all" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {modules.map((mod) => (
          <div key={mod.id} className="mb-6">
            <p className="px-2 text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
              {mod.kicker} · {mod.title}
            </p>
            <ul className="mt-2 space-y-0.5">
              {mod.lessons.map((lesson) => {
                const active = pathname === lesson.href;
                const checked = completed.includes(lesson.id);
                return (
                  <li key={lesson.id}>
                    <Link
                      href={lesson.href}
                      className={`flex items-start gap-2 rounded-sm px-2 py-2 text-sm leading-5 no-underline transition-colors ${
                        active ? "bg-white/10 text-paper" : "text-sidebar-muted hover:bg-white/5 hover:text-paper"
                      }`}
                    >
                      <span
                        className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                          checked ? "border-pine-soft bg-pine-soft text-paper" : "border-white/25"
                        }`}
                        aria-hidden="true"
                      >
                        {checked ? "✓" : ""}
                      </span>
                      <span>
                        <span className="mr-1 font-mono text-[11px] text-gold">{lesson.number}</span>
                        {lesson.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <div className="space-y-1 border-t border-white/10 px-2 pt-4 text-sm">
          <Link href="/path" className="block text-sidebar-muted hover:text-paper">
            学习路径
          </Link>
          <Link href="/lab" className="block text-sidebar-muted hover:text-paper">
            实验说明
          </Link>
          <Link href="/references" className="block text-sidebar-muted hover:text-paper">
            参考书目
          </Link>
        </div>
      </nav>
    </aside>
  );
}
