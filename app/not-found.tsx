import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="font-mono text-sm text-gold">404</p>
        <h1 className="mt-3 font-serif text-3xl">没有找到这一页</h1>
        <p className="mt-4 text-ink-soft">它可能尚未写入课程，或链接已经变更。</p>
        <Link href="/" className="mt-8 inline-block text-cinnabar">
          回到首页
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
