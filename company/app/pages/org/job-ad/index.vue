<template>
  <div class="wrapper">
    <div class="job-ad-content">
      <div class="top">
        <div class="left">
          <div class="title">Tin tuyển dụng</div>
        </div>
        <div class="right">
          <AppButton
            v-if="allowActions.includes('ADD')"
            :text="'Tạo mới'"
            class="submit-btn"
            @click="handleCreate"
          />
        </div>
      </div>
      <div class="filter">
        <AppInputText
          :label="''"
          :required="false"
          :error="''"
          :placeholder="'Tìm kiếm'"
          :value="filter.keyword"
          :slim-error="true"
          class="search-bar"
          @input="handleInputDebounce('keyword', $event)"
        >
          <template #input-icon>
            <Icon name="material-symbols:search-rounded" class="mag-icon" />
          </template>
        </AppInputText>
        <AppInputSearchSelect
          class="job-ad-status-select"
          :label="''"
          :required="true"
          :options="jobAdStatusOpts"
          :value="filter.jobAdStatus"
          :error="''"
          :slim-error="true"
          :placeholder="'Trạng thái tin'"
          :remote-filter="false"
          :allow-clear="false"
          :multiple="false"
          :fetch-fn="fetchJobAdStatus"
          @input="handleInput('jobAdStatus', $event)"
          @clear-value="filter.jobAdStatus = undefined"
        />
        <AppInputSearchSelect
          class="job-ad-status-select"
          :label="''"
          :required="true"
          :options="sortOpts"
          :value="currentSort"
          :error="''"
          :slim-error="true"
          :placeholder="'Sắp xếp theo'"
          :remote-filter="false"
          :allow-clear="true"
          :multiple="false"
          :fetch-fn="fetchJobAdStatus"
          @input="handleSort($event)"
          @clear-value="handleSort(undefined)"
        />
        <div
          :title="'Lọc ứng viên'"
          class="filter-btn"
          @click="isFilterShow = !isFilterShow"
        >
          <Icon
            :name="
              isFilterShow
                ? 'material-symbols:filter-alt'
                : 'material-symbols:filter-alt-outline'
            "
          />
        </div>
      </div>
      <div class="body">
        <div class="content"></div>
        <div v-show="isFilterShow" class="filter-tab">
          <OrgAdJobFilter
            :filter-data="filter"
            @filter-change="handleFilterChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { debounce } from "lodash";

definePageMeta({
  layout: "org",
});
useHead({
  title: "Tin tuyển dụng",
});

const router = useRouter();
const route = useRoute();
const { getMenuItem } = useSidebarStore();
const { getJobAdStatus } = useEnumApi();

const filter = ref<any>({
  keyword: "",
  jobAdStatus: undefined,
  isPublic: undefined,
  departmentIds: [],
  hrContactId: undefined,
  createdBy: "",
  createdAtStart: undefined,
  createdAtEnd: undefined,
  dueDateStart: undefined,
  dueDateEnd: undefined,
  sortBy: undefined,
  sortDirection: undefined,
  pageIndex: 0,
  pageSize: 10,
});
const isFilterShow = ref<boolean>(false);
const jobAdStatusList = ref<any[]>([]);
const currentSort = ref<any>(undefined);

const allowActions = computed(() => {
  const url = route.path;
  const menuItem = getMenuItem(url);
  const permissions = Array.from(menuItem?.permissions || []);
  return permissions;
});

const jobAdStatusOpts = computed(() => {
  return jobAdStatusList.value.map((status) => ({
    label: status.description,
    value: status.name,
  }));
});

const sortOpts = computed(() => {
  return [
    {
      label: "Ngày tạo",
      value: "createdBy",
    },
    {
      label: "Hạn nộp hồ sơ",
      value: "dueDate",
    },
    {
      label: "Tiêu đề",
      value: "title",
    },
  ];
});

