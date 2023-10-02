<template>
  <Header/>
  <div>
    <h1>List of Companies Page</h1>
  </div>
  <Footer/>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "ListOfCompanies",
  components: {Footer, Header},
};
</script>
