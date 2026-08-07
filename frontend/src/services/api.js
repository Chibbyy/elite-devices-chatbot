import axios from "axios";

const api = axios.create({
  baseURL: "https://connecticut-bottom-north-encourages.trycloudflare.com",
});

export default api;