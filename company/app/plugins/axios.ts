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

  const { setToken, clearToken, setRoles, setCurrentRole } = useAuthStore();
  const { clearUser } = useUserStore();
  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);
  const { logout } = useAuth();

  const refreshAuthLogic = (failedRequest: any) =>
    axios
      .post(`/_api/user/auth/refresh`, {}, { withCredentials: true })
      .then((tokenRefreshResponse) => {
        console.log(tokenRefreshResponse);
        setToken(tokenRefreshResponse.data.data.token);
        setRoles(tokenRefreshResponse.data.data.roles);
        if (tokenRefreshResponse.data.data.roles.length == 1) {
          setCurrentRole(tokenRefreshResponse.data.data.roles[0]);
        }
        failedRequest.response.config.headers["Authorization"] =
          "Bearer " + token;
        return Promise.resolve();
      })
      .catch((err) => {
        console.log("refresh loi ne");
        // const urlParts = window.location.href.split("/");
        // if (urlParts[urlParts.length - 1] !== "login") {
        //   clearToken();
        //   clearUser();
        // }
        clearToken();
        clearUser();
        logout();
      });

  createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
    statusCodes: [401, 403],
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      console.log(`token: ${token.value}`);
      if (token.value) {
        config.headers.Authorization = `Bearer ${token.value}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return {
    provide: { axios: axiosInstance },
  };
});
