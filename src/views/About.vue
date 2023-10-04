<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header/>
  <div>
    <h1>{{ $t("components.aboutPage") }}</h1>
    <p>{{ $t("components.aboutPageContent") }}</p>
  </div>
  <Footer/>
</template>
