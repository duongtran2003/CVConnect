import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { STATUS_CODE } from "~/const/api";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const apiBaseUrl = runtimeConfig.public.apiBaseUrl;
  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
  });

  const refreshAuthLogic = (failedRequest: any) =>
    axios
      .post(`${apiBaseUrl}/user/auth/refresh`)
      .then((tokenRefreshResponse) => {
        useAuthStore().setToken(tokenRefreshResponse.data.token);
        failedRequest.response.config.headers["Authorization"] =
          "Bearer " + tokenRefreshResponse.data.token;
        return Promise.resolve();
      });

  createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
    shouldRefresh: (error) =>
      error?.response?.data?.code === STATUS_CODE.TOKEN_EXPIRED,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = useAuthStore().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response &&
        error.response.data?.code === STATUS_CODE.TOKEN_INVALID
      ) {
        useAuthStore().clearToken();
      }
      return Promise.reject(error);
    },
  );

  return {
    provide: { axios: axiosInstance },
  };
});
