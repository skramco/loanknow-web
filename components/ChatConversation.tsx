"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AskForm } from "@/components/AskForm";
import { LoanKnowMark } from "@/components/icons/LoanKnowMark";
import { useLocalHistory } from "@/components/HistoryProvider";
import { readSession, writeSession } from "@/lib/session";

type AskApiResponse =
  | { status: "ok"; answer: string }
  | {
      status: "unavailable";
      code: string;
      message: string;
      missingEnv?: string[];
    };

type Props = {
  questionId: string;
  onTitle?: (title: string) => void;
};

export function ChatConversation({ questionId, onTitle }: Props) {
  const router = useRouter();
  const { registerQuestion } = useLocalHistory();
  const [question, setQuestion] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = readSession(questionId);
    if (!session?.question) {
      router.replace("/");
      return;
    }
    setQuestion(session.question);
    onTitle?.(session.question);

    if (session.unavailableMessage && session.code) {
      setStatusMessage(session.unavailableMessage);
      setStatusCode(session.code);
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: session.question }),
        });
        const data = (await res.json()) as AskApiResponse;
        if (cancelled) return;
        if (data.status === "ok") {
          setStatusMessage(data.answer);
          setStatusCode("ok");
          writeSession(questionId, {
            question: session.question,
            unavailableMessage: data.answer,
            code: "ok",
          });
        } else if (data.status === "unavailable") {
          setStatusMessage(data.message);
          setStatusCode(data.code);
          writeSession(questionId, {
            question: session.question,
            unavailableMessage: data.message,
            code: data.code,
          });
        } else {
          setStatusMessage("Unexpected response from the server.");
          setStatusCode("error");
        }
      } catch {
        if (!cancelled) {
          setStatusMessage(
            "We could not reach the server. Check your connection and try again.",
          );
          setStatusCode("network_error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [onTitle, questionId, router]);

  const followUp = async (text: string) => {
    const id = registerQuestion(text);
    writeSession(id, { question: text });
    router.push(`/chat/${id}`);
  };

  if (!question) {
    return null;
  }

  return (
    <section className="chat-view" aria-label="Conversation">
      <div className="thread">
        <div className="msg user">
          <div className="bubble">{question}</div>
        </div>
        <div className="msg bot">
          <div className="av" aria-hidden>
            <LoanKnowMark className="av-mark" />
          </div>
          <div className="body">
            <div className="who">LoanKnow</div>
            {loading ? (
              <p className="status-line" role="status">
                Submitting your question…
              </p>
            ) : (
              <UnavailableMessage code={statusCode} message={statusMessage ?? ""} />
            )}
            <p className="tools-note">
              Mortgage payment math:{" "}
              <Link
                href="https://dett.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                dett.io calculators
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="dock">
        <AskForm
          compact
          placeholder="Ask a follow-up…"
          hint=""
          disabled={loading}
          onSubmit={followUp}
        />
        <p className="fine">
          Educational answers from Owen AI when connected — not a loan offer or
          commitment. Don&apos;t share your SSN or account numbers. We never
          need them.
        </p>
      </div>
    </section>
  );
}

function UnavailableMessage({
  code,
  message,
}: {
  code: string | null;
  message: string;
}) {
  if (code === "ok") {
    return <p>{message}</p>;
  }
  return (
    <div className="unavailable" role="status" aria-live="polite">
      <p>
        <strong>Answers not available yet.</strong> {message}
      </p>
      {code === "not_configured" ? (
        <p className="unavailable-detail">
          This site is waiting on Owen API configuration (
          <code>OWEN_API_URL</code>, <code>OWEN_API_KEY</code>).
        </p>
      ) : null}
    </div>
  );
}