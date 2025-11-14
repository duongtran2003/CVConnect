<template>
  <div class="jobs-result">
    <HomeSearchSection @search="handleSearch" />
    <JobsTopFilter class="top-filter" @filter="handleFilter" />
    <div class="content">
      <JobsFilter
        v-if="selectedJob == null"
        class="filtter-col"
        :class="{ 'has-filter': selectedJob == null }"
        @filter="handleFilter"
      />
      <JobsList
        class="list-col"
        :class="{ 'has-filter': selectedJob == null }"
      />
      <JobsListsDetail
        v-if="selectedJob != null"
        class="detail-col"
        :class="{ 'has-filter': selectedJob == null }"
      />
    </div>
    <div class="pagination">phan trang</div>
  </div>
</template>
<script setup lang="ts">
import { SALARY_FILTER } from "~/const/views/public/jobs";

definePageMeta({
  layout: "public",
});

const route = useRoute();
const router = useRouter();

const jobsSearchStore = useJobsSearchStore();
const { setFilterOptions, setFilter, setJobsList } = jobsSearchStore;
const { filter, filterOptions, selectedJob } = storeToRefs(jobsSearchStore);
const { getFilter, getJobAds } = useJobsSearchApi();
const currentPage = ref<any>(0);

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
  res.data.levels.unshift({
    label: "Tất cả",
    value: 0,
  });
  res.data.jobTypes = res.data.jobTypes.map((t: any) => ({
    label: t.description,
    value: t.name,
  }));
  res.data.jobTypes.unshift({
    label: "Tất cả",
    value: "ALL",
  });

  const filters = {
    ...res.data,
    salary: SALARY_FILTER,
  };

  setFilterOptions(filters);
  syncFromQuery();
  const jobAdsRes = await getJobAds({});
  console.log({ jobAdsRes });
  setJobsList(jobAdsRes.data.data.data);
  const locationFilter = jobAdsRes.data.locations.map((loc: any) => ({
    value: loc.province,
    label: `${loc.province} (${loc.jobAdCount})`,
  }));

  setFilterOptions({
    ...filters,
    location: locationFilter,
  });

  const q = route.query;
  const f: any = {};
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
        (_c: any) => _c.value == +c,
      );
      if (career) {
        careersFilter.push(career);
      }
    }
    f.careers = careersFilter;
  }

  if (q.levels) {
    const levels = q.levels as string;
    const level = filterOptions.value.levels.find(
      (_c: any) => _c.value == +levels,
    );
    if (level) {
      f.levels = level.value;
    }
  }

  if (q.jobTypes) {
    const jobTypes = q.jobTypes as string;
    if (jobTypes) {
      f.jobTypes = jobTypes;
    }
  }

  if (q.salary) {
    const salaries = q.salary as string;

    if (salaries) {
      f.salary = salaries;
    }
  }

  if (q.location) {
    const locations = q.location as string;
    if (locations) {
      f.location = locations;
    }
  }

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
  if (f.levels != undefined && f.levels != null) {
    q.levels = f.levels;
  }
  if (f.jobTypes) {
    q.jobTypes = f.jobTypes;
  }
  if (f.salary) {
    q.salary = f.salary;
  }
  if (f.location) {
    q.location = f.location;
  }

  router.replace({ query: q });
}

function handleSearch(keyword: string) {
  setFilter({ ...filter.value, keyword: keyword });
  syncToQuery();
}

function handleFilter(newValue: any) {
  console.log(newValue);
  setFilter({ ...filter.value, ...newValue });
  syncToQuery();
}
</script>
<style lang="scss" scoped>
.jobs-result {
  overflow: auto;

  .top-filter {
    margin-top: 8px;
  }

  .content,
  .top-filter {
    max-width: 75%;
    @media (max-width: 768px) {
      max-width: 100%;
    }
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 8px;

    .filtter-col {
      max-width: 280px;
      width: 280px;
    }

    .list-col {
      max-width: 360px;

      &.has-filter {
        flex: 1;
        max-width: none;
      }
    }
    .detail-col {
      flex: 1;
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
