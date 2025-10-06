<template>
  <div class="search-select-input">
    <div class="label">
      <span class="text">Ngành nghề</span>
      <span class="required">Bắt buộc</span>
    </div>
    <USelectMenu
      :search-term="searchValue"
      :model-value="props.value"
      :items="options"
      class="selector"
      :class="{ error: error }"
      :variant="'none'"
      autocomplete="autocomplete"
      :placeholder="props.placeholder"
      :multiple="props.multiple"
      :filter="!props.remoteFilter"
      searchable
      :loading="props.isLoading"
      :title="props.value?.map((i: any) => i.label).join(', ') ?? ''"
      :search-input="{ placeholder: 'Tìm kiếm' }"
      :ui="{
        trailingIcon:
          'group-data-[state=open]:rotate-180 transition-transform duration-200',
      }"
      @update:model-value="handleInput($event)"
      @update:search-term="handleSearchInput($value as string)"
      @update:open="($event) => handleOpenUpdate($event)"
    />
    <div class="error-message">{{ error }}</div>
  </div>
</template>
<script setup lang="ts">
import { debounce } from "lodash";

type TProps = {
  label?: string;
  required?: boolean;
  options?: Record<string, any>[];
  value: Record<string, any>[] | Record<string, any> | undefined;
  error?: string;
  placeholder?: string;
  remoteFilter?: boolean;
  multiple?: boolean;
  isLoading?: boolean;
  fetchFn: (params: any, controller?: AbortController) => Promise<any>;
};

const props = withDefaults(defineProps<TProps>(), {
  label: "",
  required: false,
  options: () => [],
  error: "",
  placeholder: "Mời chọn",
  remoteFilter: false,
  multiple: false,
  isLoading: false,
});
const emits = defineEmits<{
  (
    e: "input",
    value: Record<string, any> | Record<string, any>[] | undefined,
  ): void;
  (e: "open-update", value: boolean): void;
  (e: "search-filter"): void;
}>();

const scrollTarget = ref<HTMLElement | null>(null);
const controller = ref<AbortController | null>(null);
const currentPage = ref<number>(0);
const searchValue = ref<string>("");
const hasReachBottom = ref<boolean>(false);
let lastScrollTop = 0;

function handleInput(
  value: Record<string, any> | Record<string, any>[] | undefined,
) {
  emits("input", value);
}

function handleOpenUpdate(isOpen: boolean) {
  if (isOpen) {
    attachScrollListener();
  } else {
    detachScrollListener();
  }

  emits("open-update", isOpen);
}

function handleSearchInput(value: string) {
  searchValue.value = value;
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

const handleScroll = debounce(async (el: HTMLElement) => {
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
    await props.fetchFn(searchValue);
  }
}, 250);

async function resetAndFetch(searchTerm = "") {
  //Save scroll before reset (if open)
  const prevScrollTop = scrollTarget.value?.scrollTop ?? 0;

  hasReachBottom.value = false;
  currentPage.value = 0;
  // industryList.value = [];
  emits("search-filter");

  if (controller.value) {
    controller.value.abort();
  }

  await fetchData(searchTerm);

  //Restore scroll after reset
  await nextTick();
  if (scrollTarget.value) {
    scrollTarget.value.scrollTop = prevScrollTop;
  }
}

async function fetchData(searchTerm = "") {
  if (hasReachBottom.value) {
    return;
  }
  if (controller.value) {
    controller.value.abort();
  }
  controller.value = new AbortController();

  const prevScrollTop = scrollTarget.value?.scrollTop ?? 0;

  const params: any = {
    pageIndex: currentPage.value,
    pageSize: 10,
  };
  if (searchTerm) params.name = searchTerm;

  const res = await props.fetchFn(params, controller.value);
  if (!res) {
    return;
  }

  if (res.data.data.length == 0) {
    hasReachBottom.value = true;
  }

  currentPage.value += 1;

  await nextTick();
  if (scrollTarget.value) {
    scrollTarget.value.scrollTop = prevScrollTop;
  }
}

const debouncedSearch = useDebounceFn(async (query: string) => {
  await resetAndFetch(query);
}, 400);

watch(searchValue, (val) => {
  debouncedSearch(val);
});
</script>
<style lang="scss" scoped>
.search-select-input {
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
</style>
