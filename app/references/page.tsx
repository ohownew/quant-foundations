import type { Metadata } from "next";
import { Disclaimer } from "@/components/Disclaimer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { sources } from "@/content/sources";
import type { SourceKind } from "@/content/types";

export const metadata: Metadata = {
  title: "参考书目",
  description: "本课程实际查阅并引用的教材、论文、公开课程与网站。",
};

const labels: Record<SourceKind, string> = {
  book: "教材与专著",
  paper: "经典论文",
  course: "公开课程与职业材料",
  site: "网站、数据与专栏",
};

const order: SourceKind[] = ["book", "paper", "course", "site"];

export default function ReferencesPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="font-sans text-xs tracking-[0.18em] text-gold uppercase">Bibliography</p>
        <h1 className="mt-3 font-serif text-4xl">参考书目</h1>
        <p className="mt-5 text-lg leading-9 text-ink-soft">
          下列来源都在筹备课程时实际查阅过，并在正文中被引用或作为结构依据。本站只做引用与概括，不提供受版权保护的书籍或文章的全文转载。链接指向出版社、期刊或作者公开页面；若个别链接日后失效，请按作者与标题检索。
        </p>
        {order.map((kind) => (
          <section key={kind} className="mt-12">
            <h2 className="font-serif text-2xl">{labels[kind]}</h2>
            <ol className="mt-5 space-y-5">
              {sources
                .filter((item) => item.kind === kind)
                .map((item) => (
                  <li key={item.id} className="border-b border-rule pb-5">
                    <p className="font-serif text-lg">
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </p>
                    {item.authors ? <p className="mt-1 text-sm text-ink-soft">{item.authors}</p> : null}
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{item.detail}</p>
                    {item.note ? <p className="mt-1 text-xs text-ink-faint">{item.note}</p> : null}
                  </li>
                ))}
            </ol>
          </section>
        ))}
        <p className="mt-10 leading-8 text-ink-soft">
          站内引用遵循同样的原则：能给出书名、论文或可访问链接的才写进去，不编造出处。这不是一份穷尽的量化文献目录，而是支撑本课路径的核心清单。
        </p>
        <div className="mt-10">
          <Disclaimer />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
