<template>
  <div class="login-page">
    <div class="login-form">
      <div class="form-header">
        <div class="logo">
          <img src="/logo-horizontal.svg" />
        </div>
        <div class="welcome-message">Đăng nhập</div>
        <div class="welcome-desc">Đăng nhập với tên đăng nhập và mật khẩu</div>
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
      <div class="form-footer">
        <div class="forgot-password">Quên mật khẩu</div>
      </div>
    </div>
    <div class="image">
      <img
        src="https://res.cloudinary.com/daygzzzwz/image/upload/v1756545359/cv-connect/background-login-small_tm858w.png"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: "auth" });
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
    if (isSuccess) {
      router.push({ name: "dashboard" });
    }
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
.login-page {
  display: flex;
  flex-direction: row;
  height: 100vh;
  .login-form {
    align-items: center;
    min-width: 450px;
    padding: 32px 60px;
    height: fit-content;
    width: 360px;
    margin: auto;
    border-radius: 16px;

    .form-header {
      display: flex;
      flex-direction: column;
      gap: 16px;
      .welcome-message {
        text-align: center;
        font-weight: 900;
        font-size: 24px;
        color: $color-primary-500;
        line-height: 24px;
      }
      .welcome-desc {
        font-size: 13px;
        text-align: center;
        color: $text-light;
        margin-top: -8px;
        margin-bottom: 24px;
      }
      .logo {
        display: flex;
        justify-content: center;
        margin-bottom: 12px;
        img {
          height: 72px;
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
        border-radius: 8px;
        color: $text-dark;

        &.disabled {
          background-color: $color-gray-400;
        }
      }
    }

    .form-footer {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: flex-end;

      .forgot-password {
        color: $color-primary-400;
        font-size: 13px;
        font-style: italic;
      }
    }
  }
  .image {
    @media (max-width: 900px) {
      display: none;
    }
    object-fit: cover;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
