<template>
  <header class="public-header">
    <div class="logo">
      <img src="/logo-horizontal.svg" />
    </div>
  </header>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.public-header {
  position: sticky;
  top: 0px;
  z-index: 2;
  background-color: white;
  @include box-shadow;
  height: 54px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
  align-items: center;

  .logo {
    img {
      height: 38px;
    }
  }

  .right {

  }
}
</style>
