<template>
  <div class="search-section">
    <div class="inner">
      <div class="decoration">
        <div class="title">Kết nối tới nhà tuyển dụng</div>
        <div class="sub">miễn phí ngay với CVConnect</div>
      </div>
      <div class="search-bar">
        <AppInputText
          :label="''"
          :required="false"
          :error="''"
          :placeholder="'Tìm kiếm công việc'"
          :value="searchKeyword"
          :is-disabled="false"
          :slim-error="true"
          :title="''"
          class="text-input"
          @input="($event) => (searchKeyword = $event)"
          @enter="handleSearch"
        >
          <template #input-icon>
            <Icon name="material-symbols:search-rounded" class="mag-icon" />
          </template>
        </AppInputText>
        <AppButton
          :text="'Tìm kiếm ngay'"
          class="search-btn"
          @click="handleSearch"
        >
          <template #icon>
            <Icon name="material-symbols:search-rounded" class="search-icon" />
          </template>
        </AppButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "public",
});

const emits = defineEmits<{
  (e: "search", keyword: string): void;
}>();

const searchKeyword = ref<string>("");

const jobsSearchStore = useJobsSearchStore();
const { filter } = storeToRefs(jobsSearchStore);

function handleSearch() {
  emits("search", searchKeyword.value);
}

watch(filter, (newFilter) => {
  searchKeyword.value = newFilter?.keyword ?? "";
}, { immediate: true })
</script>
<style lang="scss" scoped>
.search-section {
  padding: 48px 0px 84px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #7a0c0c;
  background: linear-gradient(
    103deg,
    rgba(122, 12, 12, 1) 0%,
    rgba(0, 0, 0, 1) 100%,
    rgba(237, 221, 83, 1) 100%
  );

  flex-direction: column;
  gap: 8px;

  .inner {
    width: calc(75% - 16px);
    max-width: calc(75% - 16px);
    @media (max-width: 768px) {
      max-width: calc(100% - 32px);
      width: calc(100% - 32px);
    }
    display: flex;
    flex-direction: column;
    gap: 8px;

    :deep(.input) {
      background: white;
      border-radius: 4px;
      border: none;
      &:hover:not(.disabled),
      &:focus-within:not(.disabled) {
        border: none;
      }
    }

    .decoration {
      .title {
        display: inline;
        color: $text-dark;
        font-weight: 600;
        font-size: 24px;
      }
      .sub {
        display: inline;
        color: $text-dark;
        font-weight: 400;
        font-size: 14px;
        margin-left: 8px;
      }
    }

    .search-bar {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 12px;

      .text-input {
        flex: 1;
      }

      .mag-icon {
        display: block;
        font-size: 14px;
        height: 20px;
        width: 20px;
        color: $color-gray-400;
      }

      .search-icon {
        display: block;
        font-size: 20px;
        height: 20px;
        width: 20px;
        color: white;
      }

      .search-btn {
        background-color: $color-primary-400;
        color: $text-dark;
        height: 43px;
      }
    }
  }
}
</style>
