const chatHistory = require("../storage/chatHistory");
const { getChatReply } = require("../services/chatService");

const chat = async (req, res) => {
  const { message } = req.body;

  const reply = await getChatReply(message);

  console.log(chatHistory);

  res.json({
    reply,
  });
};

const getChatHistory = (req, res) => {
  res.json(chatHistory);
};

module.exports = {
  chat,
  getChatHistory,
};