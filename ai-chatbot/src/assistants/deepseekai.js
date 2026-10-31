import OpenAI from "openai";
import { Assistant as OpenAIAssistant } from "../assistants/openai.js";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant extends OpenAIAssistant {
  constructor(model = "deepseek-chat", client = openai) {
    super(model, client);
  }
}
