<template>
  <div class="home">
    <HomeSearchSection @search="handleSearch" />
    <HomeHotJobs />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "public",
});

const router = useRouter();

const jobsSearchStore = useJobsSearchStore();
const { filter } = storeToRefs(jobsSearchStore);
const { setFilter } = jobsSearchStore;

function handleSearch(keyword: string) {
  setFilter({ ...filter.value, keyword: keyword });
  router.push({
    path: "/jobs",
    query: { keyword: filter.value.keyword ?? "" },
  });
}
</script>
<style lang="scss" scoped>
.home {
}
</style>
