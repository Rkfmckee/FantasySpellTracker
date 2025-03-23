import axios from "axios";
import { getAccessToken } from "../services/AuthService";

const options = {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
};

const apiClient = axios.create(options);

apiClient.interceptors.request.use((request) => {
    var accessToken = getAccessToken();
    if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;

    return request;
});

// Override the default axios response object, and only return the data part
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const { status, data } = error.response;
        return Promise.reject({ status, ...data });
    }
);

export default apiClient;
