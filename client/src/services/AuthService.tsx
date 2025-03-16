import apiClient from "../config/apiClientConfig";

export const login = async (username: string, password: string) => apiClient.post("Authentication/Login", { username, password });

export const getUser = async () => apiClient.get("User");
