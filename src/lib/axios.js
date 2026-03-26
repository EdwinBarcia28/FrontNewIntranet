import { useAuthStore } from "@/store/auth";
import axios from "axios";

const axiosInstance = axios.create({
  //Prueba
  //baseURL: "https://localhost:7111/api/",
  //Produccion
  baseURL: "http://01srv242b:8082/api/",
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
