import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const response = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo", // FREE model
      messages: [
        {
          role: "system",
          content:
            "You are Love Guru ❤️ — calm, wise, emotional relationship guide. Speak gently and deeply.",
        },
        ...messages,
      ],
    });

    return Response.json({
      reply: response.choices[0].message.content,
    });

  } catch (err) {
    console.error("ERROR:", err);

    return Response.json({
      reply: "Love Guru is resting… try again ❤️",
    });
  }
}