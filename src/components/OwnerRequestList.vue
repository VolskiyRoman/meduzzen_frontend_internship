<template>
  <div>
    <h2> {{ $t("ownerRequestList") }} </h2>
    <div v-for="request in pendingRequests" :key="request.id">
      <p>
        {{ $t("requestDetail.requestId") }}: {{ request.id }}<br>
        {{ $t("requestDetail.companyId") }}: {{ request.company }}<br>
        <button @click="approveRequest(request.id)"
                class="btn btn-success">{{ $t("actions.approve") }}</button>
        <button @click="rejectRequest(request.id)"
                class="btn btn-danger">{{ $t("actions.reject") }}</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/api';
import { toast } from "vue3-toastify";

const props = defineProps(['companyId']);

const pendingRequests = ref([]);

const fetchPendingRequests = async () => {
  try {
    const response = await axiosInstance.post('/api/request/owner-requests/', { company_id: props.companyId });
    pendingRequests.value = response.data.filter(request => request.status === 'pending');
  } catch (error) {
    console.error('An error occurred while fetching requests:', error);
  }
};

const approveRequest = async (requestId) => {
  try {
    await axiosInstance.post(`/api/request/${requestId}/approve/`);
    await fetchPendingRequests();
    toast.success('Request approved successfully');
  } catch (error) {
    console.error(`An error occurred while approving request ${requestId}:`, error);
    toast.error('Error approving request');
  }
};

const rejectRequest = async (requestId) => {
  try {
    await axiosInstance.post(`/api/request/${requestId}/reject/`);
    await fetchPendingRequests();
    toast.success('Request rejected successfully');
  } catch (error) {
    console.error(`An error occurred while rejecting request ${requestId}:`, error);
    toast.error('Error rejecting request');
  }
};

onMounted(fetchPendingRequests);
</script>
