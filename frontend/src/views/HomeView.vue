<script setup lang="ts">
import { computed, onMounted } from "vue";
import { NButton, NCard, NSpace, NTag } from "naive-ui";
import { useRouter } from "vue-router";
import { useSystemStore } from "@/stores/system";

const router = useRouter();
const systemStore = useSystemStore();

const status = computed(() => systemStore.status);

onMounted(() => {
    void systemStore.fetchStatus();
});
</script>

<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff,_#eef4ff_55%,_#e8eef8)] px-6 py-10 text-slate-900">
    <div class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
      <div class="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section class="space-y-6">
          <NTag type="info" size="small" round>Zest Web Starter</NTag>
          <div class="space-y-4">
            <h1 class="max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl">
              一个保留登录、权限和后台壳的通用 Web 项目启动框架。
            </h1>
            <p class="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              你可以直接基于 Zest 开始业务开发，把用户体系、后台框架、Docker 启动和 SQLite 持久化作为默认底座。
            </p>
          </div>
          <NSpace>
            <NButton type="primary" size="large" @click="router.push(status.initialized ? '/user/login' : '/user/init')">
              {{ status.initialized ? '进入登录' : '初始化系统' }}
            </NButton>
            <NButton size="large" @click="router.push('/dashboard/home')">进入后台</NButton>
          </NSpace>
        </section>

        <NCard :bordered="false" class="rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div class="space-y-5">
            <div>
              <div class="text-sm text-slate-500">框架状态</div>
              <div class="mt-2 text-2xl font-semibold text-slate-900">{{ status.app_name }}</div>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div class="rounded-2xl bg-slate-50 p-4">
                <div class="text-xs text-slate-500">系统初始化</div>
                <div class="mt-2 text-lg font-semibold">{{ status.initialized ? '已完成' : '未初始化' }}</div>
              </div>
              <div class="rounded-2xl bg-slate-50 p-4">
                <div class="text-xs text-slate-500">用户注册</div>
                <div class="mt-2 text-lg font-semibold">{{ status.allow_register ? '已开启' : '已关闭' }}</div>
              </div>
            </div>
            <div class="rounded-2xl border border-dashed border-slate-200 p-4 text-sm leading-6 text-slate-600">
              默认保留：Bun + Hono、SQLite + Drizzle、登录注册、后台壳、Docker、启动脚本。
            </div>
          </div>
        </NCard>
      </div>
    </div>
  </div>
</template>
