<template>
  <div v-on-click-outside="handleClickOutside" class="chat-popup">
    <div class="btn" @click="isPopupOpen = !isPopupOpen">
      <Icon name="mingcute:wechat-fill" />
      <div v-if="hasUnread" class="badge"></div>
    </div>
    <div v-if="isPopupOpen" class="popup">
      <div class="top">
        <div class="side">
          <div
            class="tab"
            :class="{ selected: currentTab == 0 }"
            @click="currentTab = 0"
          >
            {{ props.isHr ? "Tất cả" : `Tất cả ${allCount}` }}
          </div>
          <div
            class="tab"
            :class="{ selected: currentTab == 1 }"
            @click="currentTab = 1"
          >
            {{ props.isHr ? "Chưa đọc" : `Chưa đọc ${unseenCount}` }}
          </div>
        </div>
        <div v-if="!props.isHr" class="side">
          <span class="view-all" @click="handleViewAll">Xem tất cả</span>
        </div>
      </div>
      <div class="content">
        <MessagesCard
          v-for="jobAd of filteredList"
          :key="jobAd.id"
          :is-hr="props.isHr"
          :data="jobAd"
          class="cursor-pointer"
          @click="handleClickConversation(jobAd)"
        />
        <div v-if="isLoading" class="spinner">
          <AppSpinnerHalfCircle />
        </div>
        <AppNoData v-if="filteredList.length == 0 && !isLoading" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";

type TProps = {
  isHr: boolean;
};

const props = defineProps<TProps>();

const { getAppliedJobAdsUnpaged, getConversationWithCandidates } =
  useCandidateApi();
const { checkExistUnreadMessage } = useConversationApi();
const router = useRouter();

const list = ref<any>([]);
const isLoading = ref<boolean>(false);
const isEmpty = ref<boolean>(false);
const currentTab = ref<number>(0);
const hasUnread = ref<boolean>(false);
const nextPage = ref<any>(null);

const isPopupOpen = ref<boolean>(false);

const pubSubStore = usePubSubStore();
const { subscribe } = storeToRefs(pubSubStore);

onBeforeMount(async () => {
  isLoading.value = true;
  await Promise.allSettled([fetchData(), checkUnread()]);
  isLoading.value = false;
});

const allCount = computed(() => {
  return list.value.length;
});

const unseenCount = computed(() => {
  return list.value.filter((m: any) => m.hasMessageUnread).length;
});

const filteredList = computed(() => {
  if (currentTab.value == 0) {
    return list.value;
  } else {
    return list.value.filter((m: any) => m.hasMessageUnread);
  }
});

async function fetchData() {
  let res: any = undefined;
  if (props.isHr) {
    const payload: any = { pageSize: 20 };
    if (nextPage.value) {
      payload.pageIndex = toUtcDateWithTime(nextPage.value);
    }
    if (currentTab.value == 1) {
      payload.hasMessageUnread = true;
    }
    res = await getConversationWithCandidates(payload);
  } else {
    res = await getAppliedJobAdsUnpaged({});
  }
  if (!res) {
    return;
  }
  list.value = [...list.value, ...res.data.data];
  nextPage.value =
    list.value[list.value.length - 1].conversation.lastMessageSentAt;
  console.log({ page: nextPage.value });

  if (res.data.data.length) {
    isEmpty.value = false;
  } else {
    isEmpty.value = true;
  }
}

async function checkUnread() {
  const res = await checkExistUnreadMessage(!props.isHr);
  if (!res.data) {
    hasUnread.value = false;
  } else {
    hasUnread.value = true;
  }
}

function handleClickOutside() {
  isPopupOpen.value = false;
}

function handleClickConversation(conversation: any) {
  isPopupOpen.value = false;
  if (props.isHr) {
    console.log({ conversation });
    router.push({
      path: `/org/candidate/detail/${conversation.candidateInfo.id}`,
      query: { tab: "discussion", jobAdId: conversation.jobAd.id },
    });
  } else {
    router.push({ path: "/message", query: { id: conversation?.id } });
  }
}

function handleViewAll() {
  isPopupOpen.value = false;
  router.push({ path: "/message" });
}

watch(
  () => subscribe.value("chat"),
  (newMessage) => {
    console.log({ newMessage });
  },
);

watch(currentTab, async (newVal) => {
  if (!props.isHr) {
    return;
  }
  isLoading.value = true;
  list.value = [];
  nextPage.value = null;
  await fetchData();
  isLoading.value = false;
});
</script>
<style lang="scss" scoped>
.chat-popup {
  position: relative;
  .spinner {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn {
    background-color: $color-gray-200;
    border-radius: 999px;
    height: 36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;

    .badge {
      top: -0px;
      right: -0px;
      font-size: 10px;
      background-color: $color-danger;
      height: 12px;
      width: 12px;
      border-radius: 999px;
      color: $text-dark;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
    }

    .iconify {
      display: block;
      font-size: 24px;
      height: 24px;
      width: 24px;
      cursor: pointer;
    }
  }

  .popup {
    position: absolute;
    margin-top: 2px;
    right: 0px;
    background-color: white;
    padding: 8px;
    border-radius: 8px;
    max-height: 320px;
    min-width: 360px;
    max-width: 440px;
    width: 440px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    border: 1px solid $color-gray-200;
    z-index: 2;

    .content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-top: 1px solid $color-gray-200;
      border-bottom: 1px solid $color-gray-200;
    }

    .top {
      display: flex;
      flex-direction: row;
      gap: 4px;
      justify-content: space-between;
      align-items: center;

      .side {
        display: flex;
        flex-direction: row;
        gap: 4px;
        .tab {
          padding: 2px 6px;
          font-size: 13px;
          border: 1px solid $color-gray-200;
          border-radius: 999px;
          cursor: pointer;

          &.selected {
            background-color: $color-primary-500;
            border: 1px solid $color-primary-500;
            color: $text-dark;
          }
        }
      }

      .view-all {
        font-size: 14px;
        color: $color-primary-500;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
