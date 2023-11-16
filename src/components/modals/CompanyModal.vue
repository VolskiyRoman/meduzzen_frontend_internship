<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ modalTitle }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="companyUpdate">
            <div class="mb-3">
              <label for="company-name" class="col-form-label">Name:</label>
              <input v-model="companyData.name" id="company-name" type="text" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="company-description" class="col-form-label">Description:</label>
              <textarea v-model="companyData.description" id="company-description" class="form-control" required></textarea>
            </div>
            <div class="mb-3 form-check">
              <input v-model="companyData.is_hidden" class="form-check-input" id="company-isHidden" type="checkbox" :value="true" />
              <label class="form-check-label" for="company-isHidden">Is Hidden</label>
            </div>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">{{ submitButtonText }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, defineEmits} from 'vue';

defineProps(['modalTitle', 'submitButtonText']);
const emit = defineEmits();

const companyData = ref({
  name: '',
  description: '',
  is_hidden: false,
});


const companyUpdate = async () => {
  try {
    emit('companyUpdate', companyData.value);
    resetForm()
  } catch (error) {
    console.error('Something went wrong:', error);
  }
};

const resetForm = () => {
  companyData.value = { name: '', description: '', is_hidden: false };
};

</script>
