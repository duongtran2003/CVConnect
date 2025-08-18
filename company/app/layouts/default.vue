<template>
  <div class="main-layout">
    <AppSidebar />
    <div class="main-content">
      <slot />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  height: 100vh;

  .main-content {
    max-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0px 6%;
  }
}
</style>
