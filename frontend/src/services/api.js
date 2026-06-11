import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-backend-ia62.onrender.com",
});

export default api;