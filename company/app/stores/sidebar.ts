import { defineStore } from "pinia";

export type TSidebarItem = {
  id: number;
  name: string;
  isExpanded?: boolean;
  children?: TSidebarItem[];
  link?: string;
  icon: string;
};

export const useSidebarStore = defineStore("sidebar", () => {
  const sidebarData = ref<TSidebarItem[]>([
    {
      id: 1,
      name: "Trang chủ",
      isExpanded: false,
      link: "/dashboard",
      icon: "mdi:desktop-mac-dashboard",
    },
    {
      id: 2,
      name: "Hồ sơ ứng viên",
      isExpanded: false,
      icon: "mdi:account-file-text-outline",
      children: [
        {
          id: 3,
          name: "Danh sách",
          link: "/application/list",
          icon: "mdi:file-document",
        },
      ],
    },
    {
      id: 4,
      name: "Demo layer 1",
      isExpanded: false,
      icon: "mdi:desktop-mac-dashboard",
      children: [
        {
          id: 5,
          name: "Demo layer 2",
          isExpanded: false,
          icon: "mdi:desktop-mac-dashboard",
          children: [
            {
              id: 6,
              name: "Demo layer 3",
              isExpanded: false,
              icon: "mdi:desktop-mac-dashboard",
              link: "/demo-page",
            },
          ],
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

  const searchNode = (
    searchString: string,
    items: TSidebarItem[] = sidebarData.value,
    parents: TSidebarItem[] = [],
  ): TSidebarItem | null => {
    for (const item of items) {
      if (item.name.toLowerCase().includes(searchString.toLowerCase())) {
        parents.forEach((parent) => (parent.isExpanded = true));
        return item;
      }

      if (item.children) {
        const found = searchNode(searchString, item.children, [
          ...parents,
          item,
        ]);
        if (found) return found;
      }
    }
    return null;
  };

  return {
    sidebarData,
    expandItem,
    searchNode,
  };
});
