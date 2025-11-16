<template>
  <div class="public-layout">
    <div class="main-content">
      <AppPublicHeader />
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.public-layout {
  display: flex;
  min-height: 100vh;
  height: 100vh;
  max-height: 100vh;
  background-color: $color-gray-100;
  width: 100%;
  overflow: hidden;

  :deep(.main-content) {
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
