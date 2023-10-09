import axios from "axios";
import { BACKEND_DOMAIN } from "./Env";
import { Store } from "./types/Store";

export const axiosInstance = axios.create({
  baseURL: BACKEND_DOMAIN,
});

 axiosInstance.interceptors.request.use(async (config) => {
   const authToken = window.sessionStorage.getItem('token')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }

  return config;
});
