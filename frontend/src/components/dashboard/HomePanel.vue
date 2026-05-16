<script setup lang="ts">
import { computed, onMounted } from "vue";
import { NCard, NTag } from "naive-ui";
import { useSiteStore } from "@/stores/site";

const siteStore = useSiteStore();
const appInfo = computed(() => siteStore.appInfo);

onMounted(() => {
    void siteStore.fetchAppInfo();
});
</script>

<template>
  <div class="space-y-6 p-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-slate-900">后台概览</h2>
        <p class="mt-2 text-sm text-slate-500">这里保留给后续项目继续扩展的管理首页。</p>
      </div>
      <NTag type="info" round>v{{ appInfo.version }}</NTag>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <NCard :bordered="false" class="rounded-3xl">
        <div class="text-sm text-slate-500">框架名称</div>
        <div class="mt-2 text-2xl font-semibold text-slate-900">{{ appInfo.app_name }}</div>
      </NCard>
      <NCard :bordered="false" class="rounded-3xl">
        <div class="text-sm text-slate-500">用户总数</div>
        <div class="mt-2 text-2xl font-semibold text-slate-900">{{ appInfo.total_user_count }}</div>
      </NCard>
      <NCard :bordered="false" class="rounded-3xl">
        <div class="text-sm text-slate-500">构建版本</div>
        <div class="mt-2 text-2xl font-semibold text-slate-900">{{ appInfo.date }}</div>
      </NCard>
    </div>
  </div>
</template>
