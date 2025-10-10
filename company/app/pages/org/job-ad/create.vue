<template>
  <div class="wrapper">
    <div class="create-content">
      <AppBackNavigator
        :title="'Tạo mới tin tuyển dụng'"
        :fallback-route="'/org/job-ad'"
      />
      <AppTabber
        :tabs="tabs"
        :current-tab-index="currentTabIndex"
        @tab-switch="handleTabSwitch($event)"
      />
      <div class="tab-content">
        <OrgAdJobCreateGeneralInfo
          v-show="currentTabIndex == 1"
          @data-change="handleFormDataChange('generalInfo', $event)"
        />
        <OrgAdJobCreateSalaryInfo
          v-show="currentTabIndex == 1"
          @data-change="handleFormDataChange('salaryInfo', $event)"
        />
        <OrgAdJobCreateDescriptionInfo
          v-show="currentTabIndex == 1"
          @data-change="handleFormDataChange('descriptionInfo', $event)"
        />
        <OrgAdJobCreateHrInfo
          v-show="currentTabIndex == 1"
          @data-change="handleFormDataChange('hrInfo', $event)"
        />
        <OrgAdJobCreateProcessConfig
          v-show="currentTabIndex == 2"
          :position-id="formData.generalInfo?.position?.value ?? null"
          :data="formData.processConfig"
          @data-change="handleFormDataChange('processConfig', $event)"
          @padded-processes="setPaddedProcess($event)"
        />
        <div v-show="currentTabIndex == 2" class="send-mail-check">
          <UCheckbox
            :disabled="mailConfig == null"
            :model-value="formData.sendMail"
            :label="'Tự động gửi mail khi có ứng viên ứng tuyển'"
            class="checkbox"
            @update:model-value="formData.sendMail = $event as boolean"
          />
          <div v-if="mailConfig == null" class="mail-service-notice">
            Doanh nghiệp của bạn chưa thiết lập cấu hình email.
            <span class="link">Thiết lập ngay</span>
          </div>
        </div>
        <OrgAdJobCreateMailInfo
          v-show="currentTabIndex == 2 && formData.sendMail"
          :data="formData.mailTemplate"
          :form-data="formData"
          @data-change="handleFormDataChange('mailTemplate', $event)"
        />
      </div>
      <div class="footer">
        <UDropdownMenu
          :items="actions"
          :ui="{
            item: 'cursor-pointer hover:bg-gray-100',
            content: 'w-[130px]',
          }"
        >
          <AppButton
            :text="'Lưu và đăng tin'"
            class="submit-button"
            :is-disabled="!isFormValid"
          />
        </UDropdownMenu>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TDescriptionInfoForm } from "~/components/org/ad-job/create/description-info.vue";
import type { TGeneralInfoForm } from "~/components/org/ad-job/create/general-info.vue";
import type { THrInfoForm } from "~/components/org/ad-job/create/hr-info.vue";
import type { TMailInfoForm } from "~/components/org/ad-job/create/mail-info.vue";
import type { TProcessConfigForm } from "~/components/org/ad-job/create/process-config.vue";
import type { TSalaryInfoForm } from "~/components/org/ad-job/create/salary-info.vue";
import { SALARY_TYPE } from "~/const/common";
import { CREATE_BREADCRUMBS, CREATE_TABS } from "~/const/views/org/job-ad";

definePageMeta({
  layout: "org-admin",
});
useHead({
  title: "Tạo mới tin tuyển dụng",
});

const breadcrumbStore = useBreadcrumbStore();
const { overrideItems, clearOverrideItems } = breadcrumbStore;
const { getMailTemplateConfig } = useMailTemplateApi();
const { setLoading } = useLoadingStore();
const { createJobAd } = useJobAdApi();

const mailConfig = ref<Record<string, any> | null>(null);
const paddedProcesses = ref<any[]>([]);
const currentTabIndex = ref<number>(1);
type TFormData = {
  generalInfo: TGeneralInfoForm | undefined;
  salaryInfo: TSalaryInfoForm | undefined;
  descriptionInfo: TDescriptionInfoForm | undefined;
  hrInfo: THrInfoForm | undefined;
  processConfig: TProcessConfigForm | undefined;
  sendMail: boolean;
  mailTemplate: TMailInfoForm | undefined;
};

const formData = ref<TFormData>({
  generalInfo: undefined,
  salaryInfo: undefined,
  descriptionInfo: undefined,
  hrInfo: undefined,
  processConfig: undefined,
  sendMail: false,
  mailTemplate: undefined,
});

onBeforeMount(async () => {
  overrideItems(CREATE_BREADCRUMBS);
  const res = await getMailTemplateConfig();
  if (res.data) {
    mailConfig.value = res.data;
  }
});

const tabs = computed(() => {
  return CREATE_TABS;
});

