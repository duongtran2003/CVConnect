<template>
  <div class="header">
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
  position: sticky;
  display: flex;
  gap: 12px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  top: 0px;
} 
</style>
