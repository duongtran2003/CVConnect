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
        @selection-update="handleSelectionsUpdate"
        @delete="handleTableActionClick($event, 'delete')"
        @edit="handleTableActionClick($event, 'edit')"
        @sort="handleSort"
      >
      </AppTableDataTable>
    </div>
    <div class="top-section">
      <UPagination
        :show-edges="true"
        :sibling-count="1"
        :variant="'ghost'"
        :items-per-page="pageOption.pageSize"
        :total="10"
        @update:page="handlePageIndexChange($event)"
      />
      <USelect
        variant="subtle"
        :items="pageSizeOpts"
        class="w-fit bg-white text-[#333333]"
        :model-value="pageOption.pageSize"
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
import { cloneDeep } from "lodash";

definePageMeta({
  layout: "system-admin",
});
useHead({
  title: "Cài đặt nhóm người dùng",
});

const route = useRoute();
const isFetchingData = ref<boolean>(false);
const fetchRoleController = ref<AbortController | null>();
const allowActions = computed(() => {
  const url = route.path;
  const menuItem = getMenuItem(url);
  const permissions = Array.from(menuItem?.permissions || []);
  return permissions;
});

const { getMenuItem } = useSidebarStore();
const { getRoles } = useRoleApi();
onBeforeMount(async () => {
  await fetchData();
});

const sort = ref<TSort | null>(null);
const pageOption = ref({
  pageIndex: 1,
  pageSize: 10,
  totalElements: 0,
});
const handleSort = (e: TSort) => {
  sort.value = e;
  fetchData();
};

const fetchData = async () => {
  if (fetchRoleController.value) {
    fetchRoleController.value.abort();
  }

  fetchRoleController.value = new AbortController();
  const { pageIndex, pageSize } = cloneDeep(pageOption.value);
  const paramsObject = {
    pageIndex: pageIndex - 1,
    pageSize,
    sortBy: sort.value && sort.value.type ? sort.value.key : undefined,
    sortDirection: sort.value && sort.value.type ? sort.value.type : undefined,
  };
  isFetchingData.value = true;
  const res = await getRoles(paramsObject, fetchRoleController.value);
  if (res === null) {
    return;
  }
  isFetchingData.value = false;
  const data = res.data.data;
  pageOption.value = res.data.pageInfo;
  pageOption.value.pageIndex = pageOption.value.pageIndex + 1;

  for (const [index, entry] of data.entries()) {
    entry.index = index + 1;
    entry.createdAt = formatDateTime(entry.createdAt, "DD/MM/YYYY - HH:mm");
    entry.updatedAt = formatDateTime(entry.updatedAt, "DD/MM/YYYY - HH:mm");
    entry.memberType = entry.memberTypeDto.memberType;
  }
  tableData.value = data;
};
const selectedRows = ref<number[]>([]);
const handleSelectionsUpdate = (selectionList: number[]) => {
  selectedRows.value = selectionList;
  console.log(selectedRows.value);
};

const handlePageSizeChange = (e: any) => {
  pageOption.value.pageSize = e;
  pageOption.value.pageIndex = 1;
  fetchData();
};

const handlePageIndexChange = (e: any) => {
  pageOption.value.pageIndex = e;
  fetchData();
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
