import { useEffect, useRef } from "react";

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
        <p key={index}>
          <strong>
            {message.role === "user" ? "You:" : "AI:"}
          </strong>{" "}
          {message.content}
        </p>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default ChatMessages;