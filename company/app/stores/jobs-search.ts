import { defineStore } from "pinia";

export const useJobsSearchStore = defineStore("jobsSearch", () => {
  const jobsList = ref<any[]>([]);
  const selectedJob = ref<any>(null);
  const filterOptions = ref<any>({});
  const filter = ref<any>({});
  const isNoData = ref<any>(false);
  const isFetchingJobs = ref<boolean>(false);

  function setSelectedJob(job: any) {
    selectedJob.value = job;
  }

  function setFilterOptions(filter: any) {
    filterOptions.value = filter;
  }

  function setFilter(_filter: any) {
    filter.value = _filter;
  }

  function setNoData(state: boolean) {
    isNoData.value = state;
  }

  function setJobsList(list: any) {
    jobsList.value = list;
  }

  function setIsFetchingJobs(state: boolean) {
    isFetchingJobs.value = state;
  }

  return {
    jobsList,
    selectedJob,
    isNoData,
    filter,
    filterOptions,
    isFetchingJobs,
    setSelectedJob,
    setFilterOptions,
    setFilter,
    setNoData,
    setJobsList,
    setIsFetchingJobs,
  };
});
