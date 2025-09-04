<template>
  <div class="request-email-page">
    <div class="form-wrapper">
      <div class="request-email-form">
        <div class="form-header">
          <div class="logo">
            <img src="/logo-horizontal.svg" />
          </div>
          <div class="welcome-message">Gửi lại email xác thực</div>
          <div class="welcome-desc">Yêu cầu gửi lại email xác thực</div>
        </div>
        <div class="form-content">
          <AppInputText
            :value="formInput.identifier"
            :label="'Tên đăng nhập (Hoặc email)'"
            :required="true"
            :error="formError.identifier"
            @input="handleInput('identifier', $event)"
            @blur="validateKey('identifier')"
          />
          <AppButton
            class="request-email-button"
            :is-loading="isLoading"
            :text="buttonText"
            :is-disabled="isButtonDisabled"
            @click="handleRequestEmail"
          />
          <NuxtLink to="/auth/login" class="link">Trở về đăng nhập</NuxtLink>
        </div>
      </div>
    </div>
    <div class="image">
      <img
        class="wall-image"
        src="https://res.cloudinary.com/daygzzzwz/image/upload/v1756545359/cv-connect/background-login-small_tm858w.png"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: "auth" });
useHead({
  title: "Lấy lại mật khẩu",
});
const formInput = ref({
  identifier: "",
});

const formError = ref({
  identifier: "",
});

const isButtonDisabled = computed(() => {
  return countdown.value > 0;
});
const buttonText = computed(() => {
  if (countdown.value === 0) {
    return "Đồng ý";
  }
  return `Gửi lại sau ${countdown.value} giây`;
});
const countdown = ref(0);
const countdownRef = ref<number | null>(null);

const handleRequestEmail = () => {
  countdown.value = 5;
  countdownRef.value = window.setInterval(() => {
    if (countdown.value === 0 && countdownRef.value) {
      window.clearInterval(countdownRef.value);
      countdownRef.value = null;
      return
    }
    countdown.value -= 1;
  }, 1000);
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

const handleInput = (key: string, value: string) => {
  formInput.value[key as keyof typeof formInput.value] = value;
  formError.value[key as keyof typeof formError.value] = "";
};

const isLoading = ref(false);
</script>
<style lang="scss" scoped>
.request-email-page {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;
  .form-wrapper {
    width: 40vw;
    min-width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .request-email-form {
      justify-content: center;
      display: flex;
      flex-direction: column;
      min-width: 450px;
      padding: 32px 60px 0px 60px;
      flex: 1;
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
        width: 100%;

        .request-email-button {
          margin-top: 12px;
          background-color: $color-primary-500;
          border-radius: 8px;
          color: $text-dark;

          &.disabled {
            background-color: $color-gray-400;
          }
        }

        .link {
          color: $color-primary-400;
          font-size: 13px;
          margin-top: -4px;
          cursor: pointer;
          align-self: flex-end;
        }
      }
    }
  }

  .image {
    max-width: 60vw;
    @media (max-width: 850px) {
      display: none;
    }
    img.wall-image {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
