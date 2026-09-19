const { getChatReply, getChatHistory } = require("../services/chatService");

const chat = async (req, res) => {
  const { message, sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  const reply = await getChatReply(message, sessionId);

  res.json({
    reply,
  });
};

const getHistory = (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  const history = getChatHistory(sessionId);

  res.json(history);
};

module.exports = {
  chat,
  getChatHistory: getHistory,
};