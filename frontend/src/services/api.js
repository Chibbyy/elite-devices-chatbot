import axios from "axios";

const api = axios.create({
  baseURL: "https://pets-encountered-link-parker.trycloudflare.com",
});

export default api;