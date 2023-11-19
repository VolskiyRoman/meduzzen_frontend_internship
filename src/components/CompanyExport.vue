<template>
  <div>
    <p>{{ $t("export.enter") }}</p>
    <input v-model="selectedUserId"/>
    <button @click="exportUser">{{ $t("export.user") }}</button>
    <button @click="exportCompany">{{ $t("export.company") }}</button>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import axiosInstance from "@/api/api";
import { toast } from "vue3-toastify";

const { companyId } = defineProps(['companyId']);
const selectedUserId = ref('');

const exportCompany = async () => {
  try {
    const response = await axiosInstance.get(`/api/companies/${companyId}/admin-export-global/`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `company_${companyId}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting company:', error);
  }
};

const exportUser = async () => {
  try {
    const response = await axiosInstance.post(`/api/companies/${companyId}/admin-export-user/`, {
      user_id: selectedUserId.value,
    }, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `user_${selectedUserId.value}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    toast.error("Invalid user id")
  }
};
</script>
