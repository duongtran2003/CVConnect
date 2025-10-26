<template>
  <div class="job-ad">
    <div class="label">Tin ứng tuyển</div>
    <div class="info">
      <AppNoData v-if="!displayJobAd" />
      <template v-else>
        <div class="info-top">
          <span class="title">{{ displayJobAd.jobAd.title }}</span>
          <span
            class="value chip"
            :style="{
              borderColor: CANDIDATE_STATUS[displayJobAd.candidateStatus].color,
              color: CANDIDATE_STATUS[displayJobAd.candidateStatus].color,
              backgroundColor:
                CANDIDATE_STATUS[displayJobAd.candidateStatus].background,
            }"
            >{{ CANDIDATE_STATUS[displayJobAd.candidateStatus].label }}</span
          >
        </div>
        <div class="info-dept-pos">
          <span>{{ displayJobAd.jobAd.departmentName }}</span>
          <span>•</span>
          <span>{{ displayJobAd.jobAd.positionName }}</span>
        </div>
        <div class="hr-info">
          <span class="hr-info-label">
            <Icon name="material-symbols:article-person-rounded" />
            <span>{{ displayJobAd.jobAd.hrContactName }}</span>
          </span>
        </div>
        <div class="processes">
          <div class="list">
            <div
              v-for="(process, index) of displayJobAd.jobAdProcessCandidates"
              :key="process.id"
              class="process"
            >
              <div
                v-if="index !== 0"
                class="line"
                :class="{
                  highlighted: index <= displayJobAdCurrentProcessIndex,
                }"
              >
                <span></span>
              </div>
              <div
                class="dot"
                :class="{
                  highlighted: index <= displayJobAdCurrentProcessIndex,
                }"
              >
                <Icon name="stash:circle-dot" />
                <span>{{ process.processName }}</span>
              </div>
            </div>
          </div>
          <div class="actions">
            <AppButton class="action-btn" :text="'Thao tác'" />
          </div>
        </div>
      </template>
    </div>
    <template v-if="props.jobAdInfos?.length > 1">
      <div class="label">Các tin khác</div>
      <div class="info"></div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { CANDIDATE_STATUS } from "~/const/views/org/candidates";

type TProps = {
  jobAdInfos: Record<string, any>[];
};

const props = defineProps<TProps>();

const displayJobAd = computed(() => {
  const firstJobAd = props.jobAdInfos[0];
  return firstJobAd;
});

const displayJobAdCurrentProcessIndex = computed(() => {
  return (
    displayJobAd.value?.jobAdProcessCandidates.findIndex(
      (process: any) => process.isCurrentProcess,
    ) || 0
  );
});
</script>
<style lang="scss" scoped>
.job-ad {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .label {
    font-weight: 500;
    font-size: 16px;
    color: $text-light;
  }

  .info {
    border: 1px solid $color-gray-300;
    padding: 6px;
    border-radius: 6px;

    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .title {
    font-weight: 500;
    font-size: 16px;
  }
  .hr-info {
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: space-between;
    flex-wrap: wrap;
    .hr-info-label {
      display: flex;
      flex-direction: row;
      gap: 4px;
      align-items: center;

      .iconify {
        display: block;
        font-size: 20px;
      }
    }
  }

  .processes {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;

    .list {
      display: flex;
      flex-direction: column;

      .process {
        display: flex;
        flex-direction: column;

        .line {
          padding-left: 9px;
          &.highlighted {
            span {
              background-color: $color-primary-500;
            }
          }
          span {
            height: 16px;
            width: 2px;
            display: block;
            background-color: $color-gray-300;
          }
        }

        .dot {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 4px;
          color: $color-gray-300;

          &.highlighted {
            color: $color-primary-500;
          }

          .iconify {
            display: block;
            font-size: 20px;
            min-width: 20px;
            min-height: 20px;
          }
        }
      }
    }
    .actions {
      .action-btn {
        padding: 6px 12px;
        font-size: 14px;
        color: $text-dark;
        background-color: $color-primary-500;
      }
    }
  }

  .info-dept-pos {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .info-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;

    .chip {
      border-radius: 4px;
      padding: 4px;
      border: 1px solid $color-gray-300;
      font-size: 12px;
      font-weight: 500;
    }
  }
}
</style>
