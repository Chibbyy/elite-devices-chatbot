import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import api from "../services/api";

function ChatContainer() {
  const [messages, setMessages] = useState([]);

  const loadHistory = async () => {
    try {
      const response = await api.get("/chat/history");

      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div>
      <ChatMessages messages={messages} />

      <ChatInput loadHistory={loadHistory} />
    </div>
  );
}

export default ChatContainer;