export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const { getMe } = useAuth();

  if (authStore.token !== null) {
    try {
      const res = await getMe({ isSilent: true });
      console.log(res);

      // if (data) {
      //   // already logged in, skip login
      //   return navigateTo("/");
      // }
    } catch {
      // token invalid → do nothing, let them see login
      authStore.clearToken();
      userStore.clearUser();
    }
  }
});
