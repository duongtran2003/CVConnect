<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#38b2ac" />
    <UApp :toaster="toasterConfig">
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { UApp } from "#components";
import type { ToasterProps } from "@nuxt/ui";
useHead({
  titleTemplate: (title) => {
    return title ? `${title} - CVConnect` : "CVConnect";
  },
});
const toasterConfig: ToasterProps = {
  position: "top-right",
  progress: false,
};
</script>
