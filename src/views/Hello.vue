<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header/>
  <main>
    <section class="content-section">
      <h2>Start page</h2>
      <p>This is the welcome page of our Vue.js application. We're excited to have you on board!</p>
    </section>

    <section class="content-section">
      <h2>Contact Information</h2>
      <address>
        <p>If you have any questions or need assistance, feel free to reach out to us:</p>
        <ul>
          <li>Email: <a href="mailto:contact@example.com">romanvolskiy791@gmail.com</a></li>
        </ul>
      </address>
    </section>
  </main>
  <Footer/>
</template>

