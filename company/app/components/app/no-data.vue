<template>
  <div class="no-data">
    <Icon name="twemoji:empty-nest" class="icon" />
    <div class="text">{{ props.text }}</div>
  </div>
</template>
<script setup lang="ts">
export type TNoDataProps = {
  text?: string;
};

const props = withDefaults(defineProps<TNoDataProps>(), {
  text: "Không có dữ liệu",
});
</script>
<style lang="scss" scoped>
.no-data {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  .icon {
    display: block;
    font-size: 64px;
  }
  .text {
    color: $color-gray-500;
  }
}
</style>
