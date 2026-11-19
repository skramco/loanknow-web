import { HISTORY_STORAGE_KEY } from "./constants";

export type LocalQuestion = {
  id: string;
  title: string;
  createdAt: string;
};

export function trimTitle(question: string, max = 48): string {
  const q = question.trim().replace(/\s+/g, " ");
  if (q.length <= max) return q;
  return `${q.slice(0, max - 1).trimEnd()}…`;
}

export function createQuestionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `q-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function parseHistory(raw: string | null): LocalQuestion[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (item): item is LocalQuestion =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as LocalQuestion).id === "string" &&
        typeof (item as LocalQuestion).title === "string",
    );
  } catch {
    return [];
  }
}

export function serializeHistory(items: LocalQuestion[]): string {
  return JSON.stringify(items.slice(0, 50));
}

export function readHistoryFromStorage(): LocalQuestion[] {
  if (typeof window === "undefined") return [];
  return parseHistory(window.localStorage.getItem(HISTORY_STORAGE_KEY));
}

export function writeHistoryToStorage(items: LocalQuestion[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HISTORY_STORAGE_KEY, serializeHistory(items));
}

export function addQuestionToHistory(
  items: LocalQuestion[],
  question: string,
  id?: string,
): LocalQuestion[] {
  const entry: LocalQuestion = {
    id: id ?? createQuestionId(),
    title: trimTitle(question),
    createdAt: new Date().toISOString(),
  };
  const next = [entry, ...items.filter((i) => i.id !== entry.id)];
  return next;
}