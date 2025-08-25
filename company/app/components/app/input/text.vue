<template>
  <label class="text-input">
    <div class="label">
      <div class="name">{{ label }}</div>
      <div v-if="required" class="required">Bắt buộc</div>
    </div>
    <div v-if="desc" class="desc">
      {{ desc }}
    </div>
    <div :class="{ error: error }" class="input-wrapper">
      <div class="input">
        <input
          :value="modelValue"
          :type="isSecured && isTextHidden ? 'password' : 'text'"
          @input="updateValue"
          v-on="$attrs"
        />
        <Icon
          v-if="isSecured"
          class="secure-toggle"
          :name="isTextHidden ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
          @click="() => (isTextHidden = !isTextHidden)"
        />
      </div>
    </div>
    <div class="error-message">{{ error }}</div>
  </label>
</template>
<script setup lang="ts">
export type TInputTextProps = {
  label: string;
  desc?: string;
  required?: boolean;
  modelValue: string;
  error: string;
  isSecured?: boolean;
};

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const props = withDefaults(defineProps<TInputTextProps>(), {
  desc: "",
  required: false,
  isSecured: false,
});

const { label, desc, required, modelValue } = toRefs(props);
const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement)?.value || "");
};
const isTextHidden = ref(true);
</script>
<style lang="scss" scoped>
.text-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  .label {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: flex-end;
    .name {
      font-size: 14px;
      color: $text-light;
    }
    .required {
      font-size: 12px;
      font-style: italic;
      color: $color-danger;
    }
  }
  .input-wrapper {
    border-radius: 8px;
    border: 3px solid transparent;
    display: flex;
    transition-duration: 200ms;

    &.error {
      border: 3px solid rgba($color-danger, 0.3);
      &:focus-within {
        border: 3px solid rgba($color-danger, 0.3);
      }
      .input {
        border: 2px solid rgba($color-danger, 1);

        &:hover,
        &:focus-within {
          border: 2px solid rgba($color-danger, 1);
        }
      }
    }

    .input {
      border-radius: 6px;
      padding: 8px 10px;
      border: 2px solid rgba($color-primary-500, 0.1);
      flex: 1;
      transition-duration: 200ms;
      display: flex;
      align-items: center;
      flex-direction: row;

      .secure-toggle {
        cursor: pointer;
      }

      input {
        flex: 1;
        font-size: 16px;
        outline: none;
        border: none;
      }

      &:hover,
      &:focus-within {
        border: 2px solid rgba($color-primary-400, 1);
      }
    }
    &:focus-within {
      border: 3px solid rgba($color-primary-500, 0.3);
    }
  }

  .error-message {
    color: $color-danger;
    font-size: 12px;
  }
}
</style>
