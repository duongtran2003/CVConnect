<template>
  <div class="right">
    <AppTabber
      :tabs="tabs"
      :current-tab-index="currentTabIndex"
      @tab-switch="handleTabSwitch($event)"
    />
    <div class="content">
      <OrgCandidateInfoRightCv
        v-show="currentTabIndex == 1"
        :cv-link="props.detail.candidateInfo.attachFile.secureUrl"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { CANDIDATE_DETAIL_RIGHT_TABS } from "~/const/views/org/candidates";

type TProps = {
  detail: Record<string, any>;
};

const props = defineProps<TProps>();

const currentTabIndex = ref<number>(1);

const tabs = computed(() => {
  return CANDIDATE_DETAIL_RIGHT_TABS;
});

async function handleTabSwitch(index: number) {
  currentTabIndex.value = index;
}
</script>
<style lang="scss" scoped>
.right {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 100%;
  overflow-y: auto;
  padding-top: 12px;

  :deep(.tab) {
    padding: 4px 16px;
  }

  .content {
    flex: 1;
  }
}
</style>
