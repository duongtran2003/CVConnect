<template>
  <div class="jobs-list">
    <div class="list">
      <JobsListsCard
        v-for="job of jobsList"
        :key="job.id"
        :data="job"
        :class="{ selected: job.id == selectedJob?.id }"
        @click="setSelectedJob(job)"
      />
    </div>
    <!-- <div class="detail">detail hien ra day</div> -->
  </div>
</template>
<script setup lang="ts">
const jobsSearchStore = useJobsSearchStore();
const { setSelectedJob } = jobsSearchStore;
const { jobsList, selectedJob } = storeToRefs(jobsSearchStore);
</script>
<style lang="scss" scoped>
.jobs-list {
  .list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .detail {
      position: sticky;
      top: 120px;
    }

    .job-card {
      transition: border 0.2s;
      &.selected {
        border: 1px solid $color-primary-400;
      }
    }
  }
}
</style>
