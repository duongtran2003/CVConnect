<template>
  <div class="detail">
    <div class="control">
      <Icon
        name="material-symbols:close-rounded"
        @click="() => setSelectedJob(null)"
      />
    </div>
    <div class="header">
      <div class="logo"></div>
      <div class="info">
        <div class="title">{{ selectedJob.title }}</div>
        <div class="company-name">{{ selectedJob.companyName }}</div>
        <div class="salary-range row">
          <Icon name="material-symbols:money-range-outline-rounded" />
          <span class="salary">
            {{
              `${selectedJob.salaryFrom} - ${selectedJob.salaryTo} (${selectedJob.currencyType})`
            }}
          </span>
        </div>
      </div>
    </div>
    <AppButton
      :text="'Ứng tuyển ngay'"
      class="apply-btn"
      @click="handleApply"
    />
    <div class="divider"></div>
    <div class="content">
      <div
        v-for="location of selectedJob.location"
        :key="location.id"
        class="row"
      >
        <Icon name="material-symbols:location-on-outline-rounded" />
        <div class="name">{{ location.displayAddress }}</div>
      </div>
      <div class="row">
        <Icon
          name="material-symbols:nest-remote-comfort-sensor-outline-rounded"
        />
        <div class="name">Remote</div>
      </div>
      <div class="row">
        <Icon name="material-symbols:more-time-rounded" />
        <div class="name">4 hour ago</div>
      </div>
      <div class="divider"></div>
      {{ selectedJob }}
    </div>
  </div>
</template>
<script setup lang="ts">
const jobsSearchStore = useJobsSearchStore();
const { setSelectedJob } = jobsSearchStore;
const { selectedJob } = storeToRefs(jobsSearchStore);

function handleApply() {
  console.log("apply");
}
</script>
<style lang="scss" scoped>
.detail {
  position: sticky;
  max-height: calc(100vh - 54px - 8px - 8px);
  top: 8px;
  padding: 12px;
  border-radius: 12px;
  background-color: white;
  @include box-shadow;

  .row {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }

  .iconify {
    color: $color-gray-600;
    font-size: 20px;
    display: block;
    height: 20px;
    width: 20px;
    min-width: 20px;
  }

  .control {
    display: flex;
    justify-content: flex-end;

    .iconify {
      cursor: pointer;
    }
  }

  display: flex;
  flex-direction: column;
  gap: 8px;

  .header {
    display: flex;
    flex-direction: row;
    gap: 12px;

    .logo {
      height: 84px;
      width: 84px;
      min-width: 84px;
      border-radius: 6px;
      background-color: wheat;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;

      .title {
        font-size: 20px;
        font-weight: 600;
        color: $text-light;
      }

      .company-name {
        color: $text-light;
        font-size: 14px;
      }

      .salary-range {
        font-size: 14px;
        color: $text-light;
      }
    }
  }
  .apply-btn {
    background-color: $color-primary-400;
    width: 100%;
    color: $text-dark;
    font-weight: 600;
  }

  .divider {
    display: block;
    width: 100%;
    height: 1px;
    background-color: $color-gray-200;
  }

  .content {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
