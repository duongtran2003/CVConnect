<template>
  <div v-if="!currentRole" class="spinner">
  </div>
  <div v-else-if="currentRole.code != 'CANDIDATE'" class="authenticated-layout">
    <AppSidebar />
    <div class="main-content">
      <AppHeader />
      <slot />
    </div>
  </div>
  <div v-else>
    <div class="public-layout">
      <div class="main-content">
        <AppPublicHeader />
        <div class="slot-wrapper">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PERMISSION_CHECK_TYPE } from "~/const/permission";
import type { TPermissionCheckType } from "~/types/permision";

const permittedRole: string = "ANY";
const permissionType: TPermissionCheckType = PERMISSION_CHECK_TYPE.MEMBER_TYPE;

useLayoutPermission(permissionType, permittedRole);

const authStore = useAuthStore();
const { currentRole } = storeToRefs(authStore);
</script>
<style lang="scss" scoped>
.spinner {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  justify-content: center;
}

.authenticated-layout {
  display: flex;
  min-height: 100vh;
  height: 100vh;
  background-color: $color-gray-100;

  .main-content {
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    padding: 16px 16px 16px 8px;
    flex: 1;
  }
}

.public-layout {
  display: flex;
  min-height: 100vh;
  height: 100vh;
  max-height: 100vh;
  background-color: $color-gray-100;
  width: 100%;
  overflow: hidden;

  :deep(.main-content) {
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;

    .slot-wrapper {
      padding: 48px 16px 16px 16px;
      flex: 1;
      min-height: 0;
      max-height: calc(100vh - 62px);
      overflow: hidden;
    }
  }
}
</style>
