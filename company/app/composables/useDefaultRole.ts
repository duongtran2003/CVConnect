export const useDefaultRole = () => {
  const authStore = useAuthStore();
  const { currentRole, roles } = storeToRefs(authStore);
  const { setCurrentRole } = authStore;
  const router = useRouter();

  const handleRoleValidation = (redirect?: string) => {
    const defaultRole = getDefaultRole();
    if (defaultRole) {
      const role = roles.value.find((role) => role.id == defaultRole.id);
      if (role) {
        const defaultRoute = getDefaultRoute(role);
        setCurrentRole(defaultRole);

        if (!redirect) {
          router.push({ path: defaultRoute });
        } else if (redirect !== defaultRoute) {
          router.push({ path: redirect });
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

  return { handleRoleValidation };
};
