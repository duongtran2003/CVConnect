<template>
  <div class="header">
    <AppBreadcrumb />
    <AppHeaderSearch />
    <AppHeaderNotificationBell />
    <AppHeaderAvatar />
  </div>
</template>
<script setup lang="ts">
  
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 48px;
  display: flex;
  gap: 12px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  top: 0px;
  padding-right: 20px;
  padding-left: 20px;
} 
</style>
