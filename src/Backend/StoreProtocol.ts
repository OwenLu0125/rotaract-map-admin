import axios from "axios";
import { BACKEND_DOMAIN } from "./Env";
import { Store } from "./types/Store";

export async function getStoreById(storeId: number) {
  const response = await axios.get<Store>(`${BACKEND_DOMAIN}/store/${storeId}`);
  return response.data;
}

export async function putStoreById(storeId: number,values: any ) {
  const response = await axios.put<Store>(`${BACKEND_DOMAIN}/store/${storeId}`,values);
  return response.data;
}
export async function deleteStoreById(storeId: number) {
  const response = await axios.delete<Store>(`${BACKEND_DOMAIN}/store/${storeId}`);
  return response.data;
}
export async function getStore() {
  const response = await axiosInstance.get<Store>(`${BACKEND_DOMAIN}/store`);
  return response.data;
}
export async function postStore(values) {
  const response = await axios.post<Store>(`${BACKEND_DOMAIN}/store`,values);
  return response.data;
}

const axiosInstance = axios.create({
  baseURL: BACKEND_DOMAIN,
});

axiosInstance.interceptors.request.use(async (config) => {
   const authToken = window.sessionStorage.getItem('token')
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }

  return config;
});
