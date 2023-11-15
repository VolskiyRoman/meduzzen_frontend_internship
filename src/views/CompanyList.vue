<template>
  <div>
    <h1>{{ $t('components.listOfCompaniesPage') }}</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="company in displayedCompanies" :key="company.id">
        <router-link :to="{ name: 'CompanyProfile', params: { id: company.id }}">
          <li>{{ company.name }}</li>
        </router-link>
        <request-button :companyId="company.id" />
      </div>
    </div>
    <button type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            v-if="currentPath === '/my-companies'"
            data-bs-target="#exampleModal">{{ $t("createNewCompany") }}</button>

    <CompanyModal modalTitle="New Company"
                  submitButtonText="Create Company"
                  @companyUpdate="handleCompanyCreated" />

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import CompanyModal from "@/components/modals/CompanyModal.vue";
import axiosInstance from "@/api/api";
import RequestButton from "@/components/buttons/RequestButton.vue";

const companies = ref([]);
const loading = ref(true);
const store = useStore();
const route = useRoute();
const router = useRouter();

const fetchCompanies = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    companies.value.push(...response.data.results);
    if (response.data.next) {
      await fetchCompanies(response.data.next);
    }

    loading.value = false;
  } catch (error) {
    console.error('Error fetching companies:', error);
    loading.value = false;
  }
};

onMounted(() => {
  fetchCompanies('api/companies');
});

const currentPath = computed(() => route.path);

const displayedCompanies = computed(() => {
  if (currentPath.value === '/my-companies') {
    const loggedInUserId = store.state.authModule.user.id;
    return companies.value.filter(company => company.owner === loggedInUserId);
  } else {
    return companies.value;
  }
});

const handleCompanyCreated = (newCompanyValue) => {
  const postRequestData = {
    name: newCompanyValue.name,
    description: newCompanyValue.description,
    is_hidden: newCompanyValue.is_hidden,
  };

  axiosInstance.post('api/companies/', postRequestData)
      .then(() => {
        companies.value = [];
        fetchCompanies('api/companies');
      })
      .catch(error => {
        console.error('Error creating company:', error);
      });
};
</script>
