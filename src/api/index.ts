import axios, { AxiosInstance, AxiosResponse } from "axios";
import Config from "react-native-config";
import { storageUtils } from "@utils/storage";
import { Languages } from "src/types/i18n/languages";

const ApiInstance = async (options?: { isAuthRequest: boolean }): Promise<AxiosInstance> => {
  const { tokenInfo, userInfo } = await storageUtils.getAuthCredentials();

  const apiInstance: AxiosInstance = axios.create({});

  apiInstance.defaults.baseURL = Config.API_URL;

  if (!options?.isAuthRequest) {
    apiInstance.defaults.headers.common.Authorization = `Bearer ${tokenInfo?.bearerToken}`;
    apiInstance.defaults.headers.common.Accepted_Language = userInfo?.language || Languages.EN;
  }

  apiInstance.interceptors.response.use((res: AxiosResponse) => res.data);

  return apiInstance;
};

export default ApiInstance;
