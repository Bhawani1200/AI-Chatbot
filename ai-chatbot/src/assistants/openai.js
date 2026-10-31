import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant {
  #client;
  #model;

  constructor(model = "gpt-4o-mini", client = openai) {
    this.#model = model;
    this.#client = client;
  }




  async chat(content, history = []) {
    const result = await this.#client.chat.completions.create({
      model: this.#model,
      messages: [...history, { content, role: "user" }],
    });

    return result.choices[0]?.message?.content ?? "";
  }

  

  async *chatStream(content, history = []) {
    const stream = await this.#client.chat.completions.create({
      model: this.#model,
      messages: [...history, { content, role: "user" }],
      stream: true,
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content;
      if (text) {
        yield text;
      }
    }
  }
}
