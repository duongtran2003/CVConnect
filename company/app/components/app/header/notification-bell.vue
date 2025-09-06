<template>
  <div class="wrapper">
    <div class="bell">
      <Icon
        class="icon"
        :class="{ unread: hasUnread }"
        :name="hasUnread ? 'mdi:bell-badge-outline' : 'mdi:bell-outline'"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const hasUnread = ref<boolean>(true);
</script>
<style lang="scss" scoped>
.wrapper {
  .bell {
    cursor: pointer;
    background-color: $color-gray-200;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 36px;

    .icon {
      display: block;
      color: $color-gray-700;
      font-size: 20px;

      &.unread {
        color: $color-danger;
      }
    }
  }
}
</style>
