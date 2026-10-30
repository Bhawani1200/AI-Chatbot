import { GoogleGenAI } from "@google/genai";

const googleai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

export class Assistant {
  #chat;

  constructor(model = "gemini-3.5-flash") {
    this.#chat = googleai.chats.create({
      model,
      config: {
        maxOutputTokens: 8192,
        systemInstruction:
          "Answer in a concise, conversational way. Give the direct answer first, use short paragraphs or a few bullets when helpful, and only provide a detailed explanation when the user asks for one.",
      },
    });
  }

  async chat(content) {
    const result = await this.#chat.sendMessage({ message: content });
    return result.text;
  }

  async *chatStream(content) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      let hasYieldedContent = false;

      try {
        const stream = await this.#chat.sendMessageStream({ message: content });
        for await (const chunk of stream) {
          const text = chunk.text;
          if (text) {
            hasYieldedContent = true;
            yield text;
          }
        }
        return;
      } catch (error) {
        if (hasYieldedContent || error?.status !== 503 || attempt === 2) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
      }
    }
  }
}
