<script setup lang="ts">
import { RouterView } from "vue-router";
import { NConfigProvider, NDialogProvider, NLoadingBarProvider, NMessageProvider, dateZhCN, zhCN } from "naive-ui";
import type { GlobalThemeOverrides } from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: "#3b6ea8",
        primaryColorHover: "#477bb5",
        primaryColorPressed: "#315d8d",
        primaryColorSuppl: "#6f97c4",
    },
};
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <NLoadingBarProvider>
      <NDialogProvider>
        <NMessageProvider>
          <RouterView />
        </NMessageProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
