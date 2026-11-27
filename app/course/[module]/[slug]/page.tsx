import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonArticle } from "@/components/LessonArticle";
import { allLessons, getLesson } from "@/content/curriculum";
import { lessonBodies } from "@/content/lessons";

type PageProps = {
  params: Promise<{ module: string; slug: string }>;
};

export function generateStaticParams() {
  return allLessons.map((lesson) => ({
    module: lesson.module,
    slug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { module, slug } = await params;
  const lesson = getLesson(module, slug);
  if (!lesson) return { title: "未找到课文" };
  return {
    title: `${lesson.number} ${lesson.title}`,
    description: lesson.summary,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { module, slug } = await params;
  const lesson = getLesson(module, slug);
  if (!lesson) notFound();
  const Body = lessonBodies[lesson.id];
  if (!Body) notFound();

  return (
    <LessonArticle lesson={lesson}>
      <Body />
    </LessonArticle>
  );
}
