<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { NButton, NCard, NInput, useMessage } from "naive-ui";
import { useI18n } from "vue-i18n";
import req from "@/utils/req";

const router = useRouter();
const message = useMessage();
const { t } = useI18n();
const loading = ref(false);

const form = reactive({
    username: "",
    email: "",
    password: "",
});

const handleInit = async () => {
    if (loading.value) {
        return;
    }

    const username = form.username.trim();
    const email = form.email.trim();
    const password = form.password.trim();

    if (!username || !email || !password) {
        message.error(t("init.fill.all"));
        return;
    }

    loading.value = true;
    try {
        const res = await req.post("/api/init_user", { username, email, password });
        if (res.data?.code !== 200) {
            message.error(t(res.data?.msg || "init.request.failed"));
            return;
        }
        message.success(t(res.data?.msg || "init.success"));
        window.setTimeout(() => {
            router.push("/user/login");
        }, 1200);
    } catch {
        message.error(t("init.request.failed"));
    } finally {
        loading.value = false;
    }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-6 py-10">
    <div class="w-full max-w-[400px]">
      <div class="mb-6 text-center">
        <div class="text-[30px] font-semibold tracking-[-0.02em] text-slate-900">初始化管理员</div>
        <p class="mt-2 text-sm leading-6 text-slate-500">首次启动时创建系统管理员账号。</p>
      </div>
      <NCard :bordered="false" class="rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
        <div class="space-y-5">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">用户名</label>
            <NInput v-model:value="form.username" size="large" placeholder="请输入用户名" @keyup.enter="handleInit" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">邮箱</label>
            <NInput v-model:value="form.email" size="large" placeholder="请输入邮箱" @keyup.enter="handleInit" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">密码</label>
            <NInput v-model:value="form.password" size="large" type="password" show-password-on="click" placeholder="请输入密码" @keyup.enter="handleInit" />
          </div>
          <NButton type="primary" size="large" block :loading="loading" @click="handleInit">初始化系统</NButton>
        </div>
      </NCard>
    </div>
  </div>
</template>
