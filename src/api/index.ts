import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Config from "react-native-config";
import { storageUtils } from "@utils/storage";
import { Languages } from "src/config/i18n/i18n";

const Api: AxiosInstance = axios.create({ baseURL: Config.API_URL });

Api.interceptors.request.use(
  async config => {
    const { tokenInfo, userInfo } = await storageUtils.getAuthCredentials();

    if (tokenInfo) config.headers.set("Authorization", `Bearer ${tokenInfo?.bearerToken}`);
    if (userInfo) config.headers.set("Accept-Language", userInfo?.language || Languages.EN);

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

Api.interceptors.response.use((res: AxiosResponse) => res.data);

export default Api;
