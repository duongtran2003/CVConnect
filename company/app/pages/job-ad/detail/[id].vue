<template>
  <div class="job-ad-detail">
    <div class="wrapper">
      <JobsJobDetail v-if="info != null" class="detail-col" :data="info" />
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
  display: flex;
  flex-direction: column;
  overflow: auto;

  .wrapper {
    display: flex;
    flex-direction: row;
    gap: 12px;
    padding-bottom: 128px;
    padding-top: 24px;
    flex: 1;
    min-height: calc(100vh - 54px);
    overflow: auto;
    justify-content: center;

    .detail-col {
      width: 40%;
    }
    .sub-col {
      width: 25%;
      background-color: wheat;

      .card {
        background-color: red;
        height: 800px;
        &.card-sticky {
          position: sticky;
          top: 12px;
          background-color: blue;
          height: 800px;
        }
      }
    }

    @media (max-width: 972px) {
      .detail-col {
        width: 60%;
      }
      .sub-col {
        width: 30%;
      }
    }
  }
}
</style>
