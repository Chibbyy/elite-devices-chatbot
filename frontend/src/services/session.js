const getSessionId = () => {
  let sessionId = localStorage.getItem("chatSessionId");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("chatSessionId", sessionId);
  }

  return sessionId;
};

export default getSessionId;