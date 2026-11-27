import katex from "katex";

type MathProps = {
  expr: string;
  block?: boolean;
  ariaLabel?: string;
};

export function Math({ expr, block = false, ariaLabel }: MathProps) {
  const html = katex.renderToString(expr, {
    displayMode: block,
    throwOnError: false,
    output: "html",
    strict: "ignore",
  });

  if (block) {
    return (
      <div
        className="math-block"
        role="img"
        aria-label={ariaLabel ?? expr}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className="math-inline"
      role="img"
      aria-label={ariaLabel ?? expr}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
