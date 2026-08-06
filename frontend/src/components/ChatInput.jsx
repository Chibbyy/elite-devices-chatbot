import { useState } from "react";
import api from "../services/api";

function ChatInput({ loadHistory }) {
  const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

const handleSend = async () => {
  if (message.trim() === "") {
    return;
  }

  setLoading(true);



  try {
    const response = await api.post("/chat", {
      message: message,
    });
    await loadHistory();

    console.log(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
    setMessage("");
  }
};
  return (
    <div className="chat-input">
      <input
  disabled={loading}
  type="text"
  placeholder="Type your message..."
  value={message}
  onChange={(event) => setMessage(event.target.value)}
  onKeyDown={(event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  }}
/>

      <button onClick={handleSend} disabled={loading}>
  {loading ? "Sending..." : "Send"}
</button>
    </div>
  );
}

export default ChatInput;