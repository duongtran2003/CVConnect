<template>
  <div class="user-group-content">
    <div class="title">Quản lí nhóm người dùng</div>
    <div class="table-section">
      <AppTableDataTable
        :table-data="tableData"
        :columns="tableColumns"
        :allow-actions="allowActions"
        :show-checkbox="true"
        :show-actions="true"
        :is-loading="isFetchingData"
        :selection-list="selectedRows"
        :sort="sort"
        :select-options="memberTypeSelectOptions"
        :filter="filter"
        @selection-update="handleSelectionsUpdate"
        @delete="handleTableActionClick($event, 'delete')"
        @edit="handleTableActionClick($event, 'edit')"
        @sort="handleSort"
        @filter="handleFilter"
      />
    </div>
    <div class="top-section">
      <UPagination
        :show-edges="true"
        :sibling-count="1"
        :variant="'ghost'"
        :items-per-page="pageSize"
        :page="pageIndex"
        :total="totalItems"
        @update:page="handlePageIndexChange($event)"
      />
      <USelect
        variant="subtle"
        :items="pageSizeOpts"
        class="w-fit bg-white text-[#333333]"
        :model-value="pageSize"
        @update:model-value="handlePageSizeChange($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TTableAction } from "~/components/app/table/data-table.vue";
import {
  userGroupTableHeaders,
  pageSizeOptions,
} from "~/const/views/system-admin/user-group";
import type { TSort } from "~/types/common";
import { cloneDeep, debounce } from "lodash";

definePageMeta({
  layout: "system-admin",
});
useHead({
  title: "Cài đặt nhóm người dùng",
});

const route = useRoute();
const router = useRouter();
const isFetchingData = ref<boolean>(false);
const fetchRoleController = ref<AbortController | null>();
const memberTypes = ref<any>([]);
const filter = ref<Record<string, any>>({});
const totalItems = ref<number>(0);
const allowActions = computed(() => {
  const url = route.path;
  const menuItem = getMenuItem(url);
  const permissions = Array.from(menuItem?.permissions || []);
  return permissions;
});

const { getMenuItem } = useSidebarStore();
const { getRoles, getMemberTypes } = useRoleApi();
onBeforeMount(async () => {
  const res = await getMemberTypes();
  memberTypes.value = res.data.map((memberType: any) => ({
    label: memberType.name,
    value: memberType.code,
  }));

  const query = route.query;
  let restoredFilter: Record<string, any> = {};

  restoredFilter = {
    ...restoredFilter,
    ...query,
  };

  const createdAt: (Date | null)[] = [];
  if (query.createdAtStart) {
    const start = new Date(query.createdAtStart as string);
    if (!isNaN(start.getTime())) {
      createdAt.push(start);
    } else {
      createdAt.push(null);
    }
  }
  if (query.createdAtEnd) {
    const end = new Date(query.createdAtEnd as string);
    if (!isNaN(end.getTime())) {
      createdAt.push(end);
    } else {
      createdAt.push(null);
    }
  }
  if (createdAt.length) {
    restoredFilter.createdAt = createdAt;
  }

  const updatedAt: (Date | null)[] = [];
  if (query.updatedAtStart) {
    const start = new Date(query.updatedAtStart as string);
    if (!isNaN(start.getTime())) {
      updatedAt.push(start);
    } else {
      updatedAt.push(null);
    }
  }
  if (query.updatedAtEnd) {
    const end = new Date(query.updatedAtEnd as string);
    if (!isNaN(end.getTime())) {
      updatedAt.push(end);
    } else {
      updatedAt.push(null);
    }
  }
  if (updatedAt.length) {
    restoredFilter.updatedAt = updatedAt;
  }

  if (query.memberType) {
    const values = (query.memberType as string).split(",");
    restoredFilter.memberType = values
      .map((val) => memberTypes.value.find((opt: any) => opt.value === val))
      .filter(Boolean);
  }

  delete restoredFilter.createdAtStart;
  delete restoredFilter.createdAtEnd;
  delete restoredFilter.updatedAtStart;
  delete restoredFilter.updatedAtEnd;

  filter.value = restoredFilter;

  memberTypes.value = res.data.map((memberType: any) => ({
    label: memberType.name,
    value: memberType.code,
  }));
});

const sort = computed(() => {
  return {
    key: filter.value.sortBy,
    type: filter.value.sortDirection ? filter.value.sortDirection : undefined,
  };
});

