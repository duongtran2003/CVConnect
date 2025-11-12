<template>
  <div class="filter-section">
    <div class="content">
      <AppInputSearchSelect
        :label="''"
        :required="true"
        :options="filterOptions?.careers ?? []"
        :value="filter?.careers ?? []"
        :error="''"
        :placeholder="'Chọn ngành nghề'"
        :search-placeholder="'Tìm kiếm'"
        :remote-filter="false"
        :multiple="true"
        :slim-error="true"
        :fetch-fn="null"
        @input="handleSetFilter('careers', $event)"
        @clear-value="handleSetFilter('careers', undefined)"
      />
      <AppInputSearchSelect
        :label="''"
        :required="true"
        :options="filterOptions?.levels ?? []"
        :value="filter?.levels ?? []"
        :error="''"
        :placeholder="'Chọn cấp bậc'"
        :search-placeholder="'Tìm kiếm'"
        :remote-filter="false"
        :multiple="true"
        :slim-error="true"
        :fetch-fn="null"
        @input="handleSetFilter('levels', $event)"
        @clear-value="handleSetFilter('levels', undefined)"
      />
      <AppInputSearchSelect
        :label="''"
        :required="true"
        :options="filterOptions?.jobTypes ?? []"
        :value="filter?.jobTypes ?? []"
        :error="''"
        :placeholder="'Chọn loại công việc'"
        :search-placeholder="'Tìm kiếm'"
        :remote-filter="false"
        :multiple="true"
        :slim-error="true"
        :fetch-fn="null"
        @input="handleSetFilter('jobTypes', $event)"
        @clear-value="handleSetFilter('jobTypes', undefined)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const jobsSearchStore = useJobsSearchStore();
const { filterOptions, filter } = storeToRefs(jobsSearchStore);

const emits = defineEmits<{
  (e: "filter", newFilter: any): void;
}>();

function handleSetFilter(key: string, value: any) {
  emits("filter", { [key]: value });
}
</script>
<style lang="scss" scoped>
.filter-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: white;
  @include box-shadow;

  .content {
    border-top: 1px solid $color-gray-300;
    border-bottom: 1px solid $color-gray-300;
    padding: 16px 16px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;

    .search-select-input {
      max-width: 320px;
    }
  }
}
</style>
