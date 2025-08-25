<template>
  <div class="sidebar" :class="{ isExpanded: isExpanded }">
    <div v-if="isExpanded" class="search-bar">
      <div class="search-icon">
        <Icon name="mdi:magnify" />
      </div>
      <input v-model="searchString" />
    </div>
    <div class="main-section">
      <AppSidebarItem
        v-for="(menu, index) in sidebarStore.sidebarData"
        :key="index"
        :item="menu"
        :is-sidebar-expanded="isExpanded"
        @expand="handleItemExpand"
      />
    </div>
    <div @click="() => (isExpanded = !isExpanded)" class="expand-button">
      <Icon
        :name="
          isExpanded ? 'mdi:chevron-double-left' : 'mdi:chevron-double-right'
        "
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSidebarStore } from "~/stores/sidebar";
import type { TSidebarItemExpandPayload } from "./sidebar/item.vue";

const sidebarStore = useSidebarStore();

const handleItemExpand = ({ id, state }: TSidebarItemExpandPayload) => {
  sidebarStore.expandItem(id, state, sidebarStore.sidebarData);
};

const searchString = ref("");
const debouncedSearch = useDebounceFn(sidebarStore.searchNode, 500);
watch(searchString, (newVal) => {
  debouncedSearch(newVal);
});

const isExpanded = ref(true);
</script>
<style lang="scss" scoped>
.sidebar {
  .search-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    .search-icon {
      display: flex;
      align-items: center;
      width: 32px;
      height: calc(100% - 2px);
      justify-content: center;
      background-color: $color-gray-200;
      border: 1px solid $color-gray-300;
      border-right: 0px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    input {
      padding: 6px;
      flex: 1;
      outline: none;
      border: 1px solid $color-gray-300;
      border-radius: 4px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      &:focus,
      &:hover {
        border: 1px solid $color-primary-500;
      }
    }
  }

  .main-section {
    @include custom-scrollbar;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .expand-button {
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 200ms;

    &:hover {
      background-color: $color-primary-50;
      color: $color-primary-500;
    }
  }

  display: flex;
  gap: 4px;
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
