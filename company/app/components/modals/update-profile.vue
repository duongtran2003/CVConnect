<template>
  <UModal
    v-model:open="isOpen"
    :title="modalTitle"
    :ui="{ content: 'max-w-[640px]' }"
  >
    <template #body>
      <div class="body">
        <!-- <div v-if="validationError" class="error-notice"> -->
        <!--   {{ validationError }} -->
        <!-- </div> -->
        <AppInputText
          :value="formInput.fullName"
          :label="'Tên đầy đủ'"
          :required="true"
          :error="formError.fullName"
          @input="handleInput('fullName', $event)"
          @blur="validateKey('fullName')"
        />
        <AppInputText
          :value="formInput.email"
          :label="'Email'"
          :required="true"
          :error="formError.email"
          @input="handleInput('email', $event)"
          @blur="validateKey('email')"
        />
        <AppInputText
          :value="formInput.phoneNumber"
          :label="'SĐT'"
          :required="false"
          :error="formError.phoneNumber"
          @input="handleInput('email', $event)"
          @blur="validateKey('phoneNumber')"
        />
        <AppInputDatepicker
          :label="'Ngày sinh'"
          :required="false"
          :value="formInput.dateOfBirth"
          :error="formError.dateOfBirth"
          :slim-error="false"
          :placeholder="''"
          :is-range="false"
          @input="handleInput('dateOfBirth', $event)"
        />
        <AppInputText
          :value="formInput.address"
          :label="'Địa chỉ'"
          :required="false"
          :error="formError.address"
          @input="handleInput('email', $event)"
        />
      </div>
    </template>
    <template #footer>
      <div class="modal-footer">
        <AppButton
          class="cancel-btn btn"
          :text="'Đóng'"
          @click="handleCancel"
        />
        <AppButton
          v-if="userInfo != null"
          class="submit-btn btn"
          :text="'Cập nhật'"
          :is-disabled="isSubmitDisabled"
          :is-loading="isLoading"
          @click="handleSubmit"
        />
      </div>
    </template>
  </UModal>
</template>
<script setup lang="ts">
import { EMAIL_REGEX } from "~/const/auth";

type TProps = {
  modelValue: boolean;
};

const props = defineProps<TProps>();

const emits = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "submit"): void;
}>();

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { updatePassword } = useUserApi();
const route = useRoute();

const formInput = ref<any>({});

const formError = ref<any>({
  newPasswordConf: "",
});

const modalTitle = computed(() => {
  return `Cập nhật hồ sơ`;
});

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emits("update:modelValue", value),
});

const isLoading = ref<boolean>(false);

const formRules = {
  fullName: [
    (input: string) => {
      if (!input.trim()) {
        formError.value.fullName = "Mời nhập tên đầy đủ";
        return false;
      }
      return true;
    },
  ],
  email: [
    (input: string) => {
      if (!input.trim()) {
        formError.value.email = "Mời nhập email";
        return false;
      }
      return true;
    },
    (input: string) => {
      const isValid = EMAIL_REGEX.test(input);
      if (!isValid) {
        formError.value.email = "Email không hợp lệ";
        return false;
      }
      return true;
    },
  ],
  phoneNumber: [
    (input: string) => {
      const trimmed = input.trim();

      if (!trimmed) {
        formError.value.phoneNumber = "";
        return true;
      }

      const vnStrictPhoneRegex =
        /^(03[2-9]|086|096|097|098|070|071|072|073|074|075|076|077|078|079|081|082|083|084|085|088|091|094|056|058|059)\d{7}$/;

      if (!vnStrictPhoneRegex.test(trimmed)) {
        formError.value.phoneNumber =
          "Số điện thoại không hợp lệ (10 chữ số, đúng đầu số nhà mạng VN)";
        return false;
      }

      formError.value.phoneNumber = "";
      return true;
    },
  ],
};

function resetForm() {
  formInput.value = {
    oldPassword: "",
    newPassword: "",
    newPasswordConf: "",
  };
}

function handleInput(key: string, value: any) {
  formInput.value[key] = value;
}

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

function handleCancel() {
  // Reset form
  resetForm();
  emits("update:modelValue", false);
}

const isSubmitDisabled = computed(() => {
  const form = formInput.value;

  if (!form.oldPassword || !form.newPassword || !form.newPasswordConf) {
    return true;
  }

  if (formError.value.newPasswordConf) {
    return true;
  }

  return false;
});

async function handleSubmit() {
  if (isSubmitDisabled.value) {
    return;
  }

  const payload = {
    currentPassword: formInput.value.oldPassword,
    newPassword: formInput.value.newPassword,
  };

  isLoading.value = true;
  const success = await updatePassword(payload);
  isLoading.value = false;

  if (success) {
    resetForm();
    emits("submit");
  }
}

watch(isOpen, async (val) => {
  if (val) {
    if (!userInfo.value) {
      return;
    }

    // clear form
    resetForm();
  }
});
</script>
<style lang="scss" scoped>
.body {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .divider {
    width: 100%;
    display: block;
    height: 1px;
    background-color: $color-gray-200;
  }

  :deep(.text-input) {
    flex: 1;
    .input {
      padding: 4px 6px;
      input {
        font-size: 14px;
      }
    }
  }

  .error-notice {
    font-size: 14px;
    color: $color-danger;
    background-color: rgba($color-danger, 0.05);
    border: 2px dashed $color-danger;
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 4px;
  }
}

.modal-footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-end;
}

.btn {
  font-size: 14px;
  padding: 6px 12px;

  &.cancel-btn {
    border: 1px solid $color-primary-500;
    color: $color-primary-500;
  }

  &.submit-btn {
    background-color: $color-primary-500;
    border: 1px solid $color-primary-500;
    color: $text-dark;

    &.disabled {
      background-color: $color-gray-400;
      border: 1px solid $color-gray-400;
    }
  }
}
</style>
