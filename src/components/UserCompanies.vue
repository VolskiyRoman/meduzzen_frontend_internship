<template>
  <div>
    <button @click="getCurrentUserCompanies">{{ $t("userProfileList.show") }}</button>
    <div v-if="companies.length > 0">
      <h2>{{ $t("userProfileList.current") }}</h2>
      <ul>
        <li v-for="company in companies"
            :key="company.id">
          {{ company.name }}
          <button @click="leaveCompany(company.id)">{{ $t("userProfileList.leave") }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axiosInstance from "@/api/api";
import { toast } from "vue3-toastify";

const companies = ref([]);

const getCurrentUserCompanies = async () => {
  try {
    const response = await axiosInstance.get('/api/companies/current-user-companies');
    companies.value = response.data;
  } catch (error) {
    console.error('Error fetching current user companies:', error);
  }
};

const leaveCompany = async (companyId) => {
  try {
    const response = await axiosInstance.post('/api/companies/leave-company/', {
      company_id: companyId,
    });
    getCurrentUserCompanies();
  } catch (error) {
    toast.error("You cannot leave this company")
  }
};
</script>
