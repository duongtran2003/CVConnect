import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);

  const setToken = (_token: string) => {
    token.value = _token;
  };

  const clearToken = () => {
    token.value = null;
  };

  return { token, setToken, clearToken };
});
