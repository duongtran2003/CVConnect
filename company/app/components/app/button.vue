<template>
  <div
    class="button"
    :class="{ disabled: isDisabled }"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <div class="button-text">{{ text }}</div>
    <div v-if="isLoading" class="loading-icon">
      <Icon :name="'line-md:loading-twotone-loop'" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { SPINNER_COLOR } from "~/const/spinner";

export type TButtonProps = {
  text: string;
  isLoading?: boolean;
  spinnerColor?: string;
  isDisabled?: boolean;
};
const props = withDefaults(defineProps<TButtonProps>(), {
  isLoading: false,
  spinnerColor: SPINNER_COLOR.WHITE,
  isDisabled: false,
});

const emit = defineEmits<{
  (e: "click"): void;
}>();

const handleClick = () => {
  if (props.isLoading || props.isDisabled) {
    return;
  }

  emit("click");
};
</script>
<style lang="scss" scoped>
.button {
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: filter 200ms;

  .loading-icon {
    display: flex;
    align-items: center;
  }

  &.disabled {
    background-color: $color-gray-400;
    cursor: default;
  }

  &:hover:not(.disabled) {
    filter: brightness(0.96);
  }
}
</style>
