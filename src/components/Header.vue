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
            <router-link :to="{name:'About'}" class="nav-link">{{ $t('navbar.about') }}</router-link>
            <router-link :to="{name:'UserProfile'}" class="nav-link">{{ $t('navbar.userProfile') }}</router-link>
            <router-link :to="{name:'CompanyProfile'}" class="nav-link">{{ $t('navbar.companyProfile') }}</router-link>
            <router-link :to="{name:'SignUp'}" class="nav-link">{{ $t('navbar.signUp') }}</router-link>
            <router-link :to="{name:'LogIn'}" class="nav-link">{{ $t('navbar.logIn') }}</router-link>
            <router-link :to="{name:'UserList'}" class="nav-link">{{ $t('navbar.users') }}</router-link>
            <router-link :to="{name:'CompanyList'}" class="nav-link">{{ $t('navbar.companies') }}</router-link>
            <a class="nav-link" @click="changeLang('en')"><flag iso="us"></flag></a>
            <a class="nav-link" @click="changeLang('ua')"><flag iso="ua"></flag></a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import About from "@/views/About.vue";
import { setLanguage } from "@/i18n/index"

export default {
  name: "Header",
  computed: {
    About() {
      return About
    }
  },
  methods: {
    changeLang(locale) {
      setLanguage(locale);
    }
  }
};
</script>

<style scoped>
</style>