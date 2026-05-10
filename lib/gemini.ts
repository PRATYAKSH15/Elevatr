import { geminiClient } from "./geminiClient";

export async function generateSummaryPrompt(data: {
  name: string;
  skills: string[];
  education: string;
}) {
  const prompt = `Create a short professional profile summary for ${data.name}.
  Education: ${data.education}
  Skills: ${data.skills.join(", ")}
  Tone: concise, resume-ready, formal.`;

  const model = geminiClient.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function suggestSkillsPrompt(skills: string[]) {
  const prompt = `User knows ${skills.join(", ")}.
  Suggest 3–5 related or in-demand skills for improving resume.`;

  const model = geminiClient.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}
