import axios, { AxiosResponse } from "axios";
import { router } from "expo-router";
import { secureStorage } from "../utils/secureStorage";

const api = axios.create({
  baseURL: "http://192.168.1.12:8080/api",
  timeout: 15000,
});

api.interceptors.request.use(async (config) => {
  const token = await secureStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      secureStorage.removeToken();
      router.replace("/login");
      console.log("Logout");
    }
    throw err;
  },
);

export default api;
