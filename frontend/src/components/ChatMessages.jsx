import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatMessages({ messages, loading }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

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
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}

      {loading && (
        <div className="message-row ai-row">
          <div className="avatar">🤖</div>
          <div className="bubble ai-bubble typing-bubble">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default ChatMessages;