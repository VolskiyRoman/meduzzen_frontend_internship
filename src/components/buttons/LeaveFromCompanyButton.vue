<template>
  <button type="button" class="btn btn-danger" @click="leaveCompany" v-if="isUserInCompany">
    {{ $t("leaveFromCompany") }}
  </button>
</template>

<script setup>
import axiosInstance from '@/api/api';
import {computed} from "vue";
import {useRouter} from "vue-router";

const props = defineProps(['company', 'loggedInUser']);
const router = useRouter();

const leaveCompany = async () => {
  try {
    await axiosInstance.post(`api/companies/leave-company/`, { company_id: props.company.id });
    await router.push({name: 'CompanyList'});
  } catch (error) {
    console.error('Error leaving company:', error);
  }
};

const isUserInCompany = computed(() => {
  return props.loggedInUser && props.company.members.includes(props.loggedInUser.id);
});
</script>
