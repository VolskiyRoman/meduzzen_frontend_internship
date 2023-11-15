<template>
  <div class="shown">
    <div id="exampleModal" class="shown-content" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <form @submit.prevent="submitForm">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">User Invite</h1>
            </div>
            <div class="modal-body">
              <div v-for="company in userCompanies" :key="company.id">
                <div class="form-check">
                  <input type="radio" :id="'companyRadio' + company.id" :value="company.id" v-model="selectedCompany">
                  <label class="form-check-label" :for="'companyRadio' + company.id">{{ company.name }}</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, defineEmits, defineProps } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";
import axiosInstance from "@/api/api";

const props = defineProps(['user']);
const emit = defineEmits();
const store = useStore();
const userCompanies = computed(() => store.state.authModule.user.companies);
const selectedCompany = ref(null);

onMounted(() => {
  store.dispatch('authModule/userCompanies');
});

const submitForm = async () => {
  try {
    const user = props.user;

    if (selectedCompany.value !== null) {
      const response = await axiosInstance.post('api/invite/', {
        company: selectedCompany.value,
        user: user.id,
      });
      toast.success("User invited to company")
      emit('onHidden');
    } else {
      toast.error("Error: Choose any company");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(`Error: ${error.response.data.message}`);
    } else {
      toast.error("Error: Something went wrong");
    }
  }
};

const closeModal = () => {
  emit('onHidden');
};
</script>

<style scoped>
.shown {
  top: -1px;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(144, 104, 104, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000 !important;
  backdrop-filter: blur(1px);
}

.shown-content {
  background-color: white;
  height: 300px;
  width: 300px;
  opacity: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
}
</style>
