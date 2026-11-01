import { useState } from "react";
import { Controls } from "./components/Controls/Controls";
import { Chat } from "./components/Chat/Chat";
import styles from "./App.module.css";
import { Loader } from "./components/Loader/Loader";
import { Assistant } from "./components/Assistant/Assistant";
import { Theme } from "./components/Theme/Theme";

function App() {
  const [assistant, setAssistant] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);

    function updateLastMessageContent(content) {
      setMessages((prevMessages) =>
        prevMessages.map((message, index) =>
          index === prevMessages.length - 1
            ? { ...message, content: message.content + content }
            : message,
        ),
      );
    }

    try {
      const result = await assistant.chatStream(content, messages);
      let isFirstChunk = true;
      for await (const chunk of result) {
        if (isFirstChunk) {
          isFirstChunk = false;
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
          setIsStreaming(true);
        }
        updateLastMessageContent(chunk);
      }
      setIsStreaming(false);
    } catch (error) {
      const errorDetails =
        typeof error?.error?.message === "string"
          ? error.error.message.slice(0, 1000)
          : typeof error?.message === "string"
            ? error.message.slice(0, 1000)
            : "No additional details were provided.";
      let errorMessage =
        "Sorry, I couldn't process your request. Please try again.";

      if (error?.status === 402) {
        errorMessage = `AI API payment error (402): ${errorDetails}`;
      } else if (error?.status === 429) {
        errorMessage = `AI API rate limit reached (429): ${errorDetails}`;
      } else if (error?.status) {
        errorMessage = `AI API error (${error.status}): ${errorDetails}`;
        if (error.status === 400) {
          errorMessage += " Check the model name and request parameters.";
        }
      }

      addMessage({
        content: errorMessage,
        role: "system",
      });
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }

  return (
    <div className={styles.App}>
      {isLoading && <Loader />}
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat.webp" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls
        onSend={handleContentSend}
        isDisabled={!assistant || isLoading || isStreaming}
      />
    
      <div className={styles.Configuration}>
        <Assistant onChange={setAssistant} />
        <Theme />
      </div>
    </div>
  );
}

export default App;
