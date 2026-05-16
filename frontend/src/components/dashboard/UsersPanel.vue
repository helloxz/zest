<script setup lang="ts">
import { h, onMounted, ref } from "vue";
import { NButton, NCard, NDataTable, useMessage } from "naive-ui";
import req from "@/utils/req";

const message = useMessage();
const rows = ref<any[]>([]);
const loading = ref(false);

const fetchUsers = async () => {
    loading.value = true;
    try {
        const res = await req.get("/api/admin/list_users");
        if (res.data?.code === 200) {
            rows.value = res.data.data || [];
        }
    } finally {
        loading.value = false;
    }
};

const resetPassword = async (id: number) => {
    const res = await req.post("/api/admin/reset_user_password", { id });
    if (res.data?.code !== 200) {
        message.error(res.data?.msg || "重置失败");
        return;
    }
    message.success(`新密码：${res.data.data.password}`);
};

const columns = [
    { title: "ID", key: "id", width: 80 },
    { title: "用户名", key: "username" },
    { title: "邮箱", key: "email" },
    { title: "角色", key: "role", width: 100 },
    { title: "状态", key: "status", width: 100 },
    { title: "注册 IP", key: "reg_ip" },
    {
        title: "操作",
        key: "actions",
        width: 160,
        render: (row: any) => row.role === "user"
            ? h(
                NButton,
                { size: "small", onClick: () => resetPassword(row.id) },
                { default: () => "重置密码" },
            )
            : "-",
    },
];

onMounted(() => {
    void fetchUsers();
});
</script>

<template>
  <div class="p-6">
    <NCard :bordered="false" class="rounded-3xl">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-slate-900">用户管理</h2>
          <p class="mt-1 text-sm text-slate-500">框架默认保留基础用户列表和密码重置能力。</p>
        </div>
        <NButton @click="fetchUsers">刷新</NButton>
      </div>
      <NDataTable :columns="columns" :data="rows" :loading="loading" />
    </NCard>
  </div>
</template>
