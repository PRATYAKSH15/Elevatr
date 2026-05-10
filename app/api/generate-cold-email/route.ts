import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { geminiClient } from "@/lib/geminiClient";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access. Please sign in." },
        { status: 401 }
      );
    }

    const { name, recipient, context } = await req.json();

    const prompt = `
    Write a short, professional cold email.
    Sender: ${name}
    Recipient/Company: ${recipient}
    Purpose: ${context}

    Tone: polite, confident, and concise.
    End with a short call to action.
    `;

    const model = geminiClient.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const email = result.response.text();

    return NextResponse.json({ email });
  } catch (error) {
    console.error("Cold Email Error:", error);
    return NextResponse.json({ error: "Failed to generate email" }, { status: 500 });
  }
}
