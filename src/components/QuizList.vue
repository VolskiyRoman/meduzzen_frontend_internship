<template>
  <div>
    <h2>{{ $t("quizList") }}</h2>
    <ul>
      <li v-for="quiz in quizzes"
          :key="quiz.id">
        <router-link :to="{ name: 'QuizPage', params: { quizId: quiz.id } }">
          {{ quiz.title }}
        </router-link>
        <button
            @click="deleteQuiz(quiz.id)">{{ $t("quizModal.delete") }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/api';
import { useRoute, useRouter } from 'vue-router';

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

onMounted(() => {
  fetchQuizzes();
});
</script>
