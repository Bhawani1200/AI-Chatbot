import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

function App() {
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({
      content,
      role: "user",
    });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: content,
      });

      addMessage({
        content: response.text,
        role: "assistant",
      });
    } catch (error) {
      console.error("Full Error:", error);

      addMessage({
        role: "system",
        content: error.message || "Something went wrong.",
      });
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat.webp" alt="Logo" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>

      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>

      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;
