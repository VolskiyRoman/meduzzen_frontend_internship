<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "About",
  components: {Footer, Header},
};
</script>

<template>
  <Header/>
  <div>
    <h1>About Page</h1>
    <p>This is the About page content.</p>
  </div>
  <Footer/>
</template>
