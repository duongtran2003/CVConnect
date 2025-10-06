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
        class="text-input"
        @input="handleInput('title', $event)"
        @blur="validateKey('title')"
      />
      <div class="row">
        <div class="select-input">
          <div class="label">
            <span class="text">Phòng ban</span>
            <span class="required">Bắt buộc</span>
          </div>
          <USelectMenu
            :model-value="formInput.department"
            :items="departmentList"
            class="selector"
            :class="{ error: formError.department }"
            :variant="'none'"
            autocomplete="autocomplete"
            placeholder="Mời chọn phòng ban"
            multiple
            :title="
              formInput.department?.map((dept: any) => dept.label).join(', ') ??
              ''
            "
            :search-input="{
              placeholder: 'Tìm kiếm',
            }"
            :ui="{
              trailingIcon:
                'group-data-[state=open]:rotate-180 transition-transform duration-200',
            }"
            @update:model-value="handleInput('department', $event)"
            @update:open="
              ($event) => (!$event ? validateKey('department') : () => {})
            "
          />
          <div class="error-message">{{ formError.department }}</div>
        </div>
        <div class="select-input">
          <div class="label">
            <span class="text">Vị trí</span>
            <span class="required">Bắt buộc</span>
          </div>
          <USelectMenu
            :model-value="formInput.position"
            :items="positionOptions"
            class="selector"
            :class="{ error: formError.position }"
            :variant="'none'"
            autocomplete="autocomplete"
            placeholder="Mời chọn vị trí"
            :title="formInput.position?.label ?? ''"
            :disabled="!formInput.department.length"
            :search-input="{
              placeholder: 'Tìm kiếm',
            }"
            :ui="{
              trailingIcon:
                'group-data-[state=open]:rotate-180 transition-transform duration-200',
            }"
            @update:model-value="handleInput('position', $event)"
            @update:open="
              ($event) => (!$event ? validateKey('position') : () => {})
            "
          />
          <div class="error-message">{{ formError.position }}</div>
        </div>
        <div class="select-input">
          <div class="label">
            <span class="text">Cấp bậc</span>
            <span class="required">Bắt buộc</span>
          </div>
          <USelectMenu
            :model-value="formInput.level"
            :items="levelOptions"
            class="selector"
            :class="{ error: formError.level }"
            :variant="'none'"
            autocomplete="autocomplete"
            placeholder="Mời chọn cấp bậc"
            :title="formInput.level?.label ?? ''"
            :disabled="!formInput.position"
            :search-input="{
              placeholder: 'Tìm kiếm',
            }"
            :ui="{
              trailingIcon:
                'group-data-[state=open]:rotate-180 transition-transform duration-200',
            }"
            @update:model-value="handleInput('level', $event)"
            @update:open="
              ($event) => (!$event ? validateKey('level') : () => {})
            "
          />
          <div class="error-message">{{ formError.level }}</div>
        </div>
        <div class="select-input">
          <div class="label">
            <span class="text">Ngành nghề</span>
            <span class="required">Bắt buộc</span>
          </div>
          <USelectMenu
            v-model:search-term="industrySearch"
            :model-value="formInput.industry"
            :items="industryList"
            class="selector"
            :class="{ error: formError.industry }"
            :variant="'none'"
            autocomplete="autocomplete"
            placeholder="Mời chọn ngành nghề"
            multiple
            :filter="false"
            searchable
            :title="
              formInput.industry?.map((i: any) => i.label).join(', ') ?? ''
            "
            :search-input="{ placeholder: 'Tìm kiếm' }"
            :ui="{
              trailingIcon:
                'group-data-[state=open]:rotate-180 transition-transform duration-200',
            }"
            @update:model-value="handleInput('industry', $event)"
            @update:open="($event) => handleIndustryOpenUpdate($event)"
          />
          <div class="error-message">{{ formError.industry }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { debounce } from "lodash";
import { useDebounceFn } from "@vueuse/core";

const { getDepartments } = useDepartmentApi();
const { getPositions } = usePositionApi();
const { getIndustriesSub } = useIndustryApi();

const isLoading = ref<boolean>(false);
const departmentList = ref<Record<string, any>[]>([]);
const positionList = ref<Record<string, any>[]>([]);
const industryList = ref<Record<string, any>[]>([]);
const currentIndustryPage = ref<number>(0);
const hasReachBottom = ref<boolean>(false);
const scrollTarget = ref<HTMLElement | null>(null);
let lastScrollTop = 0;

// 🔹 For remote search
const industrySearch = ref("");
let industryAbortController: AbortController | null = null;

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

onBeforeMount(async () => {
  isLoading.value = true;

  let departmentRes = await getDepartments({ pageIndex: 0, pageSize: 1 });
  departmentRes = await getDepartments({
    pageIndex: 0,
    pageSize: departmentRes.data.pageInfo.totalElements,
  });
  departmentList.value = departmentRes.data.data
    .filter((dept: any) => dept.isActive)
    .map((dept: any) => ({
      label: dept.name,
      value: dept.id,
    }));

  await resetAndFetchIndustry();

  isLoading.value = false;
});

async function fetchIndustry(searchTerm = "") {
  if (hasReachBottom.value) return;

  // Cancel previous pending request if exists
  if (industryAbortController) {
    industryAbortController.abort();
  }
  industryAbortController = new AbortController();

  //Save current scroll position before fetch
  const prevScrollTop = scrollTarget.value?.scrollTop ?? 0;

  const params: any = {
    pageIndex: currentIndustryPage.value,
    pageSize: 10,
  };
  if (searchTerm) params.name = searchTerm;

  const res = await getIndustriesSub(params, industryAbortController);

  if (!res) return;

  const newData = res.data.data.map((data: any) => ({
    label: data.name,
    value: data.id,
  }));

  if (newData.length === 0) {
    hasReachBottom.value = true;
  }

  industryList.value = [...industryList.value, ...newData];
  currentIndustryPage.value += 1;

  //Restore previous scroll position
  await nextTick();
  if (scrollTarget.value) {
    scrollTarget.value.scrollTop = prevScrollTop;
  }
}

async function resetAndFetchIndustry(searchTerm = "") {
  //Save scroll before reset (if open)
  const prevScrollTop = scrollTarget.value?.scrollTop ?? 0;

  hasReachBottom.value = false;
  currentIndustryPage.value = 0;
  industryList.value = [];

  if (industryAbortController) {
    industryAbortController.abort();
  }

  await fetchIndustry(searchTerm);

  //Restore scroll after reset
  await nextTick();
  if (scrollTarget.value) {
    scrollTarget.value.scrollTop = prevScrollTop;
  }
}

function handleIndustryOpenUpdate(value: boolean) {
  if (value) {
    attachScrollListener();
  } else {
    validateKey("industry");
    detachScrollListener();
  }
}

const handleScroll = debounce(async (el: HTMLElement) => {
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
    await fetchIndustry(industrySearch.value);
  }
}, 250);

