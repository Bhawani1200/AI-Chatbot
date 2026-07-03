import React, { useState } from "react";
import styles from "./App.module.css";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import { GoogleGenerativeAI } from "@google/generative-ai";


const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
const gemini = googleai.getGenerativeModel({
  model: "gemini-2.5-flash-latest",
});


const chat = gemini.startChat({ history: [] });
const App = () => {
  const [messages, setMessages] = useState([]);


  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }


  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    try {
      const result = await chat.sendMessage(content);
      addMessage({ content: result.response.text(), role: "assistant" });
    } catch (error) {
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="./chat.webp" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  );
};

export default App;
