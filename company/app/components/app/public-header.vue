<template>
  <header class="public-header">
    <div class="logo" @click="handleClickLogo">
      <img src="/logo-horizontal.svg" />
    </div>
    <div class="right">
      <template v-if="avatarInfo">
        <AppPublicHeaderAvatar />
      </template>
      <template v-else>
        <NuxtLink :to="registerRedirectLink" class="link"
          >Đăng ký/Đăng nhập ngay</NuxtLink
        >
      </template>
    </div>
  </header>
</template>
<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const authStore = useAuthStore();
const { currentRole, roles } = storeToRefs(authStore);
const { setRoles } = authStore;

const avatarInfo = computed(() => {
  console.log(roles.value);
  if (!userInfo.value) {
    return null;
  }

  return {
    avatarUrl: userInfo.value.avatarUrl,
    fullName: userInfo.value.fullName,
    id: userInfo.value.id,
  };
});

const registerRedirectLink = computed(() => {
  return `/auth/register?redirect=${route.fullPath}`;
});

function handleClickLogo() {
  router.push({ path: "/" });
}
</script>
<style lang="scss" scoped>
.public-header {
  position: sticky;
  top: 0px;
  z-index: 2;
  background-color: white;
  @include box-shadow;
  height: 54px;
  padding: 8px 36px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
  align-items: center;

  .logo {
    cursor: pointer;
    img {
      height: 38px;
    }
  }

  .right {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;

    .link {
      font-size: 13px;
      color: $color-primary-500;
      text-decoration: underline;
      cursor: pointer;
      font-weight: 400;
    }

    .name {
      display: flex;
      flex-direction: column;
      gap: 2px;
      text-align: right;
      .text {
        font-size: 13px;
        color: $text-light;
        font-weight: 600;
      }
    }
  }
}
</style>
