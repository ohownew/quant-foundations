"use client";

import { useProgress } from "@/lib/progress";

export function MarkComplete({ lessonId }: { lessonId: string }) {
  const { isComplete, toggle, ready } = useProgress();
  const done = isComplete(lessonId);

  return (
    <button
      type="button"
      onClick={() => toggle(lessonId)}
      disabled={!ready}
      className={`rounded-sm border px-3 py-1.5 font-sans text-sm transition-colors ${
        done
          ? "border-pine bg-pine text-paper"
          : "border-rule bg-paper text-ink hover:border-pine hover:text-pine"
      }`}
    >
      {done ? "已标记完成" : "标记本课完成"}
    </button>
  );
}
