import axios, { AxiosInstance, AxiosResponse } from "axios";
import Config from "react-native-config";

const api: AxiosInstance = axios.create({ baseURL: Config.API_URL });

api.interceptors.response.use((res: AxiosResponse) => res.data);

export default api;
