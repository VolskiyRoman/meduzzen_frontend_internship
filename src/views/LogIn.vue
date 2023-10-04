<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "UserAuthorization",
  components: {Footer, Header},
};
</script>


<template>
  <Header/>
  <div>
    <h1>{{ $t('components.userAuthorizationPage') }}</h1>
  </div>
  <Footer/>
</template>

