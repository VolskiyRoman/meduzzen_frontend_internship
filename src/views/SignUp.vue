<template>
  <Header/>
  <div>
    <h1>{{ $t('components.userRegistrationPage') }}</h1>
  </div>
  <Footer/>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "UserRegistration",
  components: {Footer, Header},
};
</script>
