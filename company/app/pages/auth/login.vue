<template>
  <div class="login-form">
    <div class="form-header">
      <img src="/logo-horizontal.svg" />
      <div class="welcome-message">Chào mừng quay trở lại!</div>
    </div>
    <div class="form-content">
      <AppInputText
        v-model="formInput.username"
        :label="'Tên đăng nhập'"
        :required="true"
        :error="formError.username"
      />
      <AppInputText
        v-model="formInput.password"
        :label="'Mật khẩu'"
        :required="true"
        :error="formError.password"
        :is-secured="true"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: "auth" });
useHead({
  title: "Đăng nhập",
});
const formInput = ref({
  username: '',
  password: '',
});

const formError = ref({
  username: '',
  password: '',
});
</script>
<style lang="scss" scoped>
.login-form {
  width: fit-content;
  padding: 32px 24px;
  height: 500px;
  background-color: $background-light;
  margin: auto;
  margin-top: 64px;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  .form-header {
    display: flex;
    flex-direction: column;
    .welcome-message {
      font-weight: 900;
      font-size: 28px;
      color: $color-primary-500;
      line-height: 24px;
      margin-left: 16px;
    }
    img {
      width: fit-content;
    }
  }

  .form-content {
    padding: 16px;
    margin-top: 12px;
  }
}
</style>
