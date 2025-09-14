<template>
  <div class="system-admin-layout">
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
import { isEmpty } from "lodash";

const permittedRole: TRole = "SYSTEM_ADMIN";

const authStore = useAuthStore();
const { token, currentRole } = storeToRefs(authStore);
const { setUser } = useUserStore();
const { getMe, verifyToken } = useAuth();
const loadingStore = useLoadingStore();
const { setLoading } = loadingStore;
const { isLoading } = storeToRefs(loadingStore);
const router = useRouter();
const route = useRoute();
const { handleRoleValidation, checkPermission } = useDefaultRole();

watch(token, (newVal) => {
  if (newVal === null) {
    router.push({ name: "auth-login" });
  }
});

watch(currentRole, async (newRole) => {
  await checkPermission(permittedRole);
});

onBeforeMount(async () => {
  if (!token.value) {
    router.push({ name: "auth-login" });
    return;
  }
  setLoading(true);
  await verifyToken();
  setLoading(false);

  handleRoleValidation(route.fullPath);

  if (currentRole.value) {
    await checkPermission(permittedRole);
    setLoading(true);
    const res = await getMe(currentRole.value, { isSilent: true });
    setLoading(false);
    if (res) {
      setUser(res.data.data);
    }
  }
});
</script>
<style lang="scss" scoped>
.system-admin-layout {
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
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    padding: 16px 16px 16px 8px;
    flex: 1;
  }
}
</style>
