<template>
  <div class="job-ad-detail">
    <div class="content">
      <JobsJobDetail v-if="info != null" class="main-col" :data="info" />
      <div class="sub-col">
        <div class="card">card 1</div>
        <div class="card card-sticky">card 2</div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "public",
});

const router = useRouter();
const route = useRoute();

const { setLoading } = useLoadingStore();
const { getJobAdPreview } = useJobsSearchApi();

const info = ref<any>(null);

onBeforeMount(async () => {
  setLoading(true);
  const id = route.params.id;
  if (!id) {
    router.push({ path: "/404" });
    setLoading(false);
    return;
  }
  const res = await getJobAdPreview(id);
  info.value = res.data;
  setLoading(false);
});
</script>
<style lang="scss" scoped>
.job-ad-detail {
  overflow: auto;
  min-height: calc(100vh - 54px);
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    width: 100%;

    padding-top: 12px;
    padding-bottom: 128px;
    min-height: calc(100vh - 54px);

    padding-left: 12.5%;
    padding-right: 12.5%;

    @media (max-width: 768px) {
      padding-left: 12px;
      padding-right: 12px;
    }
    display: flex;
    flex-direction: row;
    gap: 8px;

    .main-col {
      width: 60%;
      height: fit-content;
    }

    .sub-col {
      width: 40%;
      position: sticky;
      top: 12px;
      height: fit-content;
    }
  }
}
</style>
