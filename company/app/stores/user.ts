export type TUserDetail = {
  detailInfo: {
    id: number;
    userId: number;
  };
  roles: TAccountRole;
};

export type TUser = {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  address?: string;
  dateOfBirth?: string;
  isEmailVerified?: boolean;
  accessMethod?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  roles?: TAccountRole[];
  userDetails: TUserDetail[];
};

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<TUser | null>(null);

  const setUser = (user: TUser) => {
    userInfo.value = user;
  };

  const clearUser = () => {
    userInfo.value = null;
  };

  return { userInfo, setUser, clearUser };
});
