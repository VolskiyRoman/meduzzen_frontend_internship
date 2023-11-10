<template>
  <div>
    <h1>{{ $t('components.listOfUsersPage') }}</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <router-link :to="'/users/' + user.id">
          {{ user.email }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const users = computed(() => store.state.userModule.users);

onMounted(() => {
  store.dispatch('userModule/fetchAndSetUsers');
});
</script>
