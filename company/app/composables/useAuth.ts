import type { TApiOption } from "~/plugins/axios";

export type TLoginCredentials = {
  username: string;
  password: string;
};

export type TRegisterCredentials = {
  fullName: string;
  email: string;
  username: string;
  password: string;
};

export const useAuth = () => {
  const { $axios } = useNuxtApp();
  const { setToken, setRoles, setCurrentRole, clearToken } = useAuthStore();
  const { clearUser } = useUserStore();
  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);
  const toast = useToast();
  const router = useRouter();

  const login = async (credentials: TLoginCredentials) => {
    try {
      const res = await $axios.post("/_api/user/auth/login", credentials, {
        skipAuth: true,
        skipAuthRefresh: true,
      });
      toast.add({
        title: res.data.message,
        color: "success",
      });
      setToken(res.data.data.token);
      setRoles(res.data.data.roles);
      if (res.data.data.roles.length == 1) {
        setCurrentRole(res.data.data.roles[0]);
      } else {
        if (res.data.data.roles.length == 0) {
          router.push({ path: "/403" });
        }
      }
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

  const register = async (credentials: TRegisterCredentials) => {
    try {
      const res = await $axios.post(
        "/_api/user/auth/register-candidate",
        credentials,
        {
          skipAuth: true,
        },
      );
      toast.add({
        title: res.data.message,
        color: "success",
      });
      return res.data;
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

  const registerOrgAdmin = async (credentials: FormData) => {
    try {
      const res = await $axios.post(
        "/_api/user/auth/register-org-admin",
        credentials,
        {
          skipAuth: true,
        },
      );
      toast.add({
        title: res.data.message,
        color: "success",
      });
      return res.data;
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

  const requestResendVerifyEmail = async (identifier: string) => {
    try {
      const res = await $axios.get(
        `/_api/user/auth/request-resend-verify-email?identifier=${identifier}`,
        {
          skipAuth: true,
        },
      );
      toast.add({
        title: res.data.message,
        color: "success",
      });
      return res.data;
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

  const verifyEmail = async (token: string) => {
    try {
      const res = await $axios.put(
        `/_api/user/auth/verify-email/${token}`,
        {},
        { skipAuth: true },
      );
      return res.data;
    } catch (err: any) {
      console.error(err);
      return false;
    }
  };

  const logout = async () => {
    try {
      await $axios.post("/_api/user/auth/logout");
      await router.push({ path: "/auth/login" });
      clearToken();
      clearUser();
      clearLocalCurrentRole();
    } catch (err) {
      console.error(err);
      clearLocalCurrentRole();
      clearToken();
      clearUser();
    }
  };

  const requestResetPassword = async (identifier: string) => {
    try {
      const res = await $axios.get(
        `/_api/user/auth/request-reset-password?identifier=${identifier}`,
        {
          skipAuth: true,
        },
      );
      toast.add({
        title: res.data.message,
        color: "success",
      });
      return res.data;
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

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const res = await $axios.put(
        `/_api/user/auth/reset-password`,
        {
          token,
          newPassword,
        },
        { skipAuth: true },
      );
      return res.data;
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

  const verifyToken = async () => {
    try {
      const res = await $axios.post(`/_api/user/auth/verify`, {
        token: token.value,
      });
      return res.data;
    } catch (err: any) {
      return null;
    }
  };

  const getMe = async (role: TAccountRole, option?: TApiOption) => {
    try {
      const res = await $axios.get(`/_api/user/user/my-info/${role.id}`);
      return res;
    } catch (err: any) {
      if (!option?.isSilent && err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      return null;
    }
  };

  const setDefaultRole = async (role: TAccountRole) => {
    try {
      const res = await $axios.put(`/_api/user/user/role-default/${role.id}`);
      return res;
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      return null;
    }
  };

  const getMenus = async (role: TAccountRole) => {
    try {
      const res = await $axios.get(`/_api/user/menu/menu-by-role/${role.id}`);
      return res.data.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      console.error(err);
      return null;
    }
  };

  return {
    login,
    logout,
    getMe,
    getMenus,
    verifyToken,
    register,
    requestResendVerifyEmail,
    verifyEmail,
    requestResetPassword,
    resetPassword,
    registerOrgAdmin,
    setDefaultRole,
  };
};
