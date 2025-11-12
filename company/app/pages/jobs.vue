<template>
  <div class="jobs-result">
    <HomeSearchSection />
    <JobsFilter />
    <div class="content">
      <JobsList class="left" />
      <JobsListsDetail class="right" />
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "public",
});
</script>
<style lang="scss" scoped>
.jobs-result {
  overflow: auto;

  .content {
    display: flex;
    flex-direction: row;
    gap: 8px;

    .left {
      width: 40%;
      max-width: 40%;
    }
    .right {
      width: 60%;
      max-width: 60%;
    }
  }
}
</style>
