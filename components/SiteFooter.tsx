import Link from "next/link";
import { course } from "@/content/curriculum";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-paper-2/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm leading-7 text-ink-soft sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-serif text-base text-ink">量化原理</p>
          <nav className="flex flex-wrap gap-4">
            <Link href="/path">学习路径</Link>
            <Link href="/lab">实验说明</Link>
            <Link href="/references">参考书目</Link>
          </nav>
        </div>
        <p>{course.disclaimer}</p>
        <p>课程在浏览器本地记录阅读进度，无需登录，也不连接任何交易所或券商账户。</p>
      </div>
    </footer>
  );
}
