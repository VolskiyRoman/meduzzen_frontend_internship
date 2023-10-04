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
            <router-link v-for="link in navLinks" :key="link.name" :to="{ name: link.routeName }" class="nav-link">{{ $t(link.translationKey) }}</router-link>
            <a class="nav-link" @click="changeLang('en')"><flag iso="us"></flag></a>
            <a class="nav-link" @click="changeLang('ua')"><flag iso="ua"></flag></a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { setLanguage } from "@/i18n/index";

export default {
  name: "Header",
  data() {
    return {
      navLinks: [
        { name: "About", routeName: "About", translationKey: "navbar.about" },
        { name: "UserProfile", routeName: "UserProfile", translationKey: "navbar.userProfile" },
        { name: "CompanyProfile", routeName: "CompanyProfile", translationKey: "navbar.companyProfile" },
        { name: "SignUp", routeName: "SignUp", translationKey: "navbar.signUp" },
        { name: "LogIn", routeName: "LogIn", translationKey: "navbar.logIn" },
        { name: "UserList", routeName: "UserList", translationKey: "navbar.users" },
        { name: "CompanyList", routeName: "CompanyList", translationKey: "navbar.companies" }
      ]
    };
  },
  methods: {
    changeLang(locale) {
      setLanguage(locale);
    }
  }
};
</script>
