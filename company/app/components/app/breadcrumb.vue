<template>
  <div class="breadcrumb">
    <template v-for="(item, index) of items" :key="index">
      <template v-if="item.url">
        <NuxtLink
          :to="item.url"
          class="item link"
          :class="{ current: index === items.length - 1 }"
        >
          <Icon v-if="item.icon" class="icon link" :name="item.icon" />
          <div v-if="item.name">{{ item.name }}</div>
        </NuxtLink>
      </template>
      <template v-if="!item.url">
        <div class="item" :class="{ current: index === items.length - 1 }">
          <Icon v-if="item.icon" class="icon" :name="item.icon" />
          <div v-if="item.name">{{ item.name }}</div>
        </div>
      </template>
      <Icon
        v-if="index != items.length - 1"
        name="mdi:chevron-right"
        class="sep"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
export type TBreadcumbItem = {
  name: string;
  icon?: string;
  url?: string;
};

const route = useRoute();
const sidebarStore = useSidebarStore();
const { sidebarData } = storeToRefs(sidebarStore);
const items = computed<TBreadcumbItem[]>(() => {
  const menuItems = sidebarData.value;
  const menuMap: Map<number, TSidebarItem> = new Map();
  let currentItem: TSidebarItem | undefined;

  const flatten = (items: TSidebarItem[], map: Map<number, TSidebarItem>) => {
    for (const item of items) {
      if (item.menuUrl && item.menuUrl === route.path) {
        currentItem = item;
      }
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
      if (item.children) {
        flatten(item.children, map);
      }
    }
  };

  const traverse = (targetId: number, breadcrumbs: TBreadcumbItem[]) => {
    const target = menuMap.get(targetId);
    if (!target) return;

    const newItem: TBreadcumbItem = {
      name: target.menuLabel,
      icon:
        target.menuIcon === "mdi:circle-medium" ? undefined : target.menuIcon,
      url: target.menuUrl,
    };
    console.log(target.menuIcon)

    breadcrumbs.unshift(newItem);
    if (target.parentId) {
      traverse(target.parentId, breadcrumbs);
    }
  };

  flatten(menuItems, menuMap);

  const breadcrumbItems: TBreadcumbItem[] = [];
  if (currentItem) {
    traverse(currentItem.id, breadcrumbItems);
  }

  breadcrumbItems.unshift({
    name: "",
    icon: "mdi:home",
    url: "",
  });

  return breadcrumbItems;
});
</script>
<style lang="scss" scoped>
.breadcrumb {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  .sep {
    display: block;
    font-size: 20px;
    color: $color-gray-500;
  }

  .item {
    font-size: 14px;
    line-height: 20px;
    color: $text-light;
    transition: color 200ms;
    font-weight: 700;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;

    .icon {
      display: block;
      font-size: 20px;
      color: $text-light;
      transition: color 200ms;

      &.link {
        text-decoration: underline;
        cursor: pointer;
        &:hover {
          color: $color-primary-500;
          font-weight: 700;
        }
      }
    }

    &.link {
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: $color-primary-500;
        font-weight: 700;
      }
    }

    &.current {
      color: $color-primary-500;
      font-weight: 700;
    }
  }
}
</style>
