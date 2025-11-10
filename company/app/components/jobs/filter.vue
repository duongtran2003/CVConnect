<template>
  <div class="filter-section">
    <div class="content">filter hien ra day</div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.filter-section {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .content {
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
  }
}
</style>
