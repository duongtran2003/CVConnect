<template>
  <div class="overview-card">
    <div class="icon">
      <Icon :name="props.icon" />
    </div>
    <div class="num">
      {{ props.num }}
    </div>
    <div class="text">
      {{ props.str }}
    </div>
  </div>
</template>
<script setup lang="ts">
type TProps = {
  num: number;
  str: string;
  icon: string;
};

const props = defineProps<TProps>();
</script>
<style lang="scss" scoped>
.overview-card {
  @include box-shadow;
  background-color: white;
  padding: 12px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 180px;
  width: calc((100% - 64px) * 0.2);

  .icon {
    border-radius: 8px;
    padding: 8px;
    background-color: rgba($color-primary-400, 0.08);
    width: fit-content;

    .iconify {
      display: block;
      font-size: 20px;
      width: 20px;
      min-width: 20px;
      height: 20px;
      color: $color-primary-400;
    }
  }

  .num {
    font-size: 28px;
    font-weight: 600;
  }

  .text {
    margin-top: -12px;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
