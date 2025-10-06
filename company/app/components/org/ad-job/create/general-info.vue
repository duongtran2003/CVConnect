<template>
  <div class="general-info">
    <div class="title">Thông tin chung</div>
    <div v-if="isLoading" class="loading">
      <AppSpinnerHalfCircle />
    </div>
    <div v-else class="content">
      <AppInputText
        :label="'Tiêu đề tin đăng'"
        :required="true"
        :error="formError.title"
        :placeholder="'Mời nhập tiêu đề'"
        :value="formInput.title"
        class="title-input"
        @input="handleInput('title', $event)"
        @blur="validateKey('title')"
      />
      <div class="row">
        <AppInputSearchSelect
          :label="'Phòng ban'"
          :required="true"
          :options="departmentList"
          :value="formInput.department"
          :error="formError.department"
          :placeholder="'Mời chọn phòng ban'"
          :remote-filter="true"
          :multiple="true"
          :fetch-fn="fetchDepartments"
          @open-update="handleDepartmentOpenUpdate"
          @input="handleInput('department', $event)"
          @clear-value="handleClearDepartment"
          @search-filter="
            () => {
              departmentList = [];
            }
          "
        />
        <AppInputSearchSelect
          :label="'Vị trí'"
          :required="true"
          :options="positionOptions"
          :value="formInput.position"
          :error="formError.position"
          :placeholder="'Mời chọn vị trí'"
          :remote-filter="true"
          :multiple="false"
          :is-disabled="formInput.department.length == 0"
          :fetch-fn="fetchPosition"
          @open-update="handlePositionOpenUpdate"
          @input="handleInput('position', $event)"
          @clear-value="handleClearPosition"
          @search-filter="
            () => {
              positionList = [];
            }
          "
        />
        <AppInputSearchSelect
          :label="'Cấp bậc'"
          :required="true"
          :options="levelOptions"
          :value="formInput.level"
          :error="formError.level"
          :placeholder="'Mời chọn cấp bậc'"
          :remote-filter="false"
          :multiple="false"
          :is-disabled="!formInput.position"
          :fetch-fn="null"
          @open-update="handlePositionOpenUpdate"
          @input="handleInput('level', $event)"
          @clear-value="handleInput('level', null)"
          @search-filter="
            () => {
              positionList = [];
            }
          "
        />
        <AppInputSearchSelect
          :label="'Ngành nghề'"
          :required="true"
          :options="industryList"
          :value="formInput.industry"
          :error="formError.industry"
          :placeholder="'Mời chọn ngành nghề'"
          :remote-filter="true"
          :multiple="true"
          :fetch-fn="fetchIndustriesSub"
          @open-update="handleIndustryOpenUpdate"
          @input="handleInput('industry', $event)"
          @clear-value="handleInput('industry', [])"
          @search-filter="
            () => {
              industryList = [];
            }
          "
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { getDepartments } = useDepartmentApi();
const { getPositions } = usePositionApi();
const { getIndustriesSub } = useIndustryApi();

const isLoading = ref<boolean>(false);
const departmentList = ref<Record<string, any>[]>([]);
const positionList = ref<Record<string, any>[]>([]);
const industryList = ref<Record<string, any>[]>([]);

const formInput = ref<Record<string, any>>({
  title: "",
  department: [],
  position: null,
  level: null,
  industry: [],
});

const formError = ref<Record<string, any>>({
  title: "",
  department: "",
  position: "",
  level: "",
  industry: "",
});

const formRule: Record<string, any> = {
  title: [
    {
      error: "Mời nhập tiêu đề",
      validator: (input: string) => !!input.trim(),
    },
  ],
  department: [
    {
      error: "Mời chọn phòng ban",
      validator: (input: any[]) => !!input.length,
    },
  ],
  position: [
    {
      error: "Mời chọn vị trí",
      validator: (input: any | null) => !!input,
    },
  ],
  level: [
    {
      error: "Mời chọn cấp bậc",
      validator: (input: any | null) => !!input,
    },
  ],
  industry: [
    {
      error: "Mời chọn ngành nghề",
      validator: (input: any[]) => !!input.length,
    },
  ],
};

function handleClearDepartment() {
  handleInput("department", []);
  handleInput("position", null);
  handleInput("level", null);
}

function handleClearPosition() {
  handleInput("position", null);
  handleInput("level", null);
}

