<template>
  <UModal
    v-model:open="isOpen"
    title="Tạo lịch hẹn"
    :ui="{ content: 'w-[80vw] min-w-[80vw]' }"
  >
    <template #body>
      <div class="body">
        <OrgCandidateCreateScheduleModalLeft
          :job-ad-info="props.jobAdInfo"
          :candidate-info="props.candidateInfo"
        />
        <OrgCandidateCreateScheduleModalRight
          :job-ad-info="props.jobAdInfo"
        />
      </div>
    </template>
    <template #footer>
      <div class="modal-footer">
        <AppButton
          class="cancel-btn btn"
          :text="'Đóng'"
          @click="handleCancel"
        />
        <AppButton
          class="submit-btn btn"
          :text="'Tạo'"
          :is-disabled="isSubmitDisabled"
          :is-loading="isLoading"
          @click="handleSubmit"
        />
      </div>
    </template>
  </UModal>
</template>
<script setup lang="ts">
type TProps = {
  modelValue: boolean;
  jobAdInfo: any;
  jobAdCandidateId: any;
  candidateInfo: any;
};

const { createEvaluation } = useCandidateApi();

const props = defineProps<TProps>();

console.log('in create modal', props.candidateInfo)

const emits = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "submit"): void;
}>();

onBeforeMount(async () => {});

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emits("update:modelValue", value),
});

const isLoading = ref<boolean>(false);

const formInput = ref<Record<string, any>>({
  comments: "",
  score: undefined,
});

const statusTooltip = computed(() => {
  return (displayJobAd: any) => {
    if (displayJobAd.candidateStatus === "REJECTED") {
      return formatDateTime(displayJobAd.eliminateDate, "DD/MM/YYYY - HH:mm");
    }
    return "";
  };
});

function handleCancel() {
  emits("update:modelValue", false);
}

const isSubmitDisabled = computed(() => {
  if (!formInput.value.comments?.trim()) {
    return true;
  }
  return false;
});

async function handleSubmit() {
  isLoading.value = true;
  const payload: any = {
    comments: formInput.value.comments,
  };
  if (formInput.value.score != undefined) {
    payload.score = formInput.value.score;
  }

  const res = await createEvaluation(props.jobAdCandidateId, payload);
  isLoading.value = false;
  if (res) {
    emits("submit");
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      // clear everything
      formInput.value = {
        comments: "",
        score: undefined,
      };
    }
  },
);
</script>
<style lang="scss" scoped>
.body {
  display: flex;
  flex-direction: row;
  gap: 8px;
  height: 100%;
  max-height: 65vh;
}

.modal-footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-end;
}

.btn {
  font-size: 14px;
  padding: 6px 12px;
  min-width: 64px;

  &.cancel-btn {
    border: 1px solid $color-primary-500;
    color: $color-primary-500;
  }

  &.submit-btn {
    background-color: $color-primary-500;
    border: 1px solid $color-primary-500;
    color: $text-dark;

    &.disabled {
      background-color: $color-gray-400;
      border: 1px solid $color-gray-400;
    }
  }
}
</style>
