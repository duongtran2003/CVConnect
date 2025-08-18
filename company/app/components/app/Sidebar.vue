<template>
  <div class="sidebar" :class="{ isExpanded: isExpanded }">
    <AppSidebarItem
      v-for="(menu, index) in sidebarStore.sidebarData"
      :key="index"
      v-bind="menu"
      @expand="handleItemExpand"
    />
  </div>
</template>
<script setup lang="ts">
import { useSidebarStore } from "~/stores/sidebar";
import type { TSidebarItemExpandPayload } from "./sidebar/Item.vue";

const sidebarStore = useSidebarStore();

const handleItemExpand = ({ id, state }: TSidebarItemExpandPayload) => {
  sidebarStore.expandItem(id, state, sidebarStore.sidebarData);
};

const isExpanded = ref(true);
</script>
<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 40px;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 8px;

  &.isExpanded {
    width: 240px;
  }
}
</style>
