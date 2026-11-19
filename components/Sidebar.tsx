"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoanKnowLogo } from "@/components/icons/LoanKnowLogo";
import { OwenIcon } from "@/components/icons/OwenIcon";
import { DettIcon } from "@/components/icons/DettIcon";
import type { LocalQuestion } from "@/lib/history";

type Props = {
  history: LocalQuestion[];
  activeId?: string | null;
  onNewQuestion: () => void;
  onClearHistory: () => void;
  onClose?: () => void;
};

export function Sidebar({
  history,
  activeId,
  onNewQuestion,
  onClearHistory,
  onClose,
}: Props) {
  const pathname = usePathname();

  return (
    <aside className="side" aria-label="Navigation and local history">
      <div className="brand">
        <Link href="/" className="brand-link" onClick={onClose}>
          <LoanKnowLogo />
        </Link>
      </div>
      <button
        type="button"
        className="newchat"
        onClick={() => {
          onNewQuestion();
          onClose?.();
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        New question
      </button>
      <div className="hist-h">
        <span>On this device</span>
      </div>
      <nav className="hist" aria-label="Questions on this device">
        {history.length === 0 ? (
          <p className="hist-empty">No questions yet on this device.</p>
        ) : (
          history.map((item) => {
            const active =
              activeId === item.id ||
              (pathname === `/chat/${item.id}` && !activeId);
            return (
              <Link
                key={item.id}
                href={`/chat/${item.id}`}
                className={active ? "cur" : undefined}
                onClick={onClose}
                title={item.title}
              >
                {item.title}
              </Link>
            );
          })
        )}
      </nav>
      <div className="spacer" />
      <div className="device">
        <b>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          Private by design
        </b>
        No account. No sales calls. Don&apos;t share sensitive personal
        information. When answers are enabled, text you submit is processed
        through our server — we do not publish a lead form or sell your contact
        info.
        <br />
        <button type="button" onClick={onClearHistory}>
          Clear history on this device
        </button>
      </div>
      <div className="credits">
        <div className="credit">
          <OwenIcon className="credit-icon" />
          Powered by Owen AI
        </div>
        <a
          className="credit"
          href="https://dett.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DettIcon gradientId="dettSidebar" className="credit-icon" />
          Calculations by dett.io
        </a>
      </div>
    </aside>
  );
}