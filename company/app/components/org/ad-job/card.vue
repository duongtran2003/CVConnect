<template>
  <div class="job-ad-card">
    <div class="top">
      <div class="left">
        <Icon
          :name="
            props.data.isPublic
              ? 'ic:round-public'
              : 'ic:outline-private-connectivity'
          "
          class="public-icon"
          :class="{
            public: props.data.isPublic,
            private: !props.data.isPublic,
          }"
        />
        <div class="title">{{ props.data.title }}</div>
        <div
          class="chip"
          :class="{
            active: props.data.jobAdStatus.name == 'OPEN',
            paused: props.data.jobAdStatus.name == 'PAUSE',
            closed: props.data.jobAdStatus.name == 'CLOSED',
          }"
        >
          {{ props.data.jobAdStatus.description }}
        </div>
      </div>
    </div>
    <div class="small">
      <div class="block">
        <Icon name="material-symbols:cases-outline-rounded" />
        <div class="text">{{ props.data.position?.name }}</div>
      </div>
      <div class="block">
        <Icon name="material-symbols:person-add-outline-rounded" />
        <div class="text">{{ "Số lượng:" }}</div>
        <div class="text bold">{{ props.data.quantity }}</div>
      </div>
      <div class="block">
        <Icon name="material-symbols:home-work-outline-rounded" />
        <div class="text">{{ "Phòng ban:" }}</div>
        <div class="text bold">{{ props.data.department?.name }}</div>
      </div>
      <div class="block">
        <Icon name="material-symbols:calendar-clock-outline-rounded" />
        <div class="text">{{ "Hạn nộp hồ sơ:" }}</div>
        <div class="text bold">
          {{ formatDateTime(props.data.dueDate, "DD/MM/YYYY") }}
        </div>
      </div>
      <div class="block">
        <Icon name="material-symbols:person-2-outline-rounded" />
        <div class="text">{{ "Người tạo:" }}</div>
        <div class="text bold">
          {{ props.data.createdBy }}
        </div>
      </div>
      <div class="block">
        <Icon name="material-symbols:calendar-add-on-outline-rounded" />
        <div class="text">{{ "Ngày tạo:" }}</div>
        <div class="text bold">
          {{ formatDateTime(props.data.createdAt, "DD/MM/YYYY") }}
        </div>
      </div>
    </div>
    <div class="large">
      <div
        v-for="process of processList"
        :key="process.sortOrder"
        class="process-block"
      >
        <div class="count">{{ process.count }}</div>
        <div class="name">{{ process.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
type TProps = {
  data: any;
};

const props = defineProps<TProps>();

const processList = computed(() => {
  return props.data.jobAdProcess.map((process: any) => ({
    sortOrder: process.sortOrder,
    count: process.numberOfApplicants,
    name: process.name,
  }));
});
</script>
<style lang="scss" scoped>
.job-ad-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  // border: 1px solid $color-gray-200;
  @include box-shadow;

  .iconify {
    display: block;
    font-size: 20px;
    height: 20px;
    width: 20px;
  }

  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;

    .chip {
      padding: 4px 6px;
      font-size: 14px;
      border-radius: 6px;

      &.active {
        color: $color-success;
        border: 1px solid $color-success;
        background-color: rbga($color-success, 0.2);
      }
      &.paused {
        color: $color-warning;
        border: 1px solid $color-warning;
        background-color: rbga($color-warning, 0.2);
      }
      &.closed {
        color: $color-danger;
        border: 1px solid $color-danger;
        background-color: rbga($color-danger, 0.2);
      }
    }

    .public-icon {
      display: block;
      font-size: 20px;
      height: 20px;
      width: 20px;

      &.private {
        color: $color-info;
      }
      &.public {
        color: $color-success;
      }
    }

    .title {
      font-weight: 600;
      font-size: 16px;
      color: $text-light;
    }
  }

  .left,
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .small {
    display: flex;
    flex-direction: row;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;

    .block {
      display: flex;
      flex-direction: row;
      gap: 4px;
      align-items: center;
      padding-right: 8px;

      &:not(:last-child) {
        border-right: 2px solid $color-gray-300;
      }

      .text {
        font-size: 14px;
        color: $text-light;
        font-weight: 400;

        &.bold {
          font-weight: 600;
        }
      }
    }
  }

  .large {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 12px;
    margin-bottom: 12px;
    row-gap: 16px;

    .process-block {
      display: flex;
      flex-direction: column;
      // max-width: 160px;
      min-width: 160px;
      flex: 1;
      gap: 8px;
      align-items: center;
      padding-left: 16px;
      padding-right: 16px;

      &:not(:last-child) {
        border-right: 2px solid $color-gray-300;
      }
    }

    .count {
      font-size: 20px;
      font-weight: 600;
      color: $text-light;
    }

    .name {
      font-size: 13px;
      text-align: center;
      font-weight: 400;
      color: $text-light;
    }
  }
}
</style>
