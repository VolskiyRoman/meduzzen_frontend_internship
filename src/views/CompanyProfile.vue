<template>
  <Header/>
  <div>
    <h1>{{ $t('components.companyProfilePage') }}</h1>
  </div>
  <Footer/>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "CompanyProfile",
  components: {Footer, Header},
};
</script>
