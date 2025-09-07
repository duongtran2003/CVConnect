<template>
  <div class="candidate-content">
    <AppTableDataTable :table-data="tableData" />
    <AppNoData />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "system-admin",
});
useHead({
  title: 'Ứng viên'
})
const tableData = ref([]);
</script>

<style lang="scss" scoped>
.candidate-content {
  background-color: white;
  border-radius: 8px;
  margin-top: 4px;
  min-height: calc(100% - 48px - 4px);
  @include box-shadow;
  color: $text-light;
  padding: 12px;
  padding-top: 24px;
}
</style>
