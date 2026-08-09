import axios from "axios";

const api = axios.create({
  baseURL: "https://accurately-beverage-integrated-bibliographic.trycloudflare.com",
});

export default api;