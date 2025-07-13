import OpenAI from "openai";

// 💡 Fail fast if you forgot to set the env var
if (!process.env.OPENAI_API_KEY) {
  throw new Error("⚠️ Missing OPENAI_API_KEY environment variable");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // ← no fallback here
});

export default openai;

// Example helper function
export async function generateEmotionalResponse(
  userMessage: string,
  conversationHistory: any[] = [],
  userContext?: any,
  personality: string = "empathetic_support"
): Promise<string> {
  try {
    // Build your messages array however you like
    const messages = [
      { role: "system", content: `You are a ${personality} assistant.` },
      ...conversationHistory,
      { role: "user", content: userMessage },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",  // or whichever model you want
      messages: messages as any,
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "";
  } catch (err) {
    console.error("OpenAI API error:", err);
    return "I’m here to listen and support you.";
  }
}
