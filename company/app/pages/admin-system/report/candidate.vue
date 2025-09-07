<template>
  <div class="candidate-content">
    <div class="table-wrapper">
      <UTable class="data-table" sticky :data="tableData"></UTable>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin-system",
});
const tableData = ref([
  {
    id: "4600",
    date: "2024-03-11T15:30:00",
    status: "paid",
    email: "james.anderson@example.com",
    address: "123 Main St, Springfield",
    phonenumber: "+1 555-123-4567",
    amount: 594,
  },
  {
    id: "4599",
    date: "2024-03-11T10:10:00",
    status: "failed",
    email: "mia.white@example.com",
    address: "456 Oak Ave, Metropolis",
    phonenumber: "+1 555-987-6543",
    amount: 276,
  },
  {
    id: "4598",
    date: "2024-03-11T08:50:00",
    status: "refunded",
    email: "william.brown@example.com",
    address: "789 Pine Rd, Gotham",
    phonenumber: "+1 555-444-2222",
    amount: 315,
  },
  {
    id: "4597",
    date: "2024-03-10T19:45:00",
    status: "paid",
    email: "emma.davis@example.com",
    address: "321 Maple St, Star City",
    phonenumber: "+1 555-777-8888",
    amount: 529,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    address: "654 Cedar Ln, Central City",
    phonenumber: "+1 555-111-3333",
    amount: 639,
  },
]);
</script>

<style lang="scss" scoped>
.candidate-content {
  background-color: white;
  border-radius: 8px;
  margin-top: 4px;
  min-height: calc(100% - 48px - 4px);
  @include box-shadow;
  color: $text-light;
  padding: 12px;
  padding-top: 24px;

  .table-wrapper {
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
}
</style>
