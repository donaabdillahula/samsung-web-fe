import axios from "axios";

export const clientInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
