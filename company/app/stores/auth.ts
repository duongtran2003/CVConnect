import { defineStore } from "pinia";

export type TRole =
  | "CANDIDATE"
  | "SYSTEM_ADMIN"
  | "ORG_ADMIN"
  | "HR"
  | "INTERVIEWER";

export type TAccountRole = {
  id: number;
  code: TRole;
  name: string;
  memberType?: TRole;
};

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>("");
  const roles = ref<TAccountRole[]>([]);

  const setToken = (_token: string) => {
    token.value = _token;
  };

  const setRoles = (_roles: TAccountRole[]) => {
    roles.value = _roles;
  };

  const clearToken = () => {
    token.value = null;
  };

  return { token, setToken, clearToken, setRoles };
});
