<script setup>
import {ref} from "vue";
import axiosInstance from "../../api/api";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
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
  <Header/>
  <div>{{ apiResponse }}</div>
  <div>
    <h1>{{ $t("components.aboutPage") }}</h1>
    <p>{{ $t("components.aboutPageContent") }}</p>
  </div>
  <Footer/>
</template>
