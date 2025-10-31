<template>
  <div class="right">
    <div class="content">
      <div class="row">
        <AppInputSearchSelect
          :label="'Hội đồng tuyển dụng'"
          :required="true"
          :options="orgMemberOpts"
          :value="formInput.orgMembers"
          :error="''"
          :is-disabled="false"
          :placeholder="''"
          :remote-filter="true"
          :multiple="true"
          :slim-error="true"
          :is-paginated="true"
          :fetch-fn="fetchOrgMembers"
          @input="handleInput('orgMembers', $event)"
          @clear-value="handleInput('orgMembers', null)"
          @search-filter="
            () => {
              orgMembersList = [];
            }
          "
        />
      </div>
      <div class="row">
        <AppInputSearchSelect
          :label="'Ứng viên'"
          :required="true"
          :options="candidateOpts"
          :value="formInput.candidates"
          :error="''"
          :is-disabled="false"
          :placeholder="''"
          :remote-filter="true"
          :multiple="true"
          :slim-error="true"
          :is-paginated="true"
          :fetch-fn="fetchCandidates"
          @input="handleInput('candidates', $event)"
          @clear-value="handleInput('candidates', null)"
          @search-filter="
            () => {
              candidatesList = [];
            }
          "
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
type TProps = {
  isBatchPartake: boolean;
  startTime: string;
  duration: number;
  jobAdInfo: any;
};

const { getOrgMembers } = useOrgMemberApi();
const { getJobAdCandidatesByProcess } = useCandidateApi();

const props = defineProps<TProps>();

const defaultFormInput = {
  orgMembers: [] as any[],
  candidates: [] as any[],
};

const formInput = ref<any>(defaultFormInput);
const orgMembersList = ref<any>([]);
const candidatesList = ref<any>([]);

const orgMemberOpts = computed(() => {
  return orgMembersList.value.map((orgMember: any) => ({
    label: `${orgMember.fullName} - ${orgMember.email}`,
    value: orgMember.id,
  }));
});

const candidateOpts = computed(() => {
  return candidatesList.value.map((candidate: any) => ({
    label: `${candidate.fullName} - ${candidate.email}${candidate.hasSchedule ? " - Đã đặt lịch" : ""}`,
    value: candidate.id,
  }));
});

const currentProcess = computed(() => {
  return props.jobAdInfo.jobAdProcessCandidates.find(
    (process: any) => process.isCurrentProcess,
  );
});

function handleInput(key: string, value: any) {
  formInput.value[key] = value;
}

async function fetchOrgMembers(params: any, controller?: AbortController) {
  const res = await getOrgMembers(params, controller);
  if (!res) {
    return null;
  }

  const nextPage = res.data.data;
  orgMembersList.value = [...orgMembersList.value, ...nextPage];

  return res.data.data;
}

async function fetchCandidates(params: any, controller?: AbortController) {
  const res = await getJobAdCandidatesByProcess(
    currentProcess.value.id,
    controller,
  );
  if (!res) {
    return null;
  }

  const nextPage = res.data;
  candidatesList.value = [...candidatesList.value, ...nextPage];

  return res.data;
}
</script>
<style lang="scss" scoped>
.right {
  max-height: 100%;
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 8px;

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .header {
    font-size: 16px;
    font-weight: 500;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
    min-height: 0;
  }

  :deep(.search-select-input) {
    max-width: 100%;
  }
}
</style>
