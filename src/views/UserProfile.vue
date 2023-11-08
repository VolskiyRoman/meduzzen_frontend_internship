<template>
  <ul v-if="user">
    <li>Email: {{ user.email }}</li>
    <li>First Name: {{ user.first_name || 'Not specified' }}</li>
    <li>Last Name: {{ user.last_name || 'Not specified' }}</li>
    <li>Bio: {{ user.bio || 'Not specified' }}</li>
    <li>Rating: {{ user.rating || 'Not specified' }}</li>
    <img :src="user.avatar" alt="User Avatar"/>
  </ul>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const userId = ref(null);

watch(
    () => router.currentRoute.value.params.userId,
    (newUserId) => {
      userId.value = newUserId;
    },
    { immediate: true }
);

const user = computed(() => {
  return store.state.userModule.users.find(user => user.id === parseInt(userId.value));
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin-bottom: 10px;
}

img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
