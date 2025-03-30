import axios from "axios";
import { navigate } from "../services/NavigationService";
import queryClient from "./queryClient";

const options = {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
};

const apiClient = axios.create(options);
const refreshClient = axios.create(options);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response } = error;
        const { status, data } = response || {};

        if (status === 401) {
            try {
                await refreshClient.get("Authentication/Refresh");
                return refreshClient(config);
            } catch (error) {
                queryClient.clear();
                navigate("/login", {
                    state: {
                        redirectUrl: window.location.pathname,
                    },
                });
            }
        }

        return Promise.reject({ status, ...data });
    }
);

export default apiClient;
