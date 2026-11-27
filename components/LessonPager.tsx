import Link from "next/link";
import type { LessonMeta } from "@/content/types";

export function LessonPager({ prev, next }: { prev?: LessonMeta; next?: LessonMeta }) {
  return (
    <nav className="mt-12 grid gap-4 border-t border-rule pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="border border-rule bg-paper px-4 py-3 no-underline transition-colors hover:border-pine"
        >
          <p className="font-sans text-xs tracking-wide text-ink-faint">上一课</p>
          <p className="mt-1 font-serif text-ink">
            {prev.number} {prev.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="border border-rule bg-paper px-4 py-3 text-right no-underline transition-colors hover:border-cinnabar sm:justify-self-end"
        >
          <p className="font-sans text-xs tracking-wide text-ink-faint">下一课</p>
          <p className="mt-1 font-serif text-ink">
            {next.number} {next.title}
          </p>
        </Link>
      ) : null}
    </nav>
  );
}
