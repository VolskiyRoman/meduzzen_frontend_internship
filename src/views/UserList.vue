<template>
  <div>
    <h1>{{ $t('components.listOfUsersPage') }}</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <router-link :to="'/users/' + user.id">
          {{ user.email }}
        </router-link>
        <button
            type="button"
            class="btn btn-primary"
            @click="showModal(user)"
        >
          {{ $t("inviteThisUser") }}
        </button>
      </li>
    </ul>

    <div v-if="!isHidden">
      <InviteModal :user="selectedUser" @onHidden="closeModal"/>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import InviteModal from "@/components/modals/InviteModal.vue";

const isHidden = ref(true);
const selectedUser = ref(null);
const store = useStore();
const users = computed(() => store.state.userModule.users);

onMounted(() => {
  store.dispatch('userModule/fetchAndSetUsers');
});

const showModal = (user) => {
  isHidden.value = false;
  selectedUser.value = user;
};

const closeModal = () => {
  isHidden.value = true;
};
</script>
