import { useState } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Chat } from "./components/Chat/Chat";
import { Assistant } from "./components/Assistant/Assistant";
import { Theme } from "./components/Theme/Theme";
import styles from "./App.module.css";

function App() {
  const [assistant, setAssistant] = useState();

  function handleAssistantChange(newAssistant) {
    setAssistant(newAssistant);
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>

      <div className={styles.Content}>
        <Sidebar />

        <main className={styles.Main}>
          <Chat assistant={assistant} />
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
