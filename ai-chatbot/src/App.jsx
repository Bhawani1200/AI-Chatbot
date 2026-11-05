import { useMemo, useState } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Chat } from "./components/Chat/Chat";
import { Assistant } from "./components/Assistant/Assistant";
import { Theme } from "./components/Theme/Theme";
import styles from "./App.module.css";

const CHATS = [
  {
    id: 2,
    title: "Gemini AI vs ChatGPT",
    messages: [
      { role: "user", content: "What is better ChatGPT or Gemini?" },
      {
        role: "assistant",
        content: "Hi! Can you explain for what type of tasks you will use it?",
      },
    ],
  },
  {
    id: 4,
    title: "How to use AI tools in your daily life",
    messages: [
      { role: "user", content: "Hey! How to use AI in my life?" },
      {
        role: "assistant",
        content: "Hi! Would you like to use it for work or for hobbies?",
      },
    ],
  },
];

function App() {
  const [assistant, setAssistant] = useState();
  const [chats, setChats] = useState(CHATS);
  const [activeChatId, setActiveChatId] = useState(2);
  const activeChatMessages = useMemo(
    () => chats.find(({ id }) => id === activeChatId)?.messages ?? [],
    [chats, activeChatId],
  );

  function handleAssistantChange(newAssistant) {
    setAssistant(newAssistant);
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat.webp" alt="AI chatbot" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>

      <div className={styles.Content}>
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onActiveChatIdChange={setActiveChatId}
        />

        <main className={styles.Main}>
          <Chat
            assistant={assistant}
            chatMessages={activeChatMessages}
            chatId={activeChatId}
          />
          <div className={styles.Configuration}>
            <Assistant onAssistantChange={handleAssistantChange} />
            <Theme />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
