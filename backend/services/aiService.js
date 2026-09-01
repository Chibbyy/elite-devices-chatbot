const openai = require("../config/openai");

const getAIResponse = async (message) => {
  console.log("DEBUG openai object:", Object.keys(openai));
  console.log("DEBUG openai.chat:", openai.chat);

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