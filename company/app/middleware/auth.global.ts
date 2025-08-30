export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  if (authStore.token === null && to.path !== "/login") {
    return navigateTo("/login");
  }

  if (authStore.token !== null && to.path === "/login") {
    return navigateTo("/");
  }
});
