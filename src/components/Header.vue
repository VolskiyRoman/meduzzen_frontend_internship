<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Quizes</a>
        <button class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link v-for="link in navLinksComputed"
                         :key="link.name"
                         :to="{ name: link.routeName }"
                         class="nav-link"
            >{{ $t(link.translationKey) }}</router-link>
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
import {loggedInLinks, loggedOutLinks} from "@/static/navLinksData";

export default {
  name: "Header",
  data() {
    return {
      navLinks: {
        loggedIn: loggedInLinks,
        loggedOut: loggedOutLinks
      }
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
    navLinksComputed() {
      return this.loggedIn ? this.navLinks.loggedIn: this.navLinks.loggedOut;
    }
  },
};
</script>
