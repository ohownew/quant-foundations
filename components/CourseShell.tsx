"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ProgressProvider } from "@/lib/progress";

export function CourseShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ProgressProvider>
      <div className="min-h-screen bg-paper lg:grid lg:grid-cols-[18.5rem_minmax(0,1fr)]">
        <div
          className={`fixed inset-y-0 left-0 z-40 w-[18.5rem] transform border-r border-black/30 transition-transform lg:static lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
        {open ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
            aria-label="关闭目录"
            onClick={() => setOpen(false)}
          />
        ) : null}
        <div className="min-w-0">
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-rule bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
            <button
              type="button"
              className="border border-rule px-3 py-1.5 text-sm"
              onClick={() => setOpen(true)}
            >
              课程目录
            </button>
            <p className="text-xs text-ink-faint">这不是投资建议</p>
          </div>
          {children}
        </div>
      </div>
    </ProgressProvider>
  );
}
