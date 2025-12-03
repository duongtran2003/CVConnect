<template>
  <div class="profile-page-wrapper">
    <div class="profile-page">
      <div class="large-content">awoidjawd</div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "profile-layout",
});
</script>
<style lang="scss" scoped>
.profile-page-wrapper {
  margin-top: 8px;
  max-height: 100%;
  border-radius: 8px;
  overflow-y: auto;
  overflow-x: hidden;
}

.profile-page {
  background-color: wheat;
  width: 100%;
  height: fit-content;
  max-height: 100%;

  @include box-shadow;

  .large-content {
    height: 6969px;
    min-height: 6969px;
  }
}
</style>
