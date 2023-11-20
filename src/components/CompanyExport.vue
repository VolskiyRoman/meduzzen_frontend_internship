<template>
  <div>
    <p>{{ $t("export.enter") }}</p>
    <input v-model="selectedUserId" />
    <button @click="exportUser">{{ $t("export.user") }}</button>
    <button @click="exportCompany">{{ $t("export.company") }}</button>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { exportData } from "@/services/export_data";

const { companyId } = defineProps(['companyId']);
const selectedUserId = ref('');

const exportCompany = async () => {
  await exportData(companyId, 'admin-export-global', 'company');
};

const exportUser = async () => {
  await exportData(companyId, 'admin-export-user', 'user', { user_id: selectedUserId.value });
};
</script>
