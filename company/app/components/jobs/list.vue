<template>
  <div class="jobs-list">
    <div class="list">
      <JobsListsCard
        v-for="job of jobsList"
        :key="job.id"
        :data="job"
        @click="setSelectedJob(job)"
      />
    </div>
    <!-- <div class="detail">detail hien ra day</div> -->
  </div>
</template>
<script setup lang="ts">
const jobsSearchStore = useJobsSearchStore();
const { setSelectedJob } = jobsSearchStore;
const { jobsList } = storeToRefs(jobsSearchStore);
</script>
<style lang="scss" scoped>
.jobs-list {
  display: flex;
  flex-direction: row;
  gap: 8px;

  .detail {
    position: sticky;
    top: 120px;
  }
}
</style>
