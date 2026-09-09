const openai = require("../config/openai");

const getAIResponse = async (history) => {
  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: history,
  });

  return response.choices[0].message.content;
};

module.exports = {
  getAIResponse,
};