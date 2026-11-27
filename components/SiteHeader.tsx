import Link from "next/link";
import { Logo } from "@/components/Logo";

const links = [
  { href: "/path", label: "学习路径" },
  { href: "/course", label: "课程正文" },
  { href: "/lab", label: "实验说明" },
  { href: "/references", label: "参考书目" },
];

export function SiteHeader({ dim = false }: { dim?: boolean }) {
  return (
    <header
      className={`sticky top-0 z-40 border-b border-rule/80 backdrop-blur ${
        dim ? "bg-sidebar/95 text-paper" : "bg-paper/90 text-ink"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Logo className="h-8 w-8 shrink-0" />
          <span className="font-serif text-lg font-semibold tracking-wide">
            量化原理
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={dim ? "text-sidebar-muted hover:text-paper" : "text-ink-soft hover:text-cinnabar"}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className={`hidden text-xs tracking-wide sm:block ${dim ? "text-sidebar-muted" : "text-ink-faint"}`}>
          这不是投资建议
        </p>
      </div>
    </header>
  );
}
