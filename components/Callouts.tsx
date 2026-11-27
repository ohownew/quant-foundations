import type { ReactNode } from "react";

export function KeyPoints({ children }: { children: ReactNode }) {
  return (
    <section className="border border-rule bg-[#f8f4ec] px-5 py-4">
      <p className="font-sans text-xs font-semibold tracking-[0.14em] text-pine uppercase">本课要点</p>
      <div className="mt-2 text-[0.98rem] leading-7 text-ink">{children}</div>
    </section>
  );
}

export function LabBox({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="border border-pine/25 bg-[#eef3ef] px-5 py-5">
      <p className="font-sans text-xs font-semibold tracking-[0.14em] text-pine uppercase">
        聚宽实验 · 配角练习
      </p>
      <h3 className="!mt-2 !mb-3 !border-0 !text-lg">{title ?? "用研究环境验证原理"}</h3>
      <div className="text-[0.98rem] leading-7">{children}</div>
      <p className="mt-3 font-sans text-xs leading-5 text-ink-soft">
        实验用来核对原理，不是本课的主线。不必登录本站，也不要把 API 密钥写进任何课程文件。若使用真实行情，请自行记录样本区间，不要把一次练习的数字当成可重复的业绩。
      </p>
    </section>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <aside className="border-l-2 border-gold bg-paper-2/80 px-4 py-3 text-[0.98rem] leading-7 text-ink-soft">
      {children}
    </aside>
  );
}

export function FigureCaption({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 font-sans text-xs leading-5 text-ink-soft">
      <span className="font-semibold tracking-wide text-gold">示意 · </span>
      {children}
    </p>
  );
}
