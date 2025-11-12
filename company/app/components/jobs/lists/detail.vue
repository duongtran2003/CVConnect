<template>
  <div class="detail">{{ selectedJob }}</div>
</template>
<script setup lang="ts">
const jobsSearchStore = useJobsSearchStore();
const { selectedJob } = storeToRefs(jobsSearchStore);
</script>
<style lang="scss" scoped>
.detail {
  position: sticky;
  height: 80vh;
  top: 4px;
  background-color: wheat;
}
</style>
