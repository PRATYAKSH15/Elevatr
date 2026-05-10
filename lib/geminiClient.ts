import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

const client = new GoogleGenerativeAI(API_KEY);

export const geminiClient = client;

function buildPrompt(resumeText: string, jobRole?: string) {
  const roleLine = jobRole ? `For role: ${jobRole}\n` : "";
  return `
## Interview Questions & Answers

Based on the resume content below, generate **10 interview questions**.
Format must be:

### Q: <question>
**Answer:** <2-4 sentence answer>
**Skill Tested:** <short skill name>

Add two blank line between each section.
DO NOT return code blocks around the response.

${roleLine}
Resume:
${resumeText}
`;
}

export async function generateInterviewQnA(
  resumeText: string,
  jobRole = ""
): Promise<string> {
  const prompt = buildPrompt(resumeText, jobRole);

  const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

  const response = await model.generateContent(prompt);

  const text = response?.response?.text?.() ?? "";

  return String(text);
}
