import axios from "axios";
import appConfig from "./appconfig.json";

const options = {
    baseUrl: appConfig.apiUrl,
    withCredentials: true,
};

const apiClient = axios.create(options);

export default apiClient;
