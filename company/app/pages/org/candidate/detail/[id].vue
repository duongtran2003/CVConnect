<template>
  <div class="wrapper">
    <div class="top">
      <div class="personal-information">
        <AppAvatar v-if="userInfo" :user-info="userInfo" />
        <span class="name">{{ userInfo?.fullName }}</span>
      </div>
    </div>
    <div v-if="detail" class="content">
      <OrgCandidateInfoLeft :detail="detail" />
      <div class="vert-divider"></div>
      <div class="right">b</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "org",
});

const route = useRoute();
const router = useRouter();

const { getJobAdCandidateDetail } = useCandidateApi();
const { setLoading } = useLoadingStore();

const detail = ref<Record<string, any> | null>(null);

onBeforeMount(async () => {
  setLoading(true);
  const candidateId = route.params.id;
  if (!candidateId || candidateId == undefined) {
    setLoading(false);
    router.push("/404");
    return;
  }
  const res = await getJobAdCandidateDetail(+candidateId);
  detail.value = res.data;
  console.log(res);
  setLoading(false);
});

const userInfo = computed(() => {
  if (!detail.value) {
    return null;
  }

  return {
    avatarUrl: detail.value.candidateInfo.avatarUrl,
    fullName: detail.value.candidateInfo.fullName,
    id: detail.value.candidateInfo.id,
  };
});
</script>
<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  min-height: 0;
  flex: 1;
  border-radius: 8px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @include box-shadow;
  padding: 12px;
  background-color: #ffffff;

  .vert-divider {
    height: 100%;
    width: 1px;
    display: block;
    background-color: $color-gray-200;
  }

  .top {
    :deep(.avatar) {
      width: 40px;
      height: 40px;
    }

    .personal-information {
      display: flex;
      flex-direction: row;
      gap: 12px;
      align-items: center;

      .name {
        font-weight: 500;
        font-size: 18px;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: row;
    gap: 12px;

    .left {
      width: 30%;
    }

    .right {
      width: 70%;
    }

    @media (max-width: 880px) {
      flex-direction: column;
      .vert-divider {
        height: 1px;
        width: 100%;
      }

      .left,
      .right {
        width: 100%;
      }
    }
  }
}
</style>
