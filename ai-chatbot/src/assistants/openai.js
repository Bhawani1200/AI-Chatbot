import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant {
  #model;
  constructor(model = "gpt-5.6") {
    this.#model = model;
  }

  async chat(content, history) {
    try {
      const resposne = await openai.chat.completions.create({
        model: this.#model,
        messages: [...history, { content, role: "user" }],
      });
      return response.choices[0].message.content;
    } catch (error) {
      throw error;
    }
  }
}

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});
console.log(import.meta.env);
console.log(import.meta.env.VITE_OPEN_API_KEY);

export class Assistant {
  #model;

  constructor(model = "gpt-4o-mini") {
    this.#model = model;
  }

  async chat(content, history) {
    try {
      const result = await openai.chat.completions.create({
        model: this.#model,
        messages: [...history, { content, role: "user" }],
      });

      return result.choices[0].message.content;
    } catch (error) {
      throw error;
    }
  }
}