const isFormValid = computed(() => {
  const form = transformedForm.value;

  if (
    !form.title ||
    form.positionId == null ||
    form.positionLevelId == null ||
    !form.workLocationIds.length ||
    !form.jobType ||
    !form.dueDate ||
    form.quantity == null ||
    !form.salaryType ||
    !form.currencyType ||
    !form.description ||
    form.hrContactId == null ||
    !form.positionProcess.length
  ) {
    return false;
  }

  if (
    form.salaryType == SALARY_TYPE.RANGE &&
    (form.salaryFrom != null || form.salaryTo != null)
  ) {
    return false;
  }
  if (
    form.autoSendMail &&
    (form.emailTemplateId == null || form.emailTemplateId == undefined)
  ) {
    return false;
  }
  return true;
});

const transformedForm = computed(() => {
  const data = formData.value;
  const transformed: Record<string, any> = {
    title: data.generalInfo?.title.trim(),
    positionId: data.generalInfo?.position?.value,
    positionLevelId: data.generalInfo?.level?.value,
    industrySubIds: data.generalInfo?.industry
      ? data.generalInfo.industry.map((indus) => indus.value)
      : [],
    workLocationIds: data.generalInfo?.location
      ? data.generalInfo.location.map((loc) => loc.value)
      : [],
    jobType: data.generalInfo?.jobType?.value,
    dueDate: data.generalInfo?.dueDate
      ? toUtcDate(data.generalInfo.dueDate)
      : "",
    quantity: data.generalInfo?.quant,
    salaryType: data.salaryInfo?.salaryType?.value,
    salaryFrom: data.salaryInfo?.salaryFrom,
    salaryTo: data.salaryInfo?.salaryTo,
    currencyType: data.salaryInfo?.currency?.value,
    keyword: data.descriptionInfo?.keyword.trim(),
    description: data.descriptionInfo?.description.trim(),
    requirement: data.descriptionInfo?.requirement.trim(),
    benefit: data.descriptionInfo?.benefit.trim(),
    hrContactId: data.hrInfo?.hrInfo?.value,
    jobAdStatus: "OPEN",
    emailTemplateId: data.mailTemplate?.mailTemplate?.value,
    positionProcess: data.processConfig?.processes
      ? [
          paddedProcesses.value[0],
          ...data.processConfig.processes,
          paddedProcesses.value[1],
        ].map((process, index) => {
          const mapped: Record<string, any> = {
            name: process.name,
            processTypeId: process.processId || process.processTypeId,
            sortOrder: index + 1,
          };
          if (process.id) {
            mapped.id = process.id;
          }
          return mapped;
        })
      : [],
    autoSendMail: data.sendMail,
  };

  return transformed;
});

const actions = computed(() => {
  return [
    { label: "Nội bộ", onSelect: () => handleSubmit("public") },
    { label: "Công khai", onSelect: () => handleSubmit() },
  ];
});

const handleSubmit = async (type: string = "") => {
  const payload = transformedForm.value;
  if (type === "public") {
    payload.isPublic = true;
  } else {
    payload.isPublic = false;
  }

  setLoading(true);
  const res = await createJobAd(payload);
  setLoading(false);
};

const handleTabSwitch = (index: number) => {
  currentTabIndex.value = index;
};

const setPaddedProcess = (processes: any[]) => {
  paddedProcesses.value = processes;
};

const handleFormDataChange = <K extends keyof TFormData>(
  key: K,
  payload: TFormData[K],
) => {
  formData.value[key] = payload;
};

onBeforeUnmount(() => {
  clearOverrideItems();
});
</script>
<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  min-height: 0;
  flex: 1;
  border-radius: 8px;
  margin-top: 8px;
  @include box-shadow;
}
.create-content {
  background-color: white;
  min-height: calc(100% - 48px - 8px);
  @include box-shadow;
  color: $text-light;
  padding: 12px;
  display: flex;
  gap: 12px;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  @include custom-scrollbar;
  height: 100%;

  .tab-content {
    @include custom-scrollbar;
    flex: 1;
    min-height: 0;
    overflow-y: auto;

    .send-mail-check {
      .checkbox {
        margin-top: 20px;
        :deep(button) {
          cursor: pointer;

          &:disabled {
            cursor: default;
          }
        }

        :deep(label) {
          font-size: 14px;
          line-height: 21px;
          font-weight: 400;
          color: $text-light;
          cursor: pointer;

          &.cursor-not-allowed {
            cursor: default;
          }
        }
      }
      .mail-service-notice {
        font-size: 13px;
        line-height: 20px;

        .link {
          text-decoration: underline;
          color: $color-primary-400;
          font-weight: 500;
          cursor: pointer;
        }
      }
    }

    .label {
      display: flex;
      flex-direction: row;
      gap: 8px;
      align-items: center;
      width: fit-content;

      .text {
        font-size: 14px;
        line-height: 21px;
      }

      .required {
        font-size: 12px;
        font-style: italic;
        color: $color-danger;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    .submit-button {
      padding: 6px 14px 6px 14px;
      background-color: $color-primary-400;
      color: $text-dark;

      :deep(.button-text) {
        font-size: 14px;
      }

      &.disabled {
        background-color: $color-gray-400;
      }
    }
  }
}
</style>
