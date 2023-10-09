<script setup>
import {ref} from "vue";
import instance from "../../api/api";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
const apiResponse = ref(null);

instance.get('')
    .then(response => {
      apiResponse.value = JSON.stringify(response.data);
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
