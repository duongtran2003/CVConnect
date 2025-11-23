<template>
  <div class="chat-log">
    <div class="top">
      <AppInputSearchSelect
        :label="''"
        :required="false"
        :options="jobAdOpts"
        :value="selectedJobAd"
        :error="''"
        :placeholder="'Mời chọn tin tuyển dụng'"
        :allow-clear="false"
        :remote-filter="false"
        :multiple="false"
        :is-disabled="false"
        :slim-error="true"
        :fetch-fn="null"
        class="job-ad-select"
        @input="($event) => (selectedJobAd = $event)"
        @clear-value="() => (selectedJobAd = null)"
      />
    </div>
    <div class="chatbox">
      <!-- <div class="top"> -->
      <!--   <div class="org-info"> -->
      <!--     <div class="names"> -->
      <!--       <div class="org-name">{{ props.candidateInfo.fullName }}</div> -->
      <!--     </div> -->
      <!--   </div> -->
      <!-- </div> -->
      <div class="chat-container">
        <div v-if="isLoading" class="spinner">
          <AppSpinnerHalfCircle />
        </div>
        <MessagesBubble
          v-for="(message, index) of messagesList"
          :key="index"
          :sender-info="message.senderInfo"
          :member-ids="conversationMembers"
          :messages="message.messages"
          :show-avatar="false"
        />
        <div v-if="isNoConversation" class="no-conversation">
          <AppButton
            :text="'Tạo đoạn hội thoại'"
            class="add-conversation"
            @click="handleAddConversation"
          >
            <template #icon>
              <Icon name="mdi:chat-plus" />
            </template>
          </AppButton>
        </div>
      </div>
      <div v-if="!isNoConversation" class="input-container">
        <AppInputText
          :label="''"
          :required="false"
          :error="''"
          :placeholder="'Gửi tin nhắn'"
          :value="chatInput"
          :is-disabled="false"
          :slim-error="true"
          class="text-input"
          @input="($event) => (chatInput = $event)"
        />
        <div class="send-button" :class="{ disabled: !chatInput.trim() }">
          <Icon name="material-symbols:send-rounded" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
type TProps = {
  jobAds: any[];
  candidateInfo: any;
};

const { checkExistConversation, createConversation, getConversationMessages } =
  useConversationApi();

const { setLoading } = useLoadingStore();
const route = useRoute();

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const isNoConversation = ref<boolean>(false);
const checkExistController = ref<any>(null);
const getMessagesController = ref<any>(null);

const chatInput = ref<string>("");
const messages = ref<any>([]);
const currentPage = ref<any>(null);
const hasMoreMessage = ref<any>(true);
const conversationMembers = ref<any>([]);

const selectedJobAd = ref<any>(null);
const isLoading = ref<boolean>(false);

const props = defineProps<TProps>();

onBeforeMount(() => {
  console.log({ props });
  if (props.jobAds.length) {
    const jobAdId = route.query.jobAdId;
    let ad: any = undefined;
    if (jobAdId) {
      const foundJobAd = props.jobAds.find((jobAd) => jobAd.id == jobAdId);
      if (foundJobAd) {
        ad = foundJobAd;
      } else {
        ad = props.jobAds[0];
      }
    } else {
      ad = props.jobAds[0];
    }

    selectedJobAd.value = {
      label: ad.jobAd.title,
      value: ad.jobAd.id,
    };
  }
});

const getInfo = computed(() => {
  return (id: any) => {
    if (id == userInfo.value?.id) {
      return {
        id: userInfo.value?.id,
      };
    } else {
      const info = {
        // id: props.candidateInfo.candidateId,
        id: 3,
      };
      return info;
    }
  };
});

const messagesList = computed(() => {
  const list = messages.value;

  const result: any[] = [];
  let currentGroup: any = null;

  list.forEach((msg: any) => {
    if (
      !currentGroup ||
      currentGroup.senderInfo.id !== getInfo.value(msg.senderId).id
    ) {
      currentGroup = {
        senderInfo: getInfo.value(msg.senderId),
        messages: [],
      };
      result.push(currentGroup);
    }

    const { senderId, ...rest } = msg;
    currentGroup.messages.push(rest);
  });

  console.log({ result });
  return result.reverse();
  // return result;
});

const jobAdOpts = computed(() => {
  return props.jobAds.map((ad) => ({
    label: ad.jobAd.title,
    value: ad.jobAd.id,
  }));
});

