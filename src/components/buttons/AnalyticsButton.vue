<template>
  <div>
    <label for="userIdInput">{{ $t("analyticButton.id") }}</label>
    <input v-model="userId"
           type="number"
           id="userIdInput" />
    <button class="btn btn-primary"
            @click="getUserAnalytics">{{ $t("analyticButton.user") }}</button>

    <button class="btn btn-primary"
            @click="getCompanyAnalytics">{{ $t("analyticButton.company") }}</button>

    <div v-if="analyticsData.length > 0">
      <h2>{{ $t("analyticButton.value") }}</h2>
      <div style="max-width: 900px">
      <AnalyticsGraph :x="xValues"
                      :y="yValues" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, defineProps } from 'vue';
import axiosInstance from "@/api/api";
import AnalyticsGraph from "@/components/AnalyticsGraph.vue";
import { toast } from "vue3-toastify"

const analyticsData = ref([]);
const xValues = ref([]);
const yValues = ref([]);
const userId = ref('');
const props = defineProps(['companyId']);

const getUserAnalytics = async () => {
  try {
    const response = await axiosInstance.post(`/api/companies/${props.companyId}/user-average-value/`, {
      user_id: userId.value
    });
    analyticsData.value = response.data;

    xValues.value = analyticsData.value.map(data => data.timestamp);
    yValues.value = analyticsData.value.map(data => data.score);
  } catch (error) {
    toast.error("Error getting user analytics")
  }
};

const getCompanyAnalytics = async () => {
  try {
    const response = await axiosInstance.get(`/api/companies/${props.companyId}/company-average-value/`);
    analyticsData.value = response.data;

    xValues.value = analyticsData.value.map(data => data.timestamp);
    yValues.value = analyticsData.value.map(data => data.score);
  } catch (error) {
    toast.error("Error getting company analytics")
  }
};
</script>
