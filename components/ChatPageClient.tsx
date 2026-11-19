"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ChatConversation } from "@/components/ChatConversation";
import { trimTitle } from "@/lib/history";

type Props = {
  questionId: string;
};

export function ChatPageClient({ questionId }: Props) {
  const [title, setTitle] = useState("\u00a0");
  return (
    <AppShell
      activeQuestionId={questionId}
      topTitle={title}
      showFreePill={false}
    >
      <ChatConversation
        questionId={questionId}
        onTitle={(q) => setTitle(trimTitle(q, 64))}
      />
    </AppShell>
  );
}