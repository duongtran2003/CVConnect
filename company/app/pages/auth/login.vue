<template>
  <div class="login-form">
    <div class="form-header">
      <div class="logo">
        <img src="/logo-horizontal.svg" />
      </div>
      <div class="welcome-message">Chào mừng quay trở lại!</div>
    </div>
    <div class="form-content">
      <AppInputText
        :value="formInput.username"
        :label="'Tên đăng nhập'"
        :required="true"
        :error="formError.username"
        @input="handleInput('username', $event)"
        @blur="validateKey('username')"
      />
      <AppInputText
        :value="formInput.password"
        :label="'Mật khẩu'"
        :required="true"
        :error="formError.password"
        :is-secured="true"
        @input="handleInput('password', $event)"
        @blur="validateKey('password')"
      />
      <AppButton
        class="login-button"
        :is-loading="isLoading"
        :text="'Đăng nhập'"
        :is-disabled="!isFormValid"
        @click="handleLoginClick"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: "auth", middleware: "guest-check" });
useHead({
  title: "Đăng nhập",
});
const { login } = useAuth();
const router = useRouter();
const formInput = ref({
  username: "",
  password: "",
});

const formError = ref({
  username: "",
  password: "",
});

const formRules = {
  username: [
    (input: string) => {
      if (!input.trim()) {
        formError.value.username = "Mời nhập tên đăng nhập";
        return false;
      }
      return true;
    },
  ],
  password: [
    (input: string) => {
      if (!input.trim()) {
        formError.value.password = "Mời nhập mật khẩu";
        return false;
      }
      return true;
    },
  ],
};

const isFormValid = computed(() => {
  for (const key of Object.keys(
    formError.value,
  ) as (keyof typeof formError.value)[]) {
    if (formError.value[key]) {
      return false;
    }
  }
  return true;
});

const validateForm = () => {
  for (const key of Object.keys(
    formInput.value,
  ) as (keyof typeof formInput.value)[]) {
    validateKey(key);
  }
};

const validateKey = (key: keyof typeof formInput.value) => {
  const input = formInput.value[key];
  const rules = formRules[key as keyof typeof formRules];
  for (const rule of rules) {
    const ok = rule(input);
    if (!ok) {
      break;
    }
  }
};

const handleLoginClick = async () => {
  // if able, validate before calling api
  validateForm();
  if (isFormValid.value) {
    const loginCredentials: TLoginCredentials = {
      username: formInput.value.username,
      password: formInput.value.password,
    };
    isLoading.value = true;
    const isSuccess = await login(loginCredentials);
    // if (isSuccess) {
    //   router.push({ name: "dashboard" });
    // }
    isLoading.value = false;
  }
};

const handleInput = (key: string, value: string) => {
  formInput.value[key as keyof typeof formInput.value] = value;
  formError.value[key as keyof typeof formError.value] = "";
};

const isLoading = ref(false);
</script>
<style lang="scss" scoped>
.login-form {
  width: fit-content;
  padding: 32px 24px;
  height: fit-content;
  width: 360px;
  background-color: $background-light;
  margin: auto;
  margin-top: 64px;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  .form-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .welcome-message {
      font-weight: 900;
      font-size: 24px;
      color: $color-primary-500;
      line-height: 24px;
    }
    .logo {
      img {
        height: 64px;
      }
    }
  }

  .form-content {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .login-button {
      margin-top: 12px;
      background-color: $color-primary-500;
      color: $text-dark;

      &.disabled {
        background-color: $color-gray-400;
      }
    }
  }
}
</style>
