import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { suggestSkillsPrompt } from "@/lib/gemini";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { skills } = await req.json();
    const suggestion = await suggestSkillsPrompt(skills);
    return NextResponse.json({ suggestion });
  } catch {
    return NextResponse.json({ error: "Error suggesting skills" }, { status: 500 });
  }
}
