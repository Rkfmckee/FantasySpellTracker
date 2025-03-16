import axios from "axios";
import { AuthTokenSchema } from "../schemas/auth/AuthTokenSchema";

const accessKey = "access";

export const Login = (username: string, password: string) => {
    return axios.post("Authentication/Login", { username, password }).then((response) => {
        try {
            const authTokens = AuthTokenSchema.parse(response.data);
            localStorage.setItem(accessKey, JSON.stringify(authTokens.access));
        } catch {
            Logout();
        }
    });
};

export const Logout = () => {
    localStorage.removeItem(accessKey);
};

export const GetCurrentAccessToken = () => {
    const token = localStorage.getItem(accessKey);
    if (token) return JSON.parse(token);
    return null;
};
