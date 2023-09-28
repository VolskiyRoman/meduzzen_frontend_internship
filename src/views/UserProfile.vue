<template>
  <Header/>
  <div>
    <h1>User Profile Page</h1>
  </div>
  <Footer/>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "UserProfile",
  components: {Footer, Header},
};
</script>
