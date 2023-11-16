<template>
  <button class="btn btn-primary" @click="handleRequest">{{ $t("actions.request") }}</button>
</template>

<script setup>
import axiosInstance from "@/api/api";
import { defineProps } from 'vue';
import { toast } from 'vue3-toastify';

const props = defineProps(['companyId']);

const handleRequest = async () => {
  try {
    const requestData = {
      company: props.companyId
    };

    const response = await axiosInstance.post('/api/request/', requestData);
    toast.success(`Request sent for company ${props.companyId}`);

  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data && error.response.data.user) {
      toast.error(error.response.data.user[0]);
    } else {
      toast.error(`Error sending request for company ${props.companyId}: ${error.message}`);
    }
  }
};
</script>