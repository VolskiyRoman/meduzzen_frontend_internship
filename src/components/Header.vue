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
            <router-link to="/about" class="nav-link">About</router-link>
            <router-link to="/profile/user" class="nav-link">User Profile</router-link>
            <router-link to="/profile/company" class="nav-link">Company Profile</router-link>
            <router-link to="/signup" class="nav-link">Sign up</router-link>
            <router-link to="/login" class="nav-link">Log in</router-link>
            <router-link to="/users" class="nav-link">Users</router-link>
            <router-link to="/companies" class="nav-link">Companies</router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
</style>