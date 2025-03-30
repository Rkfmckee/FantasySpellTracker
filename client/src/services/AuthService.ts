import apiClient from "../config/apiClient";
import { LoginRequest } from "../schemas/auth/LoginRequestSchema";
import { User } from "../schemas/auth/UserSchema";

export const register = async (data: LoginRequest) => apiClient.post("Authentication/Register", data);

export const login = async (data: LoginRequest) => await apiClient.post("Authentication/Login", data);

export const logout = async () => await apiClient.get("Authentication/Logout");

export const getUserName = async () => apiClient.get<User>("Authentication/User");
