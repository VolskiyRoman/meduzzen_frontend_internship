<template>
  <div>
    <h2> {{ $t("ownerInviteList") }} </h2>
    <div v-for="invite in pendingInvites" :key="invite.id">
      <p>
        Invite id: {{ invite.id }}<br>
        Company Id: {{ invite.company }}<br>
        <button @click="revokeInvite(invite.id)" class="btn btn-danger">{{ $t("actions.revoke") }}</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/api';
import { toast } from "vue3-toastify";
const props = defineProps(['companyId']);

const pendingInvites = ref([]);

const fetchPendingInvites = async () => {
  try {
    const response = await axiosInstance.post('/api/request/owner-invites/', { company_id: props.companyId });
    pendingInvites.value = response.data.filter(invite => invite.status === 'pending');
  } catch (error) {
    console.error('An error occurred while fetching invites:', error);
  }
};

const revokeInvite = async (inviteId) => {
  try {
    await axiosInstance.post(`/api/invite/${inviteId}/revoke/`);
    await fetchPendingInvites();
    toast.success('Invite revoked successfully');
  } catch (error) {
    console.error(`An error occurred while declining invite ${inviteId}:`, error);
    toast.error('Error declining invite');
  }
};

onMounted(fetchPendingInvites);
</script>
