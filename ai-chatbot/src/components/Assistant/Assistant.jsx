import { useEffect, useState } from "react";
import styles from "./Assistant.module.css";
import { Assistant as GoogleAIAssistant } from "../../assistants/googleai.js";
import { Assistant as OpenAIAssistant } from "../../assistants/openai.js";
import { Assistant as DeepSeekAIAssistant } from "../../assistants/deepseekai.js";
import { Assistant as AnthropicAIAssistant } from "../../assistants/anthropicai.js";
import { Assistant as XAIAssistant } from "../../assistants/grokai.js";

const assistantOptions = {
  googleai: "Google AI",
  openai: "OpenAI",
  deepseekai: "DeepSeek AI",
  anthropicai: "Anthropic AI",
  xai: "X AI",
};

const assistantClasses = {
  googleai: GoogleAIAssistant,
  openai: OpenAIAssistant,
  deepseekai: DeepSeekAIAssistant,
  anthropicai: AnthropicAIAssistant,
  xai: XAIAssistant,
};

function createAssistant(provider) {
  const AssistantClass = assistantClasses[provider];
  if (!AssistantClass) {
    throw new Error(`Unknown assistant provider: ${provider}`);
  }
  return new AssistantClass();
}

export function Assistant({ value = "googleai", onChange }) {
  const [selectedAssistant, setSelectedAssistant] = useState(value);

  useEffect(() => {
    onChange(createAssistant(value));
  }, [onChange, value]);

  function handleValueChange(event) {
    const nextAssistant = event.target.value;
    setSelectedAssistant(nextAssistant);
    onChange(createAssistant(nextAssistant));
  }

  return (
    <div className={styles.Assistant}>
      <span>Assistant:</span>
      <select value={selectedAssistant} onChange={handleValueChange}>
        {Object.entries(assistantOptions).map(([assistant, label]) => (
          <option key={assistant} value={assistant}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
