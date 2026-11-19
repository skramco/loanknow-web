export const SESSION_PREFIX = "loanknow:session:v1:";

export type QuestionSession = {
  question: string;
  unavailableMessage?: string;
  code?: string;
};

export function readSession(id: string): QuestionSession | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(`${SESSION_PREFIX}${id}`);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as QuestionSession;
    if (typeof data.question !== "string") return null;
    return data;
  } catch {
    return null;
  }
}

export function writeSession(id: string, data: QuestionSession): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(`${SESSION_PREFIX}${id}`, JSON.stringify(data));
}