import { defineStore } from "pinia";

export type TSidebarItem = {
  id: number;
  name: string;
  isExpanded?: boolean;
  children?: TSidebarItem[];
  link?: string;
};

export const useSidebarStore = defineStore("sidebar", () => {
  const sidebarData = ref<TSidebarItem[]>([
    {
      id: 1,
      name: "menu 1",
      isExpanded: false,
      children: [
        {
          id: 2,
          name: "menu 1.1",
          isExpanded: false,
          children: [
            {
              id: 3,
              name: "menu 1.1.1",
              link: "",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "menu 2",
      isExpanded: false,
      children: [
        {
          id: 5,
          name: "menu 2.1",
          link: "",
        },
      ],
    },
  ]);

  const expandItem = (
    id: number,
    state: boolean,
    items: TSidebarItem[] = sidebarData.value,
  ): boolean => {
    for (const item of items) {
      if (item.id === id) {
        item.isExpanded = state;
        return true;
      }
      if (item.children && expandItem(id, state, item.children)) {
        return true;
      }
    }
    return false;
  };

  return {
    sidebarData,
    expandItem,
  };
});
