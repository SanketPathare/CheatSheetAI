import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request:any) {
  try {
    const { language, topic } = await request.json();

    const groq = new Groq({
      apiKey: process.env.API_KEY,
    });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert AI programming assistant. Create a detailed cheat sheet for the specified programming language and topic.",
        },
        {
          role: "user",
          content: `Create a cheat sheet for ${language} focusing on ${topic}. Include syntax, common patterns, best practices, and examples.`,
        },
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.5,
      max_tokens: 2048,
    });

    return NextResponse.json({
      content: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate cheat sheet" },
      { status: 500 }
    );
  }
}