const selectedJobAdInfo = computed(() => {
  console.log(props.jobAds, selectedJobAd.value);
  return props.jobAds.find((ad) => ad.jobAd.id === selectedJobAd.value?.value);
});

async function checkExist() {
  if (checkExistController.value) {
    checkExistController.value.abort();
  }

  checkExistController.value = new AbortController();

  const res = await checkExistConversation(
    selectedJobAd.value.value,
    // props.candidateInfo.candidateId,
    3,
    checkExistController.value,
  );
  if (!res) {
    isNoConversation.value = true;
  } else {
    isNoConversation.value = false;
  }
}

async function fetchData() {
  isLoading.value = true;

  messages.value = [];
  currentPage.value = null;
  chatInput.value = "";
  hasMoreMessage.value = true;
  conversationMembers.value = [];
  isNoConversation.value = false;

  await Promise.allSettled([checkExist()]);
  isLoading.value = false;
  if (!isNoConversation.value) {
    await getMessages();
  }
}

async function getMessages() {
  isLoading.value = true;
  if (getMessagesController.value) {
    getMessagesController.value.abort();
  }

  getMessagesController.value = new AbortController();

  const res = await getConversationMessages(
    selectedJobAd.value.value,
    // props.candidateInfo.candidateId,
    3,
    currentPage.value,
    getMessagesController.value,
  );

  messages.value = [...res.data.messagesWithFilter.data, ...messages.value];
  conversationMembers.value = res.data.participantIds;

  if (res.data.messagesWithFilter.data.length <= 20) {
    hasMoreMessage.value = false;
  } else {
    hasMoreMessage.value = true;
  }
  isLoading.value = false;
}

async function handleAddConversation() {
  isLoading.value = true;
  const res = await createConversation(
    selectedJobAd.value.value,
    // props.candidateInfo.candidateId,
    3,
  );
  if (res) {
    isNoConversation.value = false;
  }
  isLoading.value = false;
}

watch(selectedJobAd, async (newVal) => {
  if (!newVal || newVal.value == -1) {
    return;
  }

  fetchData();
  setLoading(false);
});
</script>
<style lang="scss" scoped>
.chat-log {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 100%;
  height: 100%;
  padding-bottom: 8px;

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
    row-gap: 8px;

    .right {
      display: flex;
      flex-direction: row;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
      row-gap: 8px;
    }

    .job-ad-select {
      max-width: 420px;
    }
  }

  .divider {
    width: 100%;
    height: 1px;
    display: block;
    background-color: $color-gray-200;
  }

  .chatbox {
    flex: 1;
    min-height: 0;
    margin-top: 12px;

    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 100%;
    padding: 6px;
    border-radius: 12px;
    border: 1px solid $color-gray-300;

    .top {
      display: flex;
      flex-direction: row;
      gap: 8px;
      align-items: center;

      .org-info {
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: flex-start;

        .names {
          display: flex;
          flex-direction: column;
          gap: 4px;

          .org-name {
            color: $text-light;
          }
          .hr-name {
            color: $color-gray-600;
            font-size: 13px;
          }
        }

        .logo {
          display: block;
          height: 48px;
          width: 48px;
          min-width: 48px;
          border-radius: 12px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: inherit;
          }
        }
      }
    }

    .chat-container {
      flex: 1;
      min-height: 0;
      overflow: auto;
      overscroll-behavior: contain;
      display: flex;
      flex-direction: column-reverse;
      gap: 8px;
      padding: 8px 0px;

      .spinner,
      .no-conversation {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .add-conversation {
          padding: 4px 8px;
          border: 1px solid $color-primary-500;
          color: $color-primary-500;
        }
      }
    }

    .input-container {
      display: flex;
      flex-direction: row;
      gap: 2px;
      align-items: center;
      :deep(.text-input) {
        flex: 1;
        .input-wrapper {
          .input {
            padding: 6px 8px;
            input {
              font-size: 14px;
            }
          }
        }
      }

      .send-button {
        background-color: $color-primary-500;
        cursor: pointer;
        height: calc(100% - 4px);
        aspect-ratio: 1/1;
        display: flex;
        align-items: center;
        min-width: 32px;
        justify-content: center;
        border-radius: 999px;
        .iconify {
          display: block;
          font-size: 20px;
          height: 20px;
          min-width: 20px;
          color: $text-dark;
          margin-right: -4px;
        }

        &.disabled {
          background-color: $color-gray-400;
          cursor: default;
        }
      }
    }
  }
}
</style>
