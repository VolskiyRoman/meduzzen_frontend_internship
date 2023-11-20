<template>
  <div>
    <h2>{{ $t("quizList") }}</h2>
    <ul>
      <li v-for="quiz in quizzes"
          :key="quiz.id">
        <template v-if="canEditQuiz()">
          <router-link :to="{ name: 'QuizPage', params: { quizId: quiz.id } }">
            {{ quiz.title }}
          </router-link>
          <button v-if="canDeleteQuiz(quiz)" @click="deleteQuiz(quiz.id)">
            {{ $t("quizModal.delete") }}
          </button>
          <CompleteQuizButton :quizId="quiz.id" />
        </template>
        <template v-else>
          {{ quiz.title }}
          <CompleteQuizButton v-if="isUserInCompany"
                              :quizId="quiz.id" />
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import axiosInstance from '@/api/api';
import { useRoute, useRouter } from 'vue-router';
import CompleteQuizButton from "@/components/buttons/CompleteQuizButton.vue";

const { userIsOwner, userIsAdmin, isUserInCompany } = defineProps(['userIsOwner', 'userIsAdmin', 'isUserInCompany']);

const quizzes = ref([]);
const companyId = useRoute().params.id;
const router = useRouter();

const fetchQuizzes = async () => {
  try {
    const response = await axiosInstance.get(`api/quizzes/${companyId}/company-quizzes`);
    quizzes.value = response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
  }
};

const deleteQuiz = async (quizId) => {
  try {
    await axiosInstance.delete(`api/quizzes/${quizId}`);
    fetchQuizzes();
  } catch (error) {
    console.error('Error deleting quiz:', error);
  }
};

const canEditQuiz = () => {
  return userIsOwner;
};

const canDeleteQuiz = () => {
  return userIsOwner;
};

onMounted(() => {
  fetchQuizzes();
});
</script>
