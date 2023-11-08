<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>