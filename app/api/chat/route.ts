import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  // Use Gemini to generate a response
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(message);
  const response = await result.response;
  const reply = response.text() || "No answer found.";

  return NextResponse.json({ reply });
}