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

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref<string | null>("not_set");
    const roles = ref<TAccountRole[]>([]);
    const currentRole = ref<TAccountRole | null | undefined>(undefined);

    const setToken = (_token: string) => {
      token.value = _token;
    };

    const setRoles = (_roles: TAccountRole[]) => {
      roles.value = _roles;
    };

    const setCurrentRole = (_role: TAccountRole | null) => {
      currentRole.value = _role;
    };

    const clearToken = () => {
      token.value = null;
      currentRole.value = null;
      roles.value = [];
    };

    return {
      token,
      roles,
      currentRole,
      setToken,
      clearToken,
      setRoles,
      setCurrentRole,
    };
  },
  {
    persist: {
      storage: localStorage,
      omit: ["currentRole"],
    },
  },
);
