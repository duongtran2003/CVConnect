<template>
  <div class="data-table">
    <UTable class="data-table" sticky :data="props.tableData" />
  </div>
</template>
<script setup lang="ts">
export type TDataTableProps = {
  tableData: any;
  isLoading?: boolean;
};

const props = withDefaults(defineProps<TDataTableProps>(), {
  isLoading: false,
});
</script>
<style lang="scss" scoped>
.data-table {
  overflow-x: auto;
  width: 100%;
  border: 1px solid $color-gray-300;
  border-radius: 4px;

  .data-table {
    max-height: 240px;
    @include custom-scrollbar;

    :deep(table) {
      thead {
        tr:last-child {
          background-color: $color-gray-300;
          height: 1px;
        }
      }

      tbody {
        &.divide-y {
          tr:not(:last-child) {
            border-bottom: 1px solid $color-gray-300;
          }
        }
      }

      tr {
        background-color: $color-primary-50;
        font-weight: 600;
        th {
          background-color: $color-primary-50;
          color: $color-primary-400;
        }
        td {
          color: $text-light;
        }
        th:last-child {
          position: sticky;
          right: 0px;
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: -1px;
            width: 1px;
            height: 100%;
            background-color: $color-gray-300;
            display: block;
          }
        }
        th:first-child {
          position: sticky;
          left: 0px;
          &::after {
            content: "";
            position: absolute;
            top: 0;
            right: -1px;
            width: 1px;
            height: 100%;
            background-color: $color-gray-300;
            display: block;
          }
        }

        td:last-child {
          position: sticky;
          right: 0px;
          background-color: white;
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: -1px;
            width: 1px;
            height: 100%;
            background-color: $color-gray-300;
            display: block;
          }
        }
        td:first-child {
          position: sticky;
          left: 0px;
          background-color: white;
          &::after {
            content: "";
            position: absolute;
            top: 0;
            right: -1px;
            width: 1px;
            height: 100%;
            background-color: $color-gray-300;
            display: block;
          }
        }
        td {
          background-color: white;
        }
      }
    }
  }
}
</style>