function handleDepartmentOpenUpdate(value: boolean) {
  if (!value) {
    validateKey("department");
  }
}

function handlePositionOpenUpdate(value: boolean) {
  if (!value) {
    validateKey("position");
  }
}

function handleIndustryOpenUpdate(value: boolean) {
  if (!value) {
    validateKey("industry");
  }
}

async function fetchPosition(params: any, controller?: AbortController) {
  const ids = formInput.value.department.map((val: any) => val.value);
  const newParams = {
    ...params,
    departmentIds: ids,
  };
  const res = await getPositions(newParams, controller);
  const nextPage = res.data.data.filter((pos: any) => pos.isActive);
  positionList.value = [...positionList.value, ...nextPage];
  return res;
}

async function fetchDepartments(params: any, controller?: AbortController) {
  const res = await getDepartments(params, controller);
  const nextPage = res.data.data
    .filter((dept: any) => dept.isActive)
    .map((dept: any) => ({
      label: dept.name,
      value: dept.id,
    }));
  departmentList.value = [...departmentList.value, ...nextPage];
  return res;
}

async function fetchIndustriesSub(params: any, controller?: AbortController) {
  const res = await getIndustriesSub(params, controller);
  const nextPage = res.data.data.map((industry: any) => ({
    label: industry.name,
    value: industry.id,
  }));
  industryList.value = [...industryList.value, ...nextPage];
  return res;
}

const positionOptions = computed(() => {
  return positionList.value.map((position) => ({
    label: position.name,
    value: position.id,
  }));
});

const levelOptions = computed(() => {
  const selectedPositionId = formInput.value.position?.value;
  if (!selectedPositionId) return [];
  const position = positionList.value.find(
    (pos) => pos.id === selectedPositionId,
  );
  if (!position) return [];
  return position.listLevel.map((lvl: any) => ({
    label: lvl.name,
    value: lvl.id,
  }));
});

function handleInput(key: string, value: any) {
  console.log(key, value);
  formError.value[key] = "";
  formInput.value[key] = value;
}

function validateKey(key: string) {
  const rules = formRule[key];
  for (const rule of rules) {
    const isValid = rule.validator(formInput.value[key]);
    if (!isValid) {
      formError.value[key] = rule.error;
      break;
    }
  }
}
</script>
<style lang="scss" scoped>
.general-info {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .row {
    display: flex;
    flex-direction: row;
    gap: 8px;
    @include respond-max($breakpoint-lg) {
      flex-wrap: wrap;

      :deep(.search-select-input) {
        max-width: calc((100% - 8px) * 0.5);
        min-width: calc((100% - 8px) * 0.5);
      }
    }
  }

  .title {
    color: $color-primary-400;
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
  }

  .loading {
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;

    .iconify {
      display: block;
    }
  }

  :deep(.text-input.title-input) {
    max-width: calc(50% - 4px);
    .input {
      padding: 6px 8px;
      input {
        font-size: 14px;
      }
    }

    @include respond-max($breakpoint-lg) {
      max-width: 100%;
    }
  }

  :deep(.search-select-input) {
    max-width: calc((100% - 24px) * 0.25);
  }

  .select-input {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;

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

    .error-message {
      min-height: 16px;
      display: inline-block;
      color: $color-danger;
      font-size: 12px;
      line-height: 16px;
    }

    :deep(button.selector) {
      margin: 2px 0px;
      cursor: pointer;
      border: 2px solid rgba($color-primary-800, 0.1);

      &:disabled {
        border: 2px solid rgba($color-gray-300, 1);
        cursor: default;
        opacity: 100%;
      }

      &.error {
        border: 2px solid $color-danger;
      }

      border-radius: 10px !important;
      padding: 6px 48px 6px 8px !important;
      font-weight: 500 !important;
      color: $text-light !important;
      height: 36px;
      background-color: white !important;
      width: 100%;
      max-width: 100%;

      &:hover:not(:disabled) {
        border: 2px solid rgba($color-primary-400, 1);
      }

      span {
        font-size: 14px;
        line-height: 21px;
        color: $text-light;
        font-weight: 400 !important;
      }
      .text-dimmed {
        font-size: 14px;
        line-height: 21px;
        color: $color-gray-300;
        font-weight: 400 !important;
      }
    }
  }
}
</style>
