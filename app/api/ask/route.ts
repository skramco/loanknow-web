import { NextResponse } from "next/server";
import { MAX_QUESTION_LENGTH } from "@/lib/constants";
import { askOwen } from "@/lib/owen/client";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const question =
    typeof body === "object" &&
    body !== null &&
    "question" in body &&
    typeof (body as { question: unknown }).question === "string"
      ? (body as { question: string }).question
      : "";

  const trimmed = question.trim();
  if (!trimmed) {
    return NextResponse.json({ error: "Question is required" }, { status: 400 });
  }
  if (trimmed.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      { error: `Question must be at most ${MAX_QUESTION_LENGTH} characters` },
      { status: 400 },
    );
  }

  const result = await askOwen(trimmed);

  if (result.status === "ok") {
    return NextResponse.json({
      status: "ok",
      answer: result.answer,
    });
  }

  return NextResponse.json(
    {
      status: "unavailable",
      code: result.code,
      message: result.message,
      missingEnv: result.missingEnv,
    },
    { status: 503 },
  );
}