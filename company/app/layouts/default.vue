<template>
  <div class="main-layout">
    <div v-if="isLoading" class="loading-overlay">
      <AppSpinnerHalfCircle class="spinner" />
    </div>
    <AppSidebar />
    <div class="main-content">
      <AppHeader />
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const authStore = useAuthStore();
const { token, currentRole, roles } = storeToRefs(authStore);
const { setCurrentRole } = authStore;
const { setUser } = useUserStore();
const { getMe, verifyToken } = useAuth();
const loadingStore = useLoadingStore();
const { setLoading } = loadingStore;
const { isLoading } = storeToRefs(loadingStore);
const router = useRouter();
const route = useRoute();

watch(token, (newVal) => {
  if (newVal === null) {
    router.push({ name: "auth-login" });
  }
});

onBeforeMount(async () => {
  console.log(token);
  if (!token.value) {
    router.push({ name: "auth-login" });
    return;
  }
  setLoading(true);
  await verifyToken();
  setLoading(false);
  const defaultRole = getDefaultRole();
  if (defaultRole) {
    const role = roles.value.find((role) => role.id == defaultRole.id);
    if (role) {
      setCurrentRole(defaultRole);
    } else {
      clearDefaultRole();
    }
  }

  if (!currentRole.value) {
    if (roles.value.length > 1) {
      router.push({
        name: "role-select",
        query: { redirect: route.fullPath },
      });
    } else if (roles.value.length == 1) {
      setCurrentRole(roles.value[0]!);
    }
  }
  if (currentRole.value) {
    setLoading(true);
    const res = await getMe(currentRole.value, { isSilent: true });
    setLoading(false);
    if (res) {
      setUser(res.data.data);
      console.log(res.data.data);
    }
  }
});
</script>
<style lang="scss" scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  height: 100vh;
  background-color: $color-gray-100;

  .loading-overlay {
    position: fixed;
    z-index: 999;
    background-color: rgba(black, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    .spinner {
      display: block;
      font-size: 32px;
    }
  }

  .main-content {
    max-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 12px 12px;
    flex: 1;
  }
}
</style>
