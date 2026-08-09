import axios from "axios";

const api = axios.create({
  baseURL: baseURL: "https://accurately-beverage-integrated-bibliographic.trycloudflare.com",
});

export default api;