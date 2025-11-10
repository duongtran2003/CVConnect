<template>
  <div class="hot-jobs">
    <div class="title">
      <Icon name="fluent:megaphone-loud-20-filled" />
      Việc làm hot nhất
    </div>
    <div class="placeholder">placeholder</div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.hot-jobs {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    background-color: $color-gray-100;
    border-top: 1px solid $color-gray-300;
    border-bottom: 1px solid $color-gray-300;
    padding: 16px 0px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;

    font-size: 20px;
    font-weight: 600;

    .iconify {
      display: inline-block;
      font-size: 24px;
      height: 24px;
      width: 24px;
      color: $color-primary-400;
    }
  }
}
</style>
