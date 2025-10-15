<template>
  <div class="wrapper">
    <div class="job-ad-content">
      job ad
      <div @click="handleCreate">Thêm mới</div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "org",
});
useHead({
  title: "Tin tuyển dụng",
});

const router = useRouter();

const handleCreate = () => {
  router.push({ path: "/org/job-ad/create" });
};
</script>
<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  min-height: 0;
  flex: 1;
  border-radius: 8px;
  margin-top: 8px;
  @include box-shadow;
}
.job-ad-content {
  background-color: white;
  min-height: calc(100% - 48px - 8px);
  @include box-shadow;
  color: $text-light;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  @include custom-scrollbar;
  height: 100%;
}
</style>
