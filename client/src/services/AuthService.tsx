import apiClient from "../config/apiClient";

export const login = async (username: string, password: string) => apiClient.post("Authentication/Login", { username, password });

export const getUser = async () => apiClient.get("User");
