<template>
  <div class="main-layout">
    <AppSidebar />
    <div class="main-content">
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
const router = useRouter();
const route = useRoute();

watch(token, (newVal) => {
  if (newVal === null) {
    router.push({ name: "auth-login" });
  }
});

onBeforeMount(async () => {
  await verifyToken();
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
    const res = await getMe(currentRole.value, { isSilent: true });
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

  .main-content {
    max-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0px 6%;
    flex: 1;
    background-color: $color-gray-100;
  }
}
</style>
