<template>
  <div>
    <h2> {{ $t("myInviteList") }} </h2>
    <div v-for="invite in pendingInvites" :key="invite.id">
      <p>
        Invite id: {{ invite.id }}<br>
        Company Id: {{ invite.company }}<br>
        <button @click="acceptInvite(invite.id)" class="btn btn-success">{{ $t("actions.accept") }}</button>
        <button @click="declineInvite(invite.id)" class="btn btn-danger">{{ $t("actions.decline") }}</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/api';
import { toast } from "vue3-toastify";

const pendingInvites = ref([]);

const fetchPendingInvites = async () => {
  try {
    const response = await axiosInstance.get('/api/invite/my-invites/');
    pendingInvites.value = response.data.filter(invite => invite.status === 'pending');
  } catch (error) {
    console.error('An error occurred while fetching invites:', error);
  }
};

const acceptInvite = async (inviteId) => {
  try {
    await axiosInstance.post(`/api/invite/${inviteId}/accept/`);
    await fetchPendingInvites();
    toast.success('Invite accepted successfully');
  } catch (error) {
    console.error(`An error occurred while accepting invite ${inviteId}:`, error);
    toast.error('Error accepting invite');
  }
};

const declineInvite = async (inviteId) => {
  try {
    await axiosInstance.post(`/api/invite/${inviteId}/decline/`);
    await fetchPendingInvites();
    toast.success('Invite declined successfully');
  } catch (error) {
    console.error(`An error occurred while declining invite ${inviteId}:`, error);
    toast.error('Error declining invite');
  }
};

onMounted(fetchPendingInvites);
</script>
