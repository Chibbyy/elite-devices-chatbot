const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

console.log("DEBUG config/openai.js exports:", Object.keys(openai));
console.log("DEBUG openai.chat exists here:", !!openai.chat);

module.exports = openai;