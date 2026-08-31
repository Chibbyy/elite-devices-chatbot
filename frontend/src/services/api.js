import axios from "axios";

const api = axios.create({
  baseURL: "https://elite-devices-chatbot.onrender.com/",
});

export default api;