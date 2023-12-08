<template>
  <div>
    <h1>{{ company.name }}</h1>
    <p>{{ company.description }}</p>
    <p>{{ $t("companyProfile.owner") }} {{ ownerEmail }}</p>
    <h2>{{ $t("companyProfile.members") }}</h2>
    <ul>
      <li v-for="memberId in company.members" :key="memberId">
        {{ memberEmails[memberId] }} (ID: {{ memberId }})
        <span v-if="isOwner || isAdmin">{{ getLastQuizCompletionTime(memberId) }}</span>
      </li>
    </ul>

    <button type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            v-if="isOwner"
    >{{ $t("companyProfile.update") }}</button>

    <CompanyModal modalTitle="Update company" submitButtonText="Update" @companyUpdate="updateCompany" />

    <button v-if="isOwner"
            type="button"
            class="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteConfirmationModal">
      {{ $t("companyProfile.delete") }}
    </button>

    <div class="modal fade" id="deleteConfirmationModal"
         tabindex="-1"
         aria-labelledby="deleteConfirmationModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5"
                id="deleteConfirmationModalLabel">{{ $t("companyProfile.deleteConfirmation") }}</h1>
            <button type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
          </div>
          <div class="modal-footer">
            <button type="button"
                    class="btn btn-danger"
                    @click="deleteCompany"
                    v-if="isOwner"
                    data-bs-dismiss="modal">{{ $t("companyProfile.delete") }}</button>
          </div>
        </div>
      </div>
    </div>
    <leave-from-company-button
        v-if="isUserInCompany && !isOwner"
        :company="company"
        :loggedInUser="store.state.authModule.user" />

    <owner-invite-list v-if="isOwner"
                       :company-id="companyId" />
    <owner-request-list v-if="isOwner"
                        :company-id="companyId" />
    <AdminList :companyId="companyId"
               :company="company" />
    <QuizList
        v-if="isUserInCompany"
        :userIsOwner="isOwner"
        :userIsAdmin="isAdmin"
        :isUserInCompany="isUserInCompany"
    />
    <QuizModal v-if="isOwner || isAdmin" />
    <AnalyticsButton v-if="isOwner || isAdmin" :companyId="companyId" />
    <CompanyExport :companyId="companyId" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axiosInstance from '@/api/api';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import CompanyModal from "@/components/modals/CompanyModal.vue";
import LeaveFromCompanyButton from "@/components/buttons/LeaveFromCompanyButton.vue";
import OwnerInviteList from "@/components/OwnerInviteList.vue";
import OwnerRequestList from "@/components/OwnerRequestList.vue";
import AdminList from "@/components/AdminList.vue";
import QuizModal from "@/components/modals/QuizModal.vue";
import QuizList from "@/components/QuizList.vue";
import AnalyticsButton from "@/components/buttons/AnalyticsButton.vue";
import CompanyExport from "@/components/CompanyExport.vue";

const company = ref({});
const ownerEmail = ref('');
const memberEmails = ref({});
const memberLastQuizCompletionTimes = ref({});
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
    await fetchMemberLastQuizCompletionTimes(company.value.members);

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

const fetchMemberLastQuizCompletionTimes = async () => {
  try {
    const response = await axiosInstance.get(`/api/companies/${companyId}/user-last-time-completed/`);
    const userAnalyticsData = response.data;

    userAnalyticsData.forEach((userData) => {
      memberLastQuizCompletionTimes.value[userData.user_id] = userData.last_time_completed;
    });
  } catch (error) {
    console.error('Error fetching user analytics data:', error);
  }
};

const getLastQuizCompletionTime = (memberId) => {
  return memberLastQuizCompletionTimes.value[memberId] || 'N/A';
};

onMounted(() => {
  fetchCompany();
});

const isOwner = computed(() => {
  const loggedInUserId = store.state.authModule.user.id;
  return loggedInUserId === company.value.owner;
});

const isAdmin = computed(() => {
  const loggedInUserId = store.state.authModule.user.id;
  const companyAdmins = company.value.admins;

  return companyAdmins && companyAdmins.includes(loggedInUserId);
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
  const { name, description, is_hidden } = newCompanyValue;
  const postRequestData = { name, description, is_hidden };

  try {
    await axiosInstance.patch(`api/companies/${companyId}/`, postRequestData);
    fetchCompany();
  } catch (error) {
    console.error('Error updating company:', error);
  }
}

const isUserInCompany = computed(() => {
  return store.state.authModule.user &&
      company.value &&
      company.value.members &&
      company.value.members.includes(store.state.authModule.user.id);
});
</script>
