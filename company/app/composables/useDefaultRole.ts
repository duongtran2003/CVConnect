export const useDefaultRole = () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);
  const { currentRole, roles } = storeToRefs(authStore);
  const { setCurrentRole } = authStore;
  const { setLoading } = useLoadingStore();
  const sidebarStore = useSidebarStore();
  const { sidebarData } = storeToRefs(sidebarStore);
  const router = useRouter();
  const route = useRoute();

  const handleRoleValidation = (redirect?: string) => {
    // if (currentRole.value) {
    //   if (route.name === "auth-login") {
    //     const defaultRoute = getDefaultRoute(currentRole.value);
    //
    //     if (!redirect) {
    //       router.push({ path: defaultRoute });
    //     } else if (redirect !== defaultRoute) {
    //       router.push(redirect);
    //     }
    //   }
    //   return;
    // }

    const localRole = getLocalCurrentRole();
    if (localRole) {
      const defaultRoute = getDefaultRoute(localRole);
      setCurrentRole(localRole);

      if (!redirect) {
        router.push({ path: defaultRoute });
      } else if (redirect !== defaultRoute) {
        router.push(redirect);
      }
    } else {
      const defaultRole = roles.value.filter((role) => role.isDefault);
      if (defaultRole.length && defaultRole[0]) {
        const defaultRoute = getDefaultRoute(defaultRole[0]);
        setCurrentRole(defaultRole[0]);

        if (!redirect) {
          router.push({ path: defaultRoute });
        } else if (redirect !== defaultRoute) {
          router.push(redirect);
        }
      } else {
        if (roles.value.length > 1) {
          router.push({
            name: "role-select",
            query: redirect ? { redirect: redirect } : undefined,
          });
        } else if (roles.value.length == 1 && roles.value[0]) {
          setCurrentRole(roles.value[0]);
        } else if (roles.value.length == 0 && route.path !== "/auth/login") {
          console.log("use default role 403");
          router.push({ path: "/403" });
        }
      }
    }
  };

  const checkPermission = async (requiredRole: TRole) => {
    if (currentRole.value && currentRole.value.code !== requiredRole) {
      setLoading(true);
      // console.log(
      //   "logout when check permission failed",
      //   currentRole.value,
      //   currentRole.value.code,
      //   requiredRole,
      // );
      // const defaultRoute = getDefaultRoute(currentRole.value);
      router.push({ path: "/403" });
      setLoading(false);
    }
  };

  const checkMemberType = async (requiredMemberType: string) => {};

  return { handleRoleValidation, checkPermission };
};
