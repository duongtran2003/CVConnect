<template>
  <div class="left">
    <OrgCandidateInfoLeftJobAd :job-ad-infos="props.detail.jobAdCandidates" />
  </div>
</template>
<script setup lang="ts">
type TProps = {
  detail: Record<string, any>;
};

const props = defineProps<TProps>();
</script>
<style lang="scss" scoped>
.left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
