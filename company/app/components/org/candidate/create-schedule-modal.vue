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
          @form-input="($event) => (formInput = $event)"
        />
        <OrgCandidateCreateScheduleModalRight
          :job-ad-info="props.jobAdInfo"
          :duration="formInput.duration"
          :start-time="formInput.startTime"
          :candidate-info="props.candidateInfo"
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
          :is-disabled="false"
          :is-loading="isLoading"
          @click="() => {}"
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

const props = defineProps<TProps>();

console.log("in create modal", props.candidateInfo);

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

const formInput = ref<any>({});

function handleCancel() {
  emits("update:modelValue", false);
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      // clear everything
      formInput.value = {};
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
