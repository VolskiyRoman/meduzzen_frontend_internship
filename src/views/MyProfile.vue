<template>
  <div class="container">
    <div v-if="currentUser">
      <img :src="currentUser.avatar" alt="User Avatar" v-if="currentUser.avatar" />
      <p v-for="(value, key) in currentUser" :key="key">
        <template v-if="key !== 'avatar' && key !== 'companies'">
          <b>{{ key }}:</b> {{ value }}
        </template>
      </p>
      <button @click="showEditForm" v-if="!editingUserInfo">{{ $t("myProfile.editUserProfile") }}</button>
      <Form @submit="updateUserInfo" :validation-schema="schema" v-if="editingUserInfo">
        <div class="form-group">
          <label for="first_name">{{ $t("myProfile.firstName") }}</label>
          <Field name="first_name" type="text" class="form-control" />
          <ErrorMessage name="first_name" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="last_name">{{ $t("myProfile.lastName") }}</label>
          <Field name="last_name" type="text" class="form-control" />
          <ErrorMessage name="last_name" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="bio">{{ $t("myProfile.bio") }}</label>
          <Field name="bio" type="text" class="form-control" />
          <ErrorMessage name="bio" class="error-feedback" />
        </div>
        <button type="submit">{{ $t("myProfile.userInfo") }}</button>
        <button @click="showEditForm">{{ $t("myProfile.cancel") }}</button>
      </Form>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div>
      <input type="file"
             ref="fileInput"
             accept="image/*" />
      <button @click="updateAvatar">{{ $t("myProfile.updateAvatar") }}</button>
    </div>

    <button type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal">
      {{ $t("myProfile.deleteProfile") }}
    </button>

    <div class="modal fade"
         id="exampleModal"
         tabindex="-1"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{{ $t("myProfile.deleteProfile") }}</h1>
            <button type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {{ $t("myProfile.deleteConfirmation") }}
          </div>
          <div class="modal-footer">
            <button type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
            >{{ $t("myProfile.cancel") }}</button>
            <button type="button"
                    class="btn btn-primary"
                    @click="deleteProfile"
                    data-bs-dismiss="modal"
            >{{ $t("myProfile.deleteProfile") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <my-invite-list></my-invite-list>
  <my-request-list></my-request-list>
</template>


<script setup>
import {onMounted, computed, ref} from "vue";
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import axiosInstance from "@/api/api";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import MyInviteList from "@/components/MyInviteList.vue";
import MyRequestList from "@/components/MyRequestList.vue";

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required!"),
  last_name: yup.string().required("Last name is required!"),
  bio: yup.string().required("Bio is required!"),
});

const router = useRouter();
const store = useStore();

const currentUser = computed(() => store.state.authModule.user);
const editingUserInfo = ref(false)

const fileInput = ref(null);

onMounted(() => {
  if (!currentUser.value) {
    router.push('/login');
  }
});

const showEditForm = () => {
  editingUserInfo.value = !editingUserInfo.value
}

const updateUserInfo = async (updatedData) => {
  try {
    const userId = currentUser.value.id;

    await axiosInstance.patch(`auth/users/${userId}/`, updatedData);
    await store.dispatch('authModule/updateUserInfo');

    editingUserInfo.value = false;

  } catch (error) {
    console.error("Помилка під час оновлення інформації користувача:", error);
  }
};

const updateAvatar = async () => {
  const file = fileInput.value.files[0];
  if (!file) {
    console.error('No file selected');
    return ;
  }

  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const userId = currentUser.value.id;
    await axiosInstance.patch(`auth/users/${userId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    fileInput.value.value = '';
    await store.dispatch('authModule/updateUserInfo');
  } catch (error) {
    console.error("Error updating user's avatar:", error);
  }
};

const deleteProfile = async () => {
  try {
    const userId = currentUser.value.id;

    await axiosInstance.delete(`user/delete/${userId}/`);

    await store.dispatch('authModule/logout');

    await router.push('/login');
  } catch (error) {
    console.error("Error deleting profile:", error);
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

.container img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 50%;
}
</style>