"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addQuestionToHistory,
  createQuestionId,
  readHistoryFromStorage,
  writeHistoryToStorage,
  type LocalQuestion,
} from "@/lib/history";

type HistoryContextValue = {
  history: LocalQuestion[];
  registerQuestion: (question: string, id?: string) => string;
  clearHistory: () => void;
};

const HistoryContext = createContext<HistoryContextValue | null>(null);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<LocalQuestion[]>([]);

  useEffect(() => {
    setHistory(readHistoryFromStorage());
  }, []);

  const persist = useCallback((items: LocalQuestion[]) => {
    setHistory(items);
    writeHistoryToStorage(items);
  }, []);

  const registerQuestion = useCallback(
    (question: string, id?: string) => {
      const qid = id ?? createQuestionId();
      setHistory((prev) => {
        const next = addQuestionToHistory(prev, question, qid);
        writeHistoryToStorage(next);
        return next;
      });
      return qid;
    },
    [],
  );

  const clearHistory = useCallback(() => {
    persist([]);
  }, [persist]);

  const value = useMemo(
    () => ({ history, registerQuestion, clearHistory }),
    [clearHistory, history, registerQuestion],
  );

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}

export function useLocalHistory(): HistoryContextValue {
  const ctx = useContext(HistoryContext);
  if (!ctx) {
    throw new Error("useLocalHistory must be used within HistoryProvider");
  }
  return ctx;
}