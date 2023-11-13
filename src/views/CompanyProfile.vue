<template>
  <div>
    <h1>{{ company.name }}</h1>
    <p>{{ company.description }}</p>
    <p>Owner: {{ ownerEmail }}</p>
    <h2>Members:</h2>
    <ul>
      <li v-for="memberId in company.members" :key="memberId">{{ memberEmails[memberId] }}</li>
    </ul>

    <button type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal">Update this company</button>

    <CompanyModal modalTitle="Update company" submitButtonText="Update" @companyUpdate="updateCompany"  />

    <button v-if="isOwner"
            type="button"
            class="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteConfirmationModal">
      Delete Company
    </button>

    <div class="modal fade" id="deleteConfirmationModal"
         tabindex="-1"
         aria-labelledby="deleteConfirmationModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteConfirmationModalLabel">Are you sure you want to delete the company?</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger"
                    @click="deleteCompany"
                    v-if="isOwner"
                    data-bs-dismiss="modal">Delete</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axiosInstance from '@/api/api';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import CompanyModal from "@/components/modals/CompanyModal.vue";

const company = ref({});
const ownerEmail = ref('');
const memberEmails = ref({});
const loading = ref(true);
const store = useStore();
const router = useRouter();
const companyId = router.currentRoute.value.params.id;

const fetchCompany = async () => {
  try {
    const response = await axiosInstance.get(`api/companies/${companyId}`);
    company.value = response.data;

    await fetchOwnerEmail(company.value.owner);

    await fetchMemberEmails(company.value.members);

    loading.value = false;
  } catch (error) {
    console.error('Error fetching company:', error);
    loading.value = false;
  }
};

const fetchOwnerEmail = async (ownerId) => {
  try {
    const response = await axiosInstance.get(`auth/users/${ownerId}`);
    ownerEmail.value = response.data.email;
  } catch (error) {
    console.error('Error fetching owner email:', error);
  }
};

const fetchMemberEmails = async (memberIds) => {
  try {
    const requests = memberIds.map(async (memberId) => {
      const response = await axiosInstance.get(`auth/users/${memberId}`);
      return { memberId, email: response.data.email };
    });

    const results = await Promise.all(requests);
    results.forEach((result) => {
      memberEmails.value[result.memberId] = result.email;
    });
  } catch (error) {
    console.error('Error fetching member emails:', error);
  }
};

onMounted(() => {
  fetchCompany();
});

const isOwner = computed(() => {
  const loggedInUserId = store.state.authModule.user.id;
  return loggedInUserId === company.value.owner;
});

const deleteCompany = async () => {
  try {
    await axiosInstance.delete(`api/companies/${companyId}`);
    router.push({ name: 'MyCompanies' });
  } catch (error) {
    console.error('Error deleting company:', error);
  }
};

const updateCompany = async (newCompanyValue) => {
  const postRequestData = {
    name: newCompanyValue.name,
    description: newCompanyValue.description,
    is_hidden: newCompanyValue.is_hidden,
  };

  axiosInstance.patch(`api/companies/${companyId}/`, postRequestData)
      .then(
          fetchCompany()
      )
      .catch(error => {
        console.error('Error creating company:', error);
      });

}
</script>
