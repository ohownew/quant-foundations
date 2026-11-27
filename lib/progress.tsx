"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "quant-foundations-progress";

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot() {
  return "[]";
}

function parseIds(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

type ProgressState = {
  completed: string[];
  ready: boolean;
  isComplete: (id: string) => boolean;
  toggle: (id: string) => void;
  markComplete: (id: string) => void;
};

const ProgressContext = createContext<ProgressState | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const completed = useMemo(() => parseIds(raw), [raw]);
  const ready = raw !== undefined;

  const persist = useCallback((next: string[]) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    emit();
  }, []);

  const toggle = useCallback(
    (id: string) => {
      persist(completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id]);
    },
    [completed, persist],
  );

  const markComplete = useCallback(
    (id: string) => {
      if (!completed.includes(id)) persist([...completed, id]);
    },
    [completed, persist],
  );

  const isComplete = useCallback((id: string) => completed.includes(id), [completed]);

  const value = useMemo(
    () => ({ completed, ready, isComplete, toggle, markComplete }),
    [completed, ready, isComplete, toggle, markComplete],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return ctx;
}
