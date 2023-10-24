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
            <router-link v-if="loggedIn" v-for="link in AuthorizedNavLinks" :key="link.name" :to="{ name: link.routeName }" class="nav-link">{{ $t(link.translationKey) }}</router-link>
            <router-link v-if="!loggedIn" v-for="link in UnauthorizedNavLinks" :key="link.name" :to="{ name: link.routeName }" class="nav-link">{{ $t(link.translationKey) }}</router-link>
            <button type="button" class="btn btn-light" @click="logoutUser" v-if="loggedIn">{{ $t('navbar.logout') }}</button>
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
import { mapState } from "vuex";
import authModule from "@/store/modules/authModule";

export default {
  name: "Header",
  data() {
    return {
      AuthorizedNavLinks: [
        { name: "About", routeName: "About", translationKey: "navbar.about" },
        { name: "UserProfile", routeName: "UserProfile", translationKey: "navbar.userProfile" },
        { name: "CompanyProfile", routeName: "CompanyProfile", translationKey: "navbar.companyProfile" },
        { name: "UserList", routeName: "UserList", translationKey: "navbar.users" },
        { name: "CompanyList", routeName: "CompanyList", translationKey: "navbar.companies" }
      ],
      UnauthorizedNavLinks: [
        { name: "About", routeName: "About", translationKey: "navbar.about" },
        { name: "SignUp", routeName: "SignUp", translationKey: "navbar.signUp" },
        { name: "LogIn", routeName: "LogIn", translationKey: "navbar.logIn" },
      ]
    };
  },
  methods: {
    changeLang(locale) {
      setLanguage(locale);
    },
    logoutUser() {
      this.$router.push("/about");
      this.$store.dispatch('authModule/logout');
    }
  },
  computed: {
    ...mapState({
      loggedIn: (state) => state.authModule.status.loggedIn,
    }),
  },
};
</script>
