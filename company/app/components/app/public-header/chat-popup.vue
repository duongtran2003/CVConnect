<template>
  <div v-on-click-outside="handleClickOutside" class="chat-popup">
    <div class="btn" @click="isPopupOpen = !isPopupOpen">
      <Icon name="mingcute:wechat-fill" />
      <div v-if="unreadBadge" class="badge">{{ unreadBadge }}</div>
    </div>
    <div v-if="isPopupOpen" class="popup">
      <div class="top">
        <div class="side">
          <div
            class="tab"
            :class="{ selected: currentTab == 0 }"
            @click="currentTab = 0"
          >
            {{ `Tất cả ${allCount}` }}
          </div>
          <div
            class="tab"
            :class="{ selected: currentTab == 1 }"
            @click="currentTab = 1"
          >
            {{ `Chưa đọc ${unseenCount}` }}
          </div>
        </div>
        <div class="side">
          <span class="view-all" @click="handleViewAll">Xem tất cả</span>
        </div>
      </div>
      <div class="content">
        <MessagesCard
          v-for="jobAd of filteredList"
          :key="jobAd.id"
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

const { getAppliedJobAdsUnpaged } = useCandidateApi();
const router = useRouter();

const list = ref<any>([]);
const isLoading = ref<boolean>(false);
const isEmpty = ref<boolean>(false);
const currentTab = ref<number>(0);

const isPopupOpen = ref<boolean>(false);

onBeforeMount(async () => {
  await fetchData();
});

const allCount = computed(() => {
  return list.value.length;
});

const unseenCount = computed(() => {
  return list.value.filter((m: any) => m.hasMessageUnread).length;
});

const unreadBadge = computed(() => {
  const len = list.value.filter((m: any) => m.hasMessageUnread).length
  if (len <= 99) {
    return len;
  } else {
    return `${len}+`;
  }
})

const filteredList = computed(() => {
  if (currentTab.value == 0) {
    return list.value;
  } else {
    return list.value.filter((m: any) => m.hasMessageUnread);
  }
});

async function fetchData() {
  isLoading.value = true;
  const res = await getAppliedJobAdsUnpaged({});
  if (!res) {
    isLoading.value = false;
    return;
  }
  list.value = [...list.value, ...res.data.data];

  if (res.data.data.length) {
    isEmpty.value = false;
  } else {
    isEmpty.value = true;
  }

  isLoading.value = false;
}

function handleClickOutside() {
  isPopupOpen.value = false;
}

function handleClickConversation(conversation: any) {
  isPopupOpen.value = false;
  router.push({ path: "/message", query: { id: conversation?.id } });
}

function handleViewAll() {
  isPopupOpen.value = false;
  router.push({ path: "/message" });
}
</script>
<style lang="scss" scoped>
.chat-popup {
  position: relative;
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
      top: -4px;
      right: -4px;
      font-size: 10px;
      background-color: $color-danger;
      height: 20px;
      width: 20px;
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
    display: flex;
    flex-direction: column;
    gap: 4px;
    border: 1px solid $color-gray-200;

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
