import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { loadJobs, findJobFromQuery } from "../../../lib/jobs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  // Load jobs from JSON
  const jobs = await loadJobs();
  const job = findJobFromQuery(jobs, message);

  if (!job) {
    return NextResponse.json({
      reply: "Sorry, I couldn't find a matching job for your question.",
    });
  }

  // Compose a prompt for Gemini
  const prompt = `
You are a helpful assistant. Answer the user's question using only the following job information:

Title: ${job.title}
Jurisdiction: ${job.jurisdiction}
Description: ${job.description}

User's question: "${message}"

If the answer is not in the job description, say you don't know.
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // COPILOT: DO NOT CHANGE THIS LINE
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const reply = response.text() || "No answer found.";

  return NextResponse.json({ reply });
}