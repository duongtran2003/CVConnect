<template>
  <div class="featured-job-table">
    <div class="title">Tin tuyển dụng hoạt động gần đây</div>
    <table>
      <thead>
        <tr>
          <th>Tiêu đề</th>
          <th>Doanh nghiệp</th>
          <th>Lượt ứng tuyển</th>
          <th>Lượt xem</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in props.data" :key="job.id">
          <td class="cell-overflow" :title="job.title">{{ job.title }}</td>
          <td class="cell-overflow" :title="job.org.name">
            {{ job.org.name }}
          </td>
          <td class="cell-overflow" :title="String(job.numberOfApplications)">
            {{ job.numberOfApplications }}
          </td>
          <td class="cell-overflow" :title="String(job.numberOfViews)">
            {{ job.numberOfViews }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
export type TFeaturedJobData = {
  id: number;
  title: string;
  orgId: number;
  org: { id: number; name: string };
  numberOfApplications: number;
  numberOfViews: number;
};

export type TProps = {
  data: TFeaturedJobData[];
};

const props = defineProps<TProps>();
</script>

<style scoped lang="scss">
.featured-job-table {
  .title {
    font-size: 19px;
    font-weight: 600;
    color: #333333;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    font-family: "Inter", sans-serif;
    font-size: 13px;

    th,
    td {
      padding: 12px 16px;
      text-align: left;
    }

    /* Column widths */
    th:nth-child(1),
    td:nth-child(1) {
      width: 30%;
    }
    th:nth-child(2),
    td:nth-child(2) {
      width: 30%;
    }
    th:nth-child(3),
    td:nth-child(3) {
      width: 20%;
    }
    th:nth-child(4),
    td:nth-child(4) {
      width: 20%;
    }

    th {
      background-color: #f9fafb;
      font-weight: 600;
      color: #374151;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    tbody tr {
      background-color: #ffffff;
      transition: background-color 0.2s;
    }

    tbody tr:hover {
      background-color: #f3f4f6;
    }

    tbody tr + tr {
      border-top: 1px solid #e5e7eb;
    }

    /* Text overflow handling for all cells */
    .cell-overflow {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 0; /* Forces ellipsis in table cells with fixed width */
    }
  }
}
</style>
