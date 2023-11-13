<template>
  <div>
    <h1>{{ $t('components.listOfUsersPage') }}</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <router-link :to="'/users/' + user.id">
          {{ user.email }}
        </router-link>
        <InviteModal/>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import InviteModal from "@/components/modals/InviteModal.vue";


const store = useStore();
const users = computed(() => store.state.userModule.users);
const user_companies = computed(() => store.state.authModule.companyIds)

onMounted(() => {
  store.dispatch('userModule/fetchAndSetUsers');
  store.dispatch('authModule/userCompanies')
});
</script>