function onScroll(e: Event) {
  const el = e.target as HTMLElement;
  const currentTop = el.scrollTop;
  console.log(currentTop, lastScrollTop);
  if (currentTop <= lastScrollTop) {
    lastScrollTop = currentTop;
    return;
  }
  lastScrollTop = currentTop;
  handleScroll(el);
}

function attachScrollListener() {
  nextTick(() => {
    scrollTarget.value = document.querySelector(
      '[role="presentation"]',
    ) as HTMLElement;

    if (scrollTarget.value) {
      scrollTarget.value.addEventListener("scroll", onScroll, {
        passive: true,
      });
    }
  });
}

function detachScrollListener() {
  nextTick(() => {
    if (scrollTarget.value) {
      scrollTarget.value.removeEventListener("scroll", onScroll);
      scrollTarget.value = null;
    }
    lastScrollTop = 0;
  });
}

const debouncedSearch = useDebounceFn(async (query: string) => {
  await resetAndFetchIndustry(query);
}, 400);

watch(industrySearch, (val) => {
  console.log("ha!");
  debouncedSearch(val);
});

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

watch(
  () => formInput.value.department,
  async (newVal) => {
    const ids = newVal.map((val: any) => val.value);
    let positionRes = await getPositions({
      pageIndex: 0,
      pageSize: 1,
      departmentIds: ids,
    });
    positionRes = await getPositions({
      pageIndex: 0,
      pageSize: positionRes.data.pageInfo.totalElements,
      departmentIds: ids,
    });
    positionList.value = positionRes.data.data.filter(
      (pos: any) => pos.isActive,
    );
  },
);

function handleInput(key: string, value: any) {
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
    flex-wrap: wrap;
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

  :deep(.text-input) {
    .input {
      padding: 6px 8px;
      input {
        font-size: 14px;
      }
    }
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
