import axios from "axios";

const options = {
    baseUrl: import.meta.env.VITE_API_URL,
    withCredentials: true,
};

const apiClient = axios.create(options);

apiClient.interceptors.response.use(
    // Override the default axios response object, and only return the data part
    (response) => response.data,
    (error) => {
        const { status, data } = error.response;
        return Promise.reject({ status, ...data });
    }
);

export default apiClient;
