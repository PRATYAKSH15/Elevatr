import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateSummaryPrompt } from "@/lib/gemini";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const summary = await generateSummaryPrompt(data);
    return NextResponse.json({ summary });
  } catch {
    return NextResponse.json({ error: "Error generating summary" }, { status: 500 });
  }
}
