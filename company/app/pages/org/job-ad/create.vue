<template>
  <div class="wrapper">
    <div class="create-content">
      <AppBackNavigator
        :title="'Tạo mới tin tuyển dụng'"
        :fallback-route="'/org/job-ad'"
      />
      <AppTabber
        :tabs="tabs"
        :current-tab-index="currentTabIndex"
        @tab-switch="handleTabSwitch($event)"
      />
      <div class="tab-content">
        <OrgAdJobCreateGeneralInfo v-show="currentTabIndex == 1" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CREATE_BREADCRUMBS, CREATE_TABS } from "~/const/views/org/job-ad";

definePageMeta({
  layout: "org-admin",
});
useHead({
  title: "Tạo mới tin tuyển dụng",
});

const breadcrumbStore = useBreadcrumbStore();
const { overrideItems, clearOverrideItems } = breadcrumbStore;

const currentTabIndex = ref<number>(1);

onBeforeMount(() => {
  overrideItems(CREATE_BREADCRUMBS);
});

const tabs = computed(() => {
  return CREATE_TABS;
});

const handleTabSwitch = (index: number) => {
  currentTabIndex.value = index;
};

onBeforeUnmount(() => {
  clearOverrideItems();
});
</script>
<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  min-height: 0;
  flex: 1;
  border-radius: 8px;
  margin-top: 8px;
  @include box-shadow;
}
.create-content {
  background-color: white;
  min-height: calc(100% - 48px - 8px);
  @include box-shadow;
  color: $text-light;
  padding: 12px;
  display: flex;
  gap: 12px;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  @include custom-scrollbar;
  height: 100%;

  .tab-content {
    @include custom-scrollbar;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
  }
}
</style>
