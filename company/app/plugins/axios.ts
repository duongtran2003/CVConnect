import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { STATUS_CODE } from "~/const/api";

export type TApiOption = {
  isSilent: boolean;
};

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const { token, setToken } = useAuthStore();

  const refreshAuthLogic = (failedRequest: any) =>
    axios
      .post(`/_api/user/auth/refresh`, {}, { withCredentials: true })
      .then((tokenRefreshResponse) => {
        console.log(tokenRefreshResponse);
        setToken(tokenRefreshResponse.data.data.token);
        failedRequest.response.config.headers["Authorization"] =
          "Bearer " + token;
        return Promise.resolve();
      });

  createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
    statusCodes: [401, 403],
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = useAuthStore().token;
      console.log(`token: ${token}`);
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
        const urlParts = window.location.href.split("/");
        if (urlParts[urlParts.length - 1] !== "login") {
          window.location.reload();
        }
      }
      return Promise.reject(error);
    },
  );

  return {
    provide: { axios: axiosInstance },
  };
});
