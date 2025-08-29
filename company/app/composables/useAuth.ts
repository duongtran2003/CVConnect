export type TLoginCredentials = {
  username: string;
  password: string;
};

export const useAuth = () => {
  const { $axios } = useNuxtApp();
  const { setToken } = useAuthStore();
  const toast = useToast();

  const login = async (credentials: TLoginCredentials) => {
    try {
      const res = await $axios.post("/user/auth/login", credentials);
      toast.add({
        title: res.data.message,
        color: "success",
      });
      setToken(res.data.data.token);
      return true
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.add({
          title: err.response.data.message,
          color: "error",
        });
      }
      console.error(err);
      return false
    }
  };

  return { login };
};
