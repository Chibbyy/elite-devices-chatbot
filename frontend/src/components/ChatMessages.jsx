import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

function ChatMessages({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-messages">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message-row ${
            message.role === "user" ? "user-row" : "ai-row"
          }`}
        >
          <div className="avatar">
            {message.role === "user" ? "🧑" : "🤖"}
          </div>
          <div
            className={`bubble ${
              message.role === "user" ? "user-bubble" : "ai-bubble"
            }`}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default ChatMessages;