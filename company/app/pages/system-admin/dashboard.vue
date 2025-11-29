<template>
  <div class="dashboard-wrapper">
    <div class="title">Thống kê hệ thống</div>
    <div class="top">
      <span>Từ</span>
      <AppInputSearchSelect
        :label="''"
        :required="true"
        :options="months"
        :value="selectedMonth"
        :error="''"
        :placeholder="'Chọn tháng'"
        :remote-filter="false"
        :multiple="false"
        :fetch-fn="null"
        :allow-clear="false"
        @input="($event) => (selectedMonth = $event)"
      />
      <span>Đến</span>
      <AppInputSearchSelect
        :label="''"
        :required="true"
        :options="months"
        :value="selectedMonth"
        :error="''"
        :placeholder="'Chọn tháng'"
        :remote-filter="false"
        :multiple="false"
        :fetch-fn="null"
        :allow-clear="false"
        @input="($event) => (selectedMonth = $event)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { MONTHS } from "~/const/views/system-admin/dashboard";

definePageMeta({
  layout: "system-admin",
});

const selectedMonth = ref<any>(undefined);
const months = computed(() => {
  return MONTHS;
});
</script>
<style lang="scss" scoped>
.dashboard-wrapper {
  overflow: hidden;
  min-height: 0;
  flex: 1;
  border-radius: 8px;
  margin-top: 8px;
  @include box-shadow;
  background-color: white;
  padding: 20px;

  .title {
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 12px;
  }

  .top {
    display: flex;
    flex-direction: row;

    :deep(.search-select-input) {
      max-width: 200px;
    }
  }
}
</style>
