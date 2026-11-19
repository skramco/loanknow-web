"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { LoanKnowLogo } from "@/components/icons/LoanKnowLogo";
import { useLocalHistory } from "@/components/HistoryProvider";

type Props = {
  children: React.ReactNode;
  activeQuestionId?: string | null;
  topTitle?: string;
  showFreePill?: boolean;
};

export function AppShell({
  children,
  activeQuestionId = null,
  topTitle,
  showFreePill = true,
}: Props) {
  const router = useRouter();
  const { history, clearHistory } = useLocalHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <Sidebar
        history={history}
        activeId={activeQuestionId}
        onNewQuestion={() => router.push("/")}
        onClearHistory={clearHistory}
      />
      {menuOpen ? (
        <button
          type="button"
          className="side-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <div className={`side-drawer${menuOpen ? " open" : ""}`}>
        <Sidebar
          history={history}
          activeId={activeQuestionId}
          onNewQuestion={() => {
            setMenuOpen(false);
            router.push("/");
          }}
          onClearHistory={clearHistory}
          onClose={() => setMenuOpen(false)}
        />
      </div>

      <main className="main">
        <header className="top">
          <button
            type="button"
            className="menu"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <Link href="/" className="mbrand">
            <LoanKnowLogo />
          </Link>
          <span className="title">{topTitle ?? "\u00a0"}</span>
          <div className="tbtns">
            {showFreePill ? (
              <span className="pill-free">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Free · no account
              </span>
            ) : null}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}