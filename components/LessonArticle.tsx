import { Disclaimer } from "@/components/Disclaimer";
import { LessonPager } from "@/components/LessonPager";
import { MarkComplete } from "@/components/MarkComplete";
import { getAdjacentLessons, getModule } from "@/content/curriculum";
import type { LessonMeta } from "@/content/types";
import type { ReactNode } from "react";

export function LessonArticle({
  lesson,
  children,
}: {
  lesson: LessonMeta;
  children: ReactNode;
}) {
  const mod = getModule(lesson.module);
  const { prev, next } = getAdjacentLessons(lesson.id);

  return (
    <article className="px-4 py-10 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-[46rem]">
        <p className="font-sans text-xs font-semibold tracking-[0.18em] text-gold uppercase">
          {mod?.kicker} · {mod?.title}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold">
          <span className="mr-3 font-mono text-2xl text-cinnabar">{lesson.number}</span>
          {lesson.title}
        </h1>
        <p className="mt-4 text-xl leading-9 text-ink-soft">{lesson.subtitle}</p>
        <p className="mt-2 font-sans text-sm text-ink-faint">建议阅读时间约 {lesson.minutes} 分钟</p>
        <div className="lesson-body mt-10">{children}</div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
          <MarkComplete lessonId={lesson.id} />
          <Disclaimer compact />
        </div>
        <LessonPager prev={prev} next={next} />
        <div className="mt-10">
          <Disclaimer />
        </div>
      </div>
    </article>
  );
}
