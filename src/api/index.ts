import axios, { AxiosInstance, AxiosResponse } from "axios";
import Config from "react-native-config";

const api: AxiosInstance = axios.create({
  baseURL: Config.API_URL,
  // TODO: this is temporary. We should dynamically asign this
  headers: { Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJk" },
});

api.interceptors.response.use((res: AxiosResponse) => res.data);

export default api;
