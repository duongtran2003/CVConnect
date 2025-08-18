<template>
  <div class="item" :class="{ expanded: props.item.isExpanded }">
    <NuxtLink v-if="props.item.link" class="name" :to="props.item.link">
      <div class="item-icon">
        <Icon :name="props.item.icon" />
      </div>
      <div class="item-name" v-if="isSidebarExpanded">
        {{ props.item.name }}
      </div>
    </NuxtLink>
    <div
      v-else
      class="name"
      :class="{ 'child-active': hasChildActive }"
      @click="
        handleExpand({ id: props.item.id, state: !props.item.isExpanded })
      "
    >
      <div class="item-icon">
        <Icon :name="props.item.icon" />
      </div>
      <div class="item-name" v-if="isSidebarExpanded">
        {{ props.item.name }}
      </div>
      <div class="item-expand-icon" v-if="isSidebarExpanded">
        <Icon
          :name="props.item.isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-up'"
        />
      </div>
    </div>
    <div
      v-show="props.item.isExpanded"
      v-if="isSidebarExpanded"
      class="children"
    >
      <AppSidebarItem
        v-for="(menu, index) in props.item.children"
        :key="index"
        :item="menu"
        @expand="handleExpand"
        :isSidebarExpanded="props.isSidebarExpanded"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TSidebarItem } from "~/stores/sidebar";

type TProps = {
  item: TSidebarItem;
  isSidebarExpanded: boolean;
};

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

const route = useRoute();
const hasActiveChild = (children?: TSidebarItem[]): boolean => {
  if (!children) return false;

  return children.some((child) => {
    if (child.link && route.path === child.link) {
      return true;
    }
    return hasActiveChild(child.children);
  });
};
const hasChildActive = computed(() => hasActiveChild(props.item.children));
</script>
<style lang="scss" scoped>
.item {
  font-size: 14px;
  line-height: 20px;
  border-radius: 4px;

  .name {
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: $text-light;
    transition-duration: 200ms;
    &.child-active {
      background-color: rgba($color-primary-100, 0.5);
    }

    .item-icon,
    .item-name,
    .item-expand-icon {
      display: flex;
      align-items: center;
    }

    .item-name {
      flex: 1;
    }

    &:hover,
    &.router-link-exact-active {
      background-color: $color-primary-100;
      color: $color-primary-900;
    }
  }

  .children {
    margin-top: 4px;
    padding-left: 8px;
  }

  &.expanded {
    background-color: $color-gray-100;
  }
}
</style>
