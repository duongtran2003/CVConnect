<template>
  <div class="candidate-filter">
    <div class="content">
      <AppInputSearchSelect
        :label="'Loại tin tuyển dụng'"
        :required="false"
        :options="isPublicOpts"
        :value="filter.isPublic"
        :error="''"
        :placeholder="''"
        :allow-clear="true"
        :remote-filter="false"
        :multiple="false"
        :is-disabled="false"
        :slim-error="true"
        :fetch-fn="null"
        @input="handleInput('isPublic', $event)"
        @clear-value="handleInput('isPublic', null)"
      />
      <AppInputSearchSelect
        :label="'Phòng ban'"
        :required="false"
        :options="departmentsOpts"
        :value="filter.departmentIds"
        :error="''"
        :placeholder="''"
        :allow-clear="true"
        :remote-filter="false"
        :multiple="true"
        :is-disabled="false"
        :slim-error="true"
        :fetch-fn="null"
        @input="handleInput('departmentIds', $event)"
        @clear-value="handleInput('departmentIds', null)"
      />
      <AppInputSearchSelect
        :label="'HR phụ trách'"
        :required="false"
        :options="hrOptions"
        :value="filter.hrContactId"
        :error="''"
        :placeholder="'Mời chọn'"
        :remote-filter="false"
        :multiple="false"
        :is-disabled="false"
        :slim-error="true"
        :fetch-fn="null"
        @input="handleInput('hrContactId', $event)"
        @clear-value="handleInput('hrContactId', null)"
        @search-filter="
          () => {
            hrList = [];
          }
        "
      />
      <AppInputText
        :label="'Người tạo'"
        :required="false"
        :error="''"
        :placeholder="'Mời nhập người tạo'"
        :value="filter.createdBy || ''"
        :is-disabled="false"
        :slim-error="true"
        class="text-input"
        @input="handleInput('createdBy', $event)"
      />
      <AppInputDatepicker
        :label="'Ngày tạo'"
        :required="false"
        :value="dateRangeValue('createdAt')"
        :error="''"
        :slim-error="true"
        :placeholder="''"
        :is-range="true"
        @input="handleDateRangeInput('createdAt', $event)"
      >
      </AppInputDatepicker>
      <AppInputDatepicker
        :label="'Hạn nộp hồ sơ'"
        :required="false"
        :value="dateRangeValue('dueDate')"
        :error="''"
        :slim-error="true"
        :placeholder="''"
        :is-range="true"
        @input="handleDateRangeInput('dueDate', $event)"
      >
      </AppInputDatepicker>
    </div>
    <div class="footer">
      <AppButton
        class="reset-button"
        :text="'Đặt lại'"
        @click="handleResetFilter"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { cloneDeep } from "lodash";

type TProps = {
  filterData?: any;
};

const props = withDefaults(defineProps<TProps>(), {
  filterData: () => ({}),
});
const emits = defineEmits<{
  (e: "filterChange" | "sortChange", payload: any): void;
}>();

const { getByRoleCode } = useUserApi();
const { getDepartments } = useDepartmentApi();

const filter = ref<any>({});
const hrList = ref<Record<string, any>[]>([]);
const departmentList = ref<any[]>([]);

onBeforeMount(async () => {
  await Promise.all([fetchHr({}), fetchDepartments({})]);
  syncFilterOptions();
});

const dateRangeValue = computed(() => {
  return (key: string) => {
    const ranges = [];
    const from = filter.value[`${key}Start`];
    const to = filter.value[`${key}End`];
    if (from) {
      ranges.push(from);
    } else {
      ranges.push(null);
    }

    if (to) {
      ranges.push(to);
    } else {
      ranges.push(null);
    }

    if (!ranges[0] && !ranges[1]) {
      return null;
    }

    return ranges;
  };
});

const sortIcon = computed(() => {
  return (key: string) => {
    if (filter.value.sortBy !== key) {
      return "mdi:sort";
    }
    if (filter.value.sortDirection === "ASC") {
      return "mdi:sort-ascending";
    } else if (filter.value.sortDirection === "DESC") {
      return "mdi:sort-descending";
    } else {
      return "mdi:sort";
    }
  };
});

const isPublicOpts = computed(() => {
  return [
    {
      label: "Công khai",
      value: true,
    },
    {
      label: "Nội bộ",
      value: false,
    },
  ];
});

const hrOptions = computed(() => {
  return hrList.value.map((hr) => ({
    label: hr.fullName,
    value: hr.id,
  }));
});

const departmentsOpts = computed(() => {
  return departmentList.value.map((dept) => ({
    label: dept.name,
    value: dept.id,
  }));
});

