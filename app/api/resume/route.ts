import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import pdfParse from "pdf-parse";
import { geminiClient } from "@/lib/geminiClient";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are accepted" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text;

    const model = geminiClient.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Analyze resume and generate 10 interview questions with strong answers:
${resumeText}
`;

    const result = await model.generateContent(prompt);
    const interviewQnA = result.response.text();

    return NextResponse.json({ interviewQnA });
  } catch (error) {
    console.error("Resume parse/AI error:", error);
    return NextResponse.json({ error: "Failed to process resume" }, { status: 500 });
  }
}
