import { course } from "@/content/curriculum";

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs leading-5 text-ink-soft">
        这不是投资建议。示意数据不是真实回测成绩，也不能推断未来收益。
      </p>
    );
  }

  return (
    <aside className="border border-rule bg-paper-2/70 px-4 py-3 text-sm leading-6 text-ink-soft">
      <p className="font-sans font-semibold tracking-wide text-cinnabar">这不是投资建议</p>
      <p className="mt-1">{course.disclaimer}</p>
    </aside>
  );
}
