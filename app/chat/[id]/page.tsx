import { ChatPageClient } from "@/components/ChatPageClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ChatPage({ params }: Props) {
  const { id } = await params;
  return <ChatPageClient questionId={id} />;
}