import type { TApiOption } from "~/plugins/axios";

export type TLoginCredentials = {
  username: string;
  password: string;
};

export const useAuth = () => {
  const { $axios } = useNuxtApp();
  const { setToken, setRoles, token } = useAuthStore();
  const toast = useToast();

  const login = async (credentials: TLoginCredentials) => {
    try {
      console.log('call login')
      const res = await $axios.post("/_api/user/auth/login", credentials);
      toast.add({
        title: res.data.message,
        color: "success",
      });
      setToken(res.data.data.token);
      setRoles(res.data.data.roles);
      return true;
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      console.error(err);
      return false;
    }
  };

  const getMe = async (option?: TApiOption) => {
    try {
      console.log("run get me");
      const res = await $axios.get(`/_api/user/user/my-info`);
      return res
    } catch (err: any) {
      if (!option?.isSilent && err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      return null
    }
  };

  const getMenus = async (roleId: number) => {
    try {
      const res = await $axios.get(`/user/menu/menu-by-role/${roleId}`);
      console.log(res);
      return res.data.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      console.error(err);
      return [];
    }
  };

  return { login, getMe };
};
