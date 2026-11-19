"use client";

import { useRouter } from "next/navigation";
import { AskForm } from "@/components/AskForm";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { LoanKnowLogo } from "@/components/icons/LoanKnowLogo";
import { PartnerCredits } from "@/components/PartnerCredits";
import { useLocalHistory } from "@/components/HistoryProvider";
import { SUGGESTED_QUESTIONS } from "@/lib/constants";
import { writeSession } from "@/lib/session";

export function HomeHero() {
  const router = useRouter();
  const { registerQuestion } = useLocalHistory();

  const startQuestion = async (question: string) => {
    const id = registerQuestion(question);
    writeSession(id, { question });
    router.push(`/chat/${id}`);
  };

  return (
    <section className="empty" aria-label="Ask a question">
      <div className="logo">
        <LoanKnowLogo />
      </div>
      <h1>Ask anything about mortgages.</h1>
      <p className="tag">
        Straight answers in plain language. Free for anyone. No account, no
        sign-up, no sales calls.
      </p>
      <AskForm
        placeholder='Ask any mortgage question… e.g. "How much house can I afford on $85k a year?"'
        hint="You don't need to share your name, email, or SSN. Ever."
        onSubmit={startQuestion}
      />
      <div className="chips" role="list" aria-label="Suggested questions">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            className="chip"
            role="listitem"
            onClick={() => void startQuestion(q)}
          >
            {q}
          </button>
        ))}
      </div>
      <div className="trust">
        <span>
          <CheckIcon /> Free, always
        </span>
        <span>
          <CheckIcon /> No account or sign-up
        </span>
        <span>
          <CheckIcon /> We don&apos;t ask for or sell your info
        </span>
        <span>
          <CheckIcon /> No obligation, no sales pitch
        </span>
      </div>
      <p className="trust-sub">
        LoanKnow is for learning. Answers are educational, not a loan offer or
        commitment.
      </p>
      <PartnerCredits />
    </section>
  );
}