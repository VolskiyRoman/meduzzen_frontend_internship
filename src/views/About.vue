<script setup>
import {ref} from "vue";
import axiosInstance from "../api/api";
const apiResponse = ref(null);

axiosInstance.get('')
    .then(response => {
      apiResponse.value = response.data;
    })
    .catch(error => {
      console.error('API Error:', error);
    });
</script>

<template>
  <div>
    <h1>{{ $t("components.aboutPage") }}</h1>
    <p>{{ $t("projectDescription") }}</p>
  </div>
</template>
