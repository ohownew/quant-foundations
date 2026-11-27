export type ModuleId = "economics" | "mathematics" | "finance";

export type LessonMeta = {
  id: string;
  module: ModuleId;
  slug: string;
  href: string;
  number: string;
  title: string;
  subtitle: string;
  minutes: number;
  summary: string;
  lab?: string;
};

export type ModuleMeta = {
  id: ModuleId;
  order: number;
  title: string;
  kicker: string;
  description: string;
  lessons: LessonMeta[];
};

export type SourceKind = "book" | "paper" | "course" | "site";

export type Source = {
  id: string;
  kind: SourceKind;
  title: string;
  authors?: string;
  detail: string;
  url?: string;
  note?: string;
};
