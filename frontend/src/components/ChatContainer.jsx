import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import api from "../services/api";

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <ChatMessages messages={messages} loading={loading} />

      <ChatInput loadHistory={loadHistory} loading={loading} setLoading={setLoading} />
    </div>
  );
}

export default ChatContainer;