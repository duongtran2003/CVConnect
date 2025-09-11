export const useDefaultRole = () => {
  const authStore = useAuthStore();
  const { currentRole, roles } = storeToRefs(authStore);
  const { setCurrentRole, clearToken } = authStore;
  const { setLoading } = useLoadingStore();
  const router = useRouter();
  const { logout } = useAuth();

  const handleRoleValidation = (redirect?: string) => {
    if (currentRole.value) {
      return;
    }
    const defaultRole = getDefaultRole();
    if (defaultRole) {
      const role = roles.value.find((role) => role.id == defaultRole.id);
      if (role) {
        const defaultRoute = getDefaultRoute(role);
        setCurrentRole(defaultRole);

        if (!redirect) {
          router.push({ path: defaultRoute });
        } else if (redirect !== defaultRoute) {
          router.push(redirect);
        }
      } else {
        clearDefaultRole();
      }
    }

    if (!currentRole.value) {
      if (roles.value.length > 1) {
        router.push({
          name: "role-select",
          query: redirect ? { redirect: redirect } : undefined,
        });
      } else if (roles.value.length == 1) {
        setCurrentRole(roles.value[0]!);
      }
    }
  };

  const checkPermission = async (requiredRole: TRole) => {
    if (currentRole.value && currentRole.value.code !== requiredRole) {
      setLoading(true);
      console.log(
        "logout when check permission failed",
        currentRole.value,
        currentRole.value.code,
        requiredRole,
      );
      await logout();
      clearToken();
      setLoading(false);
    }
  };

  return { handleRoleValidation, checkPermission };
};
