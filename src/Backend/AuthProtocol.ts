import axios from "axios";
import { BACKEND_DOMAIN } from "./Env";
import { Register, Result } from "./types/Account";

export async function regist(register: Register) {
  const response = await axios.post<Register & Result>(`${BACKEND_DOMAIN}/user/register`, register);
  return response.data;
}

export async function login(username: string, password: string) {
  const response = await axios.post(`${BACKEND_DOMAIN}/user/login`, { username, password });
  return response.data;
}