<template>
  <div class="item">
    <NuxtLink v-if="props.link" class="name" :to="props.link" />
    <div
      v-else
      class="name"
      @click="handleExpand({ id: props.id, state: !props.isExpanded })"
    >
      {{ props.name }}
    </div>
    <div v-show="props.isExpanded" class="children">
      <AppSidebarItem
        v-for="(menu, index) in props.children"
        :key="index"
        v-bind="menu"
        @expand="handleExpand"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TSidebarItem } from '~/stores/sidebar';

type TProps = TSidebarItem;

export type TSidebarItemExpandPayload = {
  id: number;
  state: boolean;
};

const props = defineProps<TProps>();
const emit = defineEmits<{
  (e: "expand", payload: TSidebarItemExpandPayload): void;
}>();

const handleExpand = (payload: TSidebarItemExpandPayload) => {
  emit("expand", { id: payload.id, state: payload.state });
};
</script>
<style lang="scss" scoped>
@use "@/assets/colors.scss" as *;

.item {
  font-size: 14px;
  line-height: 20px;
  transition-duration: 200ms;

  .name {
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
      background-color: $background-light-hover;
    }
  }

  .children {
    padding-left: 8px;
  }
}
</style>
