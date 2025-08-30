<template>
  <div class="main-layout">
    <AppSidebar />
    <div class="main-content">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const { token, clearToken } = useAuthStore();
</script>
<style lang="scss" scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  height: 100vh;
  background-color: $color-gray-100;

  .main-content {
    max-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0px 6%;
    flex: 1;
    background-color: $color-gray-100;
  }
}
</style>
