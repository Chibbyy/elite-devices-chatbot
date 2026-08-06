import { useEffect, useState } from "react";
import axios from "axios";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

function ChatContainer() {
  const [messages, setMessages] = useState([]);

  const loadHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/chat/history"
      );

      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="chat-container">
      <ChatHeader />

      <ChatMessages messages={messages} />

      <ChatInput loadHistory={loadHistory} />
    </div>
  );
}

export default ChatContainer;