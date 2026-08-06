const openai = require("../config/openai");

const getAIResponse = async (message) => {
  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: message,
  });

  return response.output_text;
};

module.exports = {
  getAIResponse,
};