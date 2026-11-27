import { sourceById } from "@/content/sources";

export function Cite({ id, pages }: { id: string; pages?: string }) {
  const source = sourceById(id);
  const label = source.authors ? `${source.authors}，${source.title}` : source.title;
  const text = pages ? `${label}，${pages}` : label;

  if (source.url) {
    return (
      <a href={source.url} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );
  }

  return <span>{text}</span>;
}
