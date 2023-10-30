<template>
  <Header/>
  <div class="container">
    <p>
      <strong v-if="currentUser">Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong v-if="currentUser">Email:</strong>
      {{currentUser.email}}
    </p>
  </div>
  <Footer/>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "UserProfile",
  components: {Footer, Header},
  computed: {
    currentUser() {
      return this.$store.state.authModule.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>