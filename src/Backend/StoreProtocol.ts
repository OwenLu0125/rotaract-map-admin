import { BACKEND_DOMAIN } from "./Env";
import { Store } from "./types/Store";
import  {axiosInstance as instance} from './AxiosInstance'

export async function getStoreById(storeId: number) {
  const response = await instance.get<Store>(`${BACKEND_DOMAIN}/store/${storeId}`);
  return response.data;
}

export async function putStoreById(storeId: number,values: any ) {
  const response = await instance.put<Store>(`${BACKEND_DOMAIN}/store/${storeId}`,values);
  return response;
}
export async function deleteStoreById(storeId: number) {
  const response = await instance.delete<Store>(`${BACKEND_DOMAIN}/store/${storeId}`);
  return response;
}
export async function getStore() {
  const response = await instance.get<Store>(`${BACKEND_DOMAIN}/store`);
  return response.data;
}
export async function postStore(values: any ) {
  const response = await instance.post<Store>(`${BACKEND_DOMAIN}/store`,values);
  return response;
}