const pageIndex = computed(() => {
  return !isNaN(filter.value.pageIndex) ? +filter.value.pageIndex + 1 : 1;
});

const pageSize = computed(() => {
  return filter.value.pageSize ? +filter.value.pageSize : 10;
});

const handleSort = (e: TSort) => {
  filter.value = {
    ...filter.value,
    sortBy: e.type ? e.key : undefined,
    sortDirection: e.type ? e.type : undefined,
  };
};
const handleFilter = (e: any) => {
  filter.value = e;
};

const fetchData = async () => {
  if (fetchRoleController.value) {
    fetchRoleController.value.abort();
  }

  fetchRoleController.value = new AbortController();
  isFetchingData.value = true;
  const query = route.query;
  const res = await getRoles(query, fetchRoleController.value);
  if (res === null) {
    return;
  }
  isFetchingData.value = false;
  const data = res.data.data;
  totalItems.value = res.data.pageInfo.totalElements;

  for (const [index, entry] of data.entries()) {
    entry.index = index + 1;
    entry.createdAt = formatDateTime(entry.createdAt, "DD/MM/YYYY - HH:mm");
    entry.updatedAt = formatDateTime(entry.updatedAt, "DD/MM/YYYY - HH:mm");
    entry.memberType = entry.memberTypeDto.memberType;
  }
  tableData.value = data;
};
const debouncedFetchData = debounce(fetchData, 500);
const selectedRows = ref<number[]>([]);
const handleSelectionsUpdate = (selectionList: number[]) => {
  selectedRows.value = selectionList;
};

const handlePageSizeChange = (e: any) => {
  filter.value = {
    ...filter.value,
    pageIndex: 0,
    pageSize: e,
  };
};

const handlePageIndexChange = (e: any) => {
  filter.value = {
    ...filter.value,
    pageIndex: e - 1,
  };
};

const handleTableActionClick = (id: number, action: TTableAction) => {
  console.log(`trigger action ${action} on record id ${id}`);
};

const tableData = ref([]);
const tableColumns = computed(() => {
  return userGroupTableHeaders;
});
const pageSizeOpts = computed(() => {
  return pageSizeOptions;
});
const memberTypeSelectOptions = computed(() => {
  return {
    memberType: memberTypes.value,
  };
});

watch(filter, (newVal) => {
  const normalizedFilter = cloneDeep(newVal);
  if (normalizedFilter.createdAt) {
    const startDate = normalizedFilter.createdAt[0];
    const endDate = normalizedFilter.createdAt[1];
    delete normalizedFilter.createdAt;
    if (startDate) {
      normalizedFilter.createdAtStart = toUtcDate(startDate);
    }
    if (endDate) {
      normalizedFilter.createdAtEnd = toUtcDate(endDate);
    }
  }
  if (normalizedFilter.updatedAt) {
    const startDate = normalizedFilter.updatedAt[0];
    const endDate = normalizedFilter.updatedAt[1];
    delete normalizedFilter.updatedAt;
    if (startDate) normalizedFilter.updatedAtStart = toUtcDate(startDate);
    if (endDate) normalizedFilter.updatedAtEnd = toUtcDate(endDate);
  }
  if (normalizedFilter.memberType && normalizedFilter.memberType.length) {
    normalizedFilter.memberType = normalizedFilter.memberType.map(
      (memberType: any) => memberType.value,
    );
  } else {
    delete normalizedFilter.memberType
  }

  const queryForUrl: Record<string, any> = {
    ...normalizedFilter,
  };

  if (Array.isArray(queryForUrl.memberType)) {
    queryForUrl.memberType = queryForUrl.memberType.join(",");
  }

  router.replace({
    query: {
      ...truncateQueryObject(queryForUrl),
    },
  });
  debouncedFetchData();
});
</script>

<style lang="scss" scoped>
.user-group-content {
  background-color: white;
  border-radius: 8px;
  margin-top: 8px;
  min-height: calc(100% - 48px - 8px);
  @include box-shadow;
  color: $text-light;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .title {
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 24px;
  }
  .top-section {
    margin-top: 18px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: flex-end;

    :deep(button[type="button"][disabled]) {
      color: $color-gray-400;
    }
  }
  .table-section {
    max-width: 100%;
  }
}
</style>
