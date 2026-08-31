const openai = require("../config/openai");

const getAIResponse = async (message) => {
  const response = await openai.chat.completions.create({
    model: "openrouter/free",
    messages: [
      { role: "user", content: message },
    ],
  });

  return response.choices[0].message.content;
};

module.exports = {
  getAIResponse,
};