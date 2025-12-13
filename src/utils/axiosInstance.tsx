import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { BASE_API_URL } from "../constants";

const instance = axios.create({ baseURL: `${BASE_API_URL}/api` });

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;