<template>
  <div>
    <h2>{{ $t("myRequestList") }}</h2>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="request in pendingRequests" :key="request.id">
        {{ request.status }} - {{ request.company }} - {{ request.user }}
        <button @click="cancelRequest(request.id)" class="btn btn-danger">{{ $t("actions.cancelRequest") }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/api';
import { toast } from 'vue3-toastify';

const requests = ref([]);
const loading = ref(true);

const fetchRequests = async () => {
  try {
    const response = await axiosInstance.get('/api/request/my-requests/');
    requests.value = response.data;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching requests:', error);
    loading.value = false;
  }
};

const pendingRequests = ref([]);

onMounted(async () => {
  await fetchRequests();
  updatePendingRequests();
});

const updatePendingRequests = () => {
  pendingRequests.value = requests.value.filter(request => request.status === 'pending');
};

const cancelRequest = async (requestId) => {
  try {
    await axiosInstance.post(`/api/request/${requestId}/cancel/`);
    await fetchRequests();
    updatePendingRequests();
    toast.success('Request canceled successfully');
  } catch (error) {
    console.error(`Error canceling request ${requestId}:`, error);
    toast.error(`Error canceling request ${requestId}: ${error.message}`);
  }
};
</script>