import apiClient from "../config/apiClient";
import { LoginRequest } from "../schemas/auth/LoginRequestSchema";

export const login = async (data: LoginRequest) => apiClient.post("http://localhost:5160/api/Authentication/Login", data);
export const register = async (data: LoginRequest) => apiClient.post("http://localhost:5160/api/Authentication/Register", data);

export const getUserName = async () => apiClient.get("http://localhost:5160/api/Authentication/UserName");
