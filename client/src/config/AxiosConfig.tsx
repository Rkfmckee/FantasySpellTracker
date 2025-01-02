import axios from "axios";
import appConfig from "./appconfig.json";

export default function InitializeAxios() {
    axios.defaults.baseURL = `${appConfig.apiUrl}/api/`;
}
