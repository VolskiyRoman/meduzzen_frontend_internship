<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {Footer, Header},
};
</script>


<template>
  <Header/>
  <div>
    <h1>{{ $t('components.home') }}</h1>
  </div>
  <Footer/>
</template>

