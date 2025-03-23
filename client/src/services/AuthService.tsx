import apiClient from "../config/apiClient";
import { AuthToken, AuthTokenSchema } from "../schemas/auth/AuthTokenSchema";
import { LoginRequest } from "../schemas/auth/LoginRequestSchema";

const accessKey = "acc";

export const getAccessToken = () => {
    return localStorage.getItem(accessKey);
};

export const login = async (data: LoginRequest) => {
    var response = await apiClient.post("Authentication/Login", data);

    try {
        var authToken = AuthTokenSchema.parse(response);

        if (authToken) localStorage.setItem(accessKey, authToken.access);
        return true;
    } catch {
        return false;
    }
};

export const register = async (data: LoginRequest) => apiClient.post("http://localhost:5160/api/Authentication/Register", data);

export const getUserName = async () => apiClient.get("Authentication/UserName");
