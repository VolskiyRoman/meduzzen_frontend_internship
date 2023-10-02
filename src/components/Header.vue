<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Quizes</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link :to="{name:'About'}" class="nav-link">About</router-link>
            <router-link :to="{name:'UserProfile'}" class="nav-link">User Profile</router-link>
            <router-link :to="{name:'CompanyProfile'}" class="nav-link">Company Profile</router-link>
            <router-link :to="{name:'SignUp'}" class="nav-link">Sign up</router-link>
            <router-link :to="{name:'LogIn'}" class="nav-link">Log in</router-link>
            <router-link :to="{name:'UserList'}" class="nav-link">Users</router-link>
            <router-link :to="{name:'CompanyList'}" class="nav-link">Companies</router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import About from "@/views/About.vue";

export default {
  name: "Header",
  computed: {
    About() {
      return About
    }
  },
};
</script>

<style scoped>
</style>