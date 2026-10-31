import OpenAI from "openai";
import { Assistant as OpenAIAssistant } from "../assistants/openai.js";

const openai = new OpenAI({
    baseURL:"https://api.x.ai/v1",
  apiKey: import.meta.env.VITE_X_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant extends OpenAIAssistant {
  constructor(model = "grok-4.7", client = openai) {
    super(model, client);
  }
}