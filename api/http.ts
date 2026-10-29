import axios, { AxiosResponse } from "axios";
import { router } from "expo-router";
import { secureStorage } from "../utils/secureStorage";

const baseURL = "http://192.168.1.13:8080/api";
const ASSET_BASE_URL = "http://192.168.1.13:8080/asset";

// eslint-disable-next-line import/no-named-as-default-member
const api = axios.create({
  baseURL,
  // baseURL: "https://api-staging-sipahamv2.ponpesabuhurairah.id/api",
  // baseURL: "http://10.44.244.34:8080/api",
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
    if (err?.response?.status === 401) {
      secureStorage.removeToken();
      router.replace("/login");
      console.log("Logout");
    }
    throw err;
  }
);

export { ASSET_BASE_URL };

export default api;
