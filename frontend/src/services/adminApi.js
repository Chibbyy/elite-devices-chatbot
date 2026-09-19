import axios from "axios";

const adminApi = axios.create({
  baseURL: "https://elite-devices-chatbot.onrender.com/",
});

adminApi.interceptors.request.use((config) => {
  const adminKey = localStorage.getItem("adminKey");

  if (adminKey) {
    config.headers["x-admin-key"] = adminKey;
  }

  return config;
});

export default adminApi;