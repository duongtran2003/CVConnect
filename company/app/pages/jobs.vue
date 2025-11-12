<template>
  <div class="jobs-result">
    <HomeSearchSection @search="handleSearch" />
    <JobsFilter @filter="handleFilter" />
    <div class="content">
      <JobsList class="left" />
      <JobsListsDetail class="right" />
    </div>
    <div class="pagination">phan trang</div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "public",
});

const route = useRoute();
const router = useRouter();

const jobsSearchStore = useJobsSearchStore();
const { setFilterOptions, setFilter } = jobsSearchStore;
const { filter, filterOptions } = storeToRefs(jobsSearchStore);
const { getFilter } = useJobsSearchApi();

onBeforeMount(async () => {
  const res = await getFilter();
  res.data.careers = res.data.careers.map((career: any) => ({
    label: career.name,
    value: career.id,
  }));
  res.data.levels = res.data.levels.map((level: any) => ({
    label: level.name,
    value: level.id,
  }));
  res.data.jobTypes = res.data.jobTypes.map((t: any) => ({
    label: t.description,
    value: t.name,
  }));
  setFilterOptions(res.data);
  syncFromQuery();
});

function syncFromQuery() {
  const q = route.query;
  const f: any = {};
  if (q.keyword) {
    f.keyword = q.keyword;
  }
  if (q.careers) {
    const careers = (q.careers as string).split(",");
    const careersFilter = [];
    for (const c of careers) {
      const career = filterOptions.value.careers.find(
        (_c: any) => (_c.value == +c),
      );
      if (career) {
        careersFilter.push(career);
      }
    }
    f.careers = careersFilter;
  }

  if (q.levels) {
    const levels = (q.levels as string).split(",");
    const levelsFilter = [];
    for (const c of levels) {
      const level = filterOptions.value.levels.find(
        (_c: any) => (_c.value == +c),
      );
      if (level) {
        levelsFilter.push(level);
      }
    }
    f.levels = levelsFilter;
  }

  if (q.jobTypes) {
    const jobTypes = (q.jobTypes as string).split(",");
    const jobTypesFilter = [];
    for (const c of jobTypes) {
      const level = filterOptions.value.jobTypes.find(
        (_c: any) => (_c.value == c),
      );
      if (level) {
        jobTypesFilter.push(level);
      }
    }
    f.jobTypes = jobTypesFilter;
  }

  console.log({ f });

  setFilter(f);
}

function syncToQuery() {
  const f = filter.value;
  const q: any = {};
  if (f.keyword) {
    q.keyword = f.keyword;
  }
  if (f.careers && f.careers.length) {
    q.careers = f.careers.map((career: any) => career.value).join(",");
  }
  if (f.levels && f.levels.length) {
    q.levels = f.levels.map((level: any) => level.value).join(",");
  }
  if (f.jobTypes && f.jobTypes.length) {
    q.jobTypes = f.jobTypes.map((t: any) => t.value).join(",");
  }

  router.replace({ query: q });
}

function handleSearch(keyword: string) {
  setFilter({ ...filter.value, keyword: keyword });
  syncToQuery();
}

function handleFilter(newValue: any) {
  setFilter({ ...filter.value, ...newValue });
  syncToQuery();
}
</script>
<style lang="scss" scoped>
.jobs-result {
  overflow: auto;

  .content {
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 8px;

    .left {
      width: 40%;
      max-width: 40%;
    }
    .right {
      width: 60%;
      max-width: 60%;
    }
  }

  .pagination {
    display: flex;
    width: 100%;
    padding: 8px;
    margin-bottom: 8px;
    justify-content: center;
  }
}
</style>