function handleSortClick(key: string) {
  if (filter.value.sortBy === key) {
    const currType = filter.value.sortDirection;
    if (currType === "ASC") {
      emits("sortChange", { key, type: "DESC" });
    } else if (currType === "DESC") {
      emits("sortChange", { key: undefined, type: undefined });
    } else {
      emits("sortChange", { key, type: "ASC" });
    }
  } else {
    emits("sortChange", { key, type: "ASC" });
  }
}

function handleDateRangeInput(key: string, range: any) {
  if (!range?.length) {
    filter.value[`${key}Start`] = undefined;
    filter.value[`${key}End`] = undefined;
    return;
  }
  const from = range[0];
  const to = range[1];
  if (from) {
    filter.value[`${key}Start`] = from;
  }
  if (to) {
    filter.value[`${key}End`] = to;
  }
  emits("filterChange", filter.value);
}

function handleInput(key: string, value: any) {
  filter.value[key] = value;
  emits("filterChange", filter.value);
}

function handleSetFilter() {
  console.log("clicked", filter.value);
  emits("filterChange", filter.value);
}

function handleResetFilter() {
  filter.value = {
    ...filter.value,
    isPublic: undefined,
    departmentIds: [],
    hrContactId: undefined,
    createdBy: "",
    createdAtStart: undefined,
    createdAtEnd: undefined,
    dueDateStart: undefined,
    dueDateEnd: undefined,
  };
  emits("filterChange", filter.value);
}

async function fetchHr(params: any, controller?: AbortController) {
  const res = await getByRoleCode("HR");
  if (!res) {
    return null;
  }

  hrList.value = res.data;

  return res.data;
}

async function fetchDepartments(params: any, controller?: AbortController) {
  const res = await getDepartments(params, controller);
  if (!res) {
    return null;
  }
  const nextPage = res.data.data;
  departmentList.value = [...departmentList.value, ...nextPage];
  console.log("fetch dept done", departmentsOpts.value);
  return res.data.data;
}

function syncFilterOptions() {
  const f = filter.value;
  console.log({ f });

  // isPublic
  if (f.isPublic?.value !== undefined) {
    const m = isPublicOpts.value.find((opt) => opt.value === f.isPublic.value);
    f.isPublic = m;
  }

  // departmentIds (array of {label:"", value:id})
  if (Array.isArray(f.departmentIds) && f.departmentIds.length) {
    const mapped = f.departmentIds
      .map((item: any) =>
        departmentsOpts.value.find((opt) => opt.value === item.value),
      )
      .filter(Boolean);

    f.departmentIds = mapped;
  }

  // HR Contact
  if (f.hrContactId?.value !== undefined) {
    const m = hrOptions.value.find((opt) => opt.value === f.hrContactId.value);
    f.hrContactId = m;
  }

  emits("filterChange", filter.value);
}

watch(
  () => props.filterData,
  (newVal) => {
    console.log({ newVal });
    filter.value = cloneDeep(newVal);
    console.log("after clone", filter.value);
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>
<style lang="scss" scoped>
.candidate-filter {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-x: hidden;

  .content {
    display: flex;
    flex: 1;
    min-height: 0;
    max-height: 100%;
    @include custom-scrollbar;
    overflow-y: auto;
    overflow-x: hidden;
    flex-direction: column;
    gap: 4px;

    .num-input {
      :deep(input) {
        border: 1px solid rgba($color-primary-800, 0.1);
        border-radius: 12px;

        &:hover,
        &:focus {
          border: 1px solid rgba($color-primary-400, 1);
        }
      }
    }

    :deep(.text-input),
    :deep(.number-input) {
      .input-wrapper {
        .input {
          padding: 6px 8px;
          max-width: 100%;
          min-width: 0;
          input {
            font-size: 14px;
            max-width: 100%;
            min-width: 0;
          }
        }
      }
    }

    .row {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }

  .divider {
    display: block;
    height: 1px;
    min-height: 1px;
    width: 100%;
    background-color: $color-gray-200;
  }

  .label {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .iconify {
    display: block;
    font-size: 20px;
    color: $color-primary-500;
    cursor: pointer;
    margin-left: 8px;
  }

  .footer {
    padding: 4px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 12px;
    .submit-button {
      padding: 4px 8px;
      background-color: $color-primary-500;
      border: 1px solid $color-primary-500;
      color: $text-dark;
      font-size: 14px;
      min-width: 84px;
    }

    .reset-button {
      padding: 4px 8px;
      color: $color-primary-500;
      border: 1px solid $color-primary-500;
      font-size: 14px;
      min-width: 84px;
    }
  }
}
</style>
