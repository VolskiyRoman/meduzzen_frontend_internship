<template>
  <div>
    <h2>{{ $t("adminList.admins") }}</h2>
    <ul>
      <li v-for="adminId in admins" :key="adminId">
        {{ adminId }}
        <button @click="removeAdmin(adminId)" v-if="isOwner">
          {{ $t("adminList.remove") }}
        </button>
      </li>
    </ul>

    <div v-if="isOwner">
      <input v-model="newAdminEmail" type="email" id="newAdminEmail" />
      <button @click="addAdmin">{{ $t("adminList.add") }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axiosInstance from '@/api/api';
import { useStore } from 'vuex';
import { toast } from "vue3-toastify";

const props = defineProps(['companyId', 'company']);

const admins = ref([]);
const adminEmails = ref({});
const newAdminEmail = ref('');
const store = useStore();

const fetchAdmins = async () => {
  try {
    const response = await axiosInstance.get(`api/companies/${props.companyId}/get-admins`);
    admins.value = response.data.admins;

    await fetchAdminEmails(admins.value);
  } catch (error) {
    toast.error('Error fetching admins');
  }
};

const fetchAdminEmails = async (adminIds) => {
  try {
    const requests = adminIds.map(async (adminId) => {
      const response = await axiosInstance.get(`auth/users/${adminId}`);
      return { adminId, email: response.data.email };
    });

    const results = await Promise.all(requests);
    results.forEach((result) => {
      adminEmails.value[result.adminId] = result.email;
    });
  } catch (error) {
    toast.error('Error fetching admin emails');
  }
};

onMounted(() => {
  fetchAdmins();
});

const isOwner = computed(() => {
  const loggedInUserId = store.state.authModule.user.id;
  return loggedInUserId === props.company.owner;
});

const addAdmin = async () => {
  try {
    await axiosInstance.post(`api/companies/${props.companyId}/add-admin/`, {
      user_id: newAdminEmail.value,
    });

    await fetchAdmins();
    await fetchAdminEmails(admins.value);
    newAdminEmail.value = '';

    toast.success('Admin added successfully');
  } catch (error) {
    toast.error(error.response.data.detail);
  }
};

const removeAdmin = async (adminId) => {
  try {
    await axiosInstance.post(`api/companies/${props.companyId}/remove-admin/`, {
      user_id: adminId,
    });

    await fetchAdmins();

    admins.value = admins.value.filter((id) => id !== adminId);
    delete adminEmails.value[adminId];

    toast.success('Admin removed successfully');
  } catch (error) {
    toast.error('Error removing admin');
  }
};
</script>
