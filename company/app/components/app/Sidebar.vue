<template>
  <div class="sidebar">
    <div class="main-sidebar" :class="{ isExpanded: isExpanded }">
      <div v-if="isExpanded" class="logo">
        <img src="/logo-horizontal.svg" />
      </div>
      <div v-else class="small-logo">
        <img src="/favicon-icon.svg" />
      </div>
      <div class="main-section">
        <AppSidebarItem
          v-for="menu in sidebarData"
          :key="menu.id"
          :item="menu"
          :is-sidebar-expanded="isExpanded"
          :is-first-level="true"
          @expand="handleItemExpand"
        />
      </div>
      <div class="expand-button" @click="() => (isExpanded = !isExpanded)">
        <Icon
          :name="
            isExpanded ? 'mdi:chevron-double-left' : 'mdi:chevron-double-right'
          "
        />
      </div>
    </div>
    <div class="role-selection" :class="{ isExpanded: isExpanded }">
      <div v-show="isAllRolesShow" class="role-list">
        <div
          v-for="role of roles"
          :key="role.id"
          :title="isExpanded ? '' : role.name"
          :class="{ isActive: isCurrentRole(role) }"
          class="role-item"
          @click="handleSetRole(role)"
        >
          <Icon class="role-icon" :name="roleIcon(role.code)" />
          <div v-if="isExpanded">{{ role.name }}</div>
        </div>
      </div>
      <div v-if="isAllRolesShow" class="divider"></div>
      <div
        class="role-switcher"
        @click="() => (isAllRolesShow = !isAllRolesShow)"
      >
        <div class="role-item" :title="isExpanded ? '' : 'Chuyển đổi vai trò'">
          <Icon class="role-icon" name="mdi:account-convert" />
          <div v-if="isExpanded">Chuyển đổi vai trò</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ROLE_ICON_DEFAULT, ROLE_ICON_MAP } from "~/const/role";
import type { TSidebarItemExpandPayload } from "./sidebar/item.vue";

const sidebarStore = useSidebarStore();
const { setMenus } = sidebarStore;
const { sidebarData } = storeToRefs(sidebarStore);
const authStore = useAuthStore();
const { setCurrentRole } = authStore;
const { currentRole, roles } = storeToRefs(authStore);
const { getMenus } = useAuth();

const isAllRolesShow = ref(false);

watch(currentRole, async (newRole) => {
  if (newRole) {
    console.log("get new role ne");
    const menus = await getMenus(newRole);
    if (menus) {
      setMenus(menus);
    }
  }
});

const isCurrentRole = computed(() => {
  return (role: TAccountRole) => {
    return role.id === currentRole.value?.id;
  };
});

const roleIcon = computed(() => {
  return (role: TRole | null | undefined) => {
    if (!role) {
      return ROLE_ICON_DEFAULT;
    }
    return ROLE_ICON_MAP[role];
  };
});

const handleSetRole = (role: TAccountRole) => {
  setCurrentRole(role);
  isAllRolesShow.value = false;
};

const handleItemExpand = ({ id, state }: TSidebarItemExpandPayload) => {
  sidebarStore.expandItem(id, state, sidebarStore.sidebarData);
};

const isExpanded = ref(true);
</script>
<style lang="scss" scoped>
.sidebar {
  padding: 12px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 4px;
  .main-sidebar {
    border-radius: 8px;
    flex: 1;
    margin-bottom: 18px;
    .logo {
      padding: 16px;
    }
    .small-logo {
      padding: 4px;
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
      border-radius: 999px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition-duration: 200ms;
      color: $text-light;
      font-size: 20px;
      background-color: white;
      border: 2px solid $color-gray-200;
      width: 34px;
      height: 34px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: -24px;

      &:hover {
        color: $color-primary-700;
        border: 2px solid $color-primary-200;
      }
    }

    display: flex;
    gap: 4px;
    flex-direction: column;
    width: 52px;
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 8px;

    &.isExpanded {
      width: 240px;
    }
  }

  .role-selection {
    border-radius: 8px;
    padding: 8px;
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 52px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .role-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .divider {
      display: block;
      height: 1px;
      width: 100%;
      background-color: $color-gray-200;
    }

    .role-item {
      font-size: 14px;
      line-height: 20px;
      color: $text-light;
      display: flex;
      flex-direction: row;
      gap: 16px;
      align-items: center;
      padding: 8px;
      cursor: pointer;
      border-radius: 8px;
      font-weight: 600;
      transition: background-color 200ms;

      &.isActive {
        background-color: rgba($color-primary-100, 0.6);
        color: $color-primary-400;
      }

      &:hover {
        background-color: rgba($color-primary-100, 0.6);
        color: $color-primary-400;
      }

      .role-icon {
        font-size: 20px;
      }
    }

    &.isExpanded {
      width: 240px;
    }
  }
}
</style>
