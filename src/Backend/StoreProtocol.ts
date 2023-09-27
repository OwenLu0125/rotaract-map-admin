import axios from "axios";
import { BACKEND_DOMAIN } from "./Env";
import { Store } from "./types/Store";

export async function getStoreById(storeId: number) {
  const response = await axios.get<Store>(`${BACKEND_DOMAIN}/store/${storeId}`);
  return response.data;
}

export async function putStoreById(storeId: number) {
  const response = await axios.put<Store>(`${BACKEND_DOMAIN}/store/${storeId}`);
  return response.data;
}
export async function deleteStoreById(storeId: number) {
  const response = await axios.delete<Store>(`${BACKEND_DOMAIN}/store/${storeId}`);
  return response.data;
}
export async function getStore() {
  const response = await axios.get<Store>(`${BACKEND_DOMAIN}/store`);
  return response.data;
}
export async function postStore() {
  const response = await axios.post<Store>(`${BACKEND_DOMAIN}/store`);
  return response.data;
}