async function fetchJobAdStatus() {
  const res = await getJobAdStatus();
  jobAdStatusList.value = res.data;

  return res.data;
}

function handleFilterChange(_filter: any) {
  console.log("filter change", _filter);
  filter.value = _filter;
}

function handleSort(sort: any) {
  currentSort.value = sort;
  if (!currentSort.value) {
    filter.value.sortBy = undefined;
    filter.value.sortDirection = undefined;
    return;
  }
  filter.value.sortBy = currentSort.value.value;
  filter.value.sortDirection = "DESC";
}

function handleInput(key: string, value: any) {
  filter.value[key] = value;
}

const debounced = debounce((key: string, value: any) => {
  filter.value[key] = value;
}, 300);

function handleInputDebounce(key: string, value: any) {
  debounced(key, value);
}

const handleCreate = () => {
  router.push({ path: "/org/job-ad/create" });
};

function convertFilterToQuery(f: any) {
  const q: Record<string, any> = {};

  if (f.keyword?.trim()) {
    q.keyword = f.keyword.trim();
  }
  if (f.jobAdStatus) {
    q.jobAdStatus = f.jobAdStatus.value;
  }
  if (f.isPublic != undefined || f.isPublic != null) {
    q.isPublic = f.isPublic.value;
  }
  if (f.departmentIds?.length) {
    q.departmentIds = f.departmentIds.map((dept: any) => dept.value).join(",");
  }
  if (f.hrContactId) {
    q.hrContactId = f.hrContactId.value;
  }
  if (f.createdBy.trim()) {
    q.createdBy = f.createdBy.trim();
  }
  if (f.createdAtStart) {
    q.createdAtStart = toDateStart(f.createdAtStart);
  }
  if (f.createdAtEnd) {
    q.createdAtEnd = toDateEnd(f.createdAtEnd);
  }
  if (f.dueDateStart) {
    q.dueDateStart = toDateStart(f.dueDateStart);
  }
  if (f.dueDateEnd) {
    q.dueDateEnd = toDateEnd(f.dueDateEnd);
  }
  if (f.sortBy && f.sortDirection) {
    q.sortBy = f.sortBy;
    q.sortDirection = f.sortDirection;
  }
  q.pageIndex = f.pageIndex;
  q.pageSize = f.pageSize;

  return q;
}

function syncQueryToRoute(query: any) {
  router.replace({
    query,
  });
}

watch(
  filter,
  (newVal) => {
    const query = convertFilterToQuery(newVal);
    syncQueryToRoute(query);
  },
  { deep: true },
);
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
.job-ad-content {
  background-color: white;
  min-height: calc(100% - 48px - 8px);
  @include box-shadow;
  color: $text-light;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
}

.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  row-gap: 8px;
  flex-wrap: wrap;

  .left {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;

    .title {
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
    }
  }

  .right {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;

    .submit-btn {
      background-color: $color-primary-400;
      border: 1px $color-primary-400;
      color: $text-dark;
      padding: 4px 6px;
      font-size: 14px;
      min-width: 84px;
    }
  }
}

.filter {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  .right {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .filter-btn {
    background-color: $color-gray-100;
    border-radius: 999px;
    cursor: pointer;
    height: 36px;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-primary-500;
    .iconify {
      display: block;
      font-size: 20px;
    }
  }

  .search-bar {
    width: 360px;
    :deep(.input) {
      padding: 6px 8px;
      input {
        font-size: 14px;
      }
    }
  }

  .job-ad-status-select {
    max-width: 180px;
    width: 180px;
    min-width: 180px;
  }
}

.body {
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex: 1;
  min-height: 0;

  .content {
    max-height: 100%;
    overflow-y: auto;
    flex: 1;
  }

  .filter-tab {
    width: min(30%, 280px);
  }
}

.mag-icon {
  display: block;
  font-size: 14px;
  height: 20px;
  width: 20px;
  color: $color-gray-400;
}
</style>
