<template>
  <div class="job-card">
    <div class="posted-time">{{ relativeTime }}</div>
    <div class="title">{{ props.data.title }}</div>
    <div class="company-info row">
      <div class="logo">
        <img :src="props.data.org?.logoUrl" alt="Logo công ty" />
      </div>
      <div class="name">{{ props.data.org?.name }}</div>
    </div>
    <div class="divider"></div>
    <div class="salary row">
      <Icon name="material-symbols:money-range-outline-rounded" />
      <div v-if="props.data.salaryType?.name != 'NEGOTIABLE'" class="range">
        {{
          `${props.data.salaryFrom} - ${props.data.salaryTo} (${props.data.currencyType?.name})`
        }}
      </div>
      <div v-else class="range">Thỏa thuận</div>
    </div>
    <div class="row job-type">{{ props.data.jobType?.description }}</div>
    <div class="divider"></div>
    <div class="block">
      <div class="position row">
        <Icon name="majesticons:suitcase-2-line" />
        <div class="name">{{ props.data.position?.name }}</div>
      </div>
      <div class="row">
        <div v-if="props.data.isRemote" class="remote row">
          <Icon
            name="material-symbols:nest-remote-comfort-sensor-outline-rounded"
          />
          <div class="name">Remote</div>
        </div>
        <div v-if="location" class="location row">
          <Icon name="material-symbols:location-on-outline-rounded" />
          <div class="name">{{ location }}</div>
        </div>
      </div>
    </div>
    <!-- <div class="divider"></div> -->
    <!-- <div class="benefit row"> -->
    <!--   <div class="content" v-html="props.data.benefit"></div> -->
    <!-- </div> -->
  </div>
</template>
<script setup lang="ts">
type TProps = {
  data: any;
};

const props = defineProps<TProps>();

const relativeTime = useMomentRelativeTime(props.data.createdAt);

const location = computed(() => {
  if (!props.data.workLocations || props.data.workLocations.length == 0) {
    return "";
  }

  if (props.data.workLocations.length <= 1) {
    return props.data.workLocations[0].displayAddress;
  }

  return `${props.data.workLocations[0].displayAddress}, +${props.data.workLocations.length - 1}`;
});
</script>
<style lang="scss" scoped>
.job-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: $text-light;
  padding: 8px;
  @include box-shadow;
  cursor: pointer;
  background-color: white;
  border-radius: 6px;
  border: 1px solid white;

  .divider {
    display: block;
    width: 100%;
    height: 1px;
    background-color: $color-gray-200;
  }

  .block {
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: $text-light;
  }

  .iconify {
    display: block;
    font-size: 16px;
    height: 16px;
    width: 16px;
    min-width: 16px;
  }

  .posted-time {
    color: $color-gray-400;
    font-size: 12px;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
  }

  .row {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    font-size: 13px;
  }

  .company-info {
    .logo {
      display: block;
      height: 48px;
      width: 48px;
      border-radius: 12px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
      }
    }

    .name {
      color: $color-gray-600;
    }
  }

  .salary {
    .iconify {
      color: $color-gray-600;
    }

    .range {
      color: $color-gray-600;
      font-weight: 600;
    }
  }

  .position {
    .iconify {
      color: $color-gray-600;
    }

    .name {
      color: $color-gray-600;
      font-weight: 400;
    }
  }

  .remote,
  .location {
    margin-right: 16px;
    .iconify {
      color: $color-gray-600;
    }

    .name {
      color: $color-gray-600;
      font-weight: 400;
    }
  }

  .job-type {
    color: $color-gray-600;
  }

  .benefit {
    .iconify {
      color: $color-gray-600;
    }

    :deep(.content) {
      color: $color-gray-600;
      font-weight: 400;
    }
  }
}
</style>
