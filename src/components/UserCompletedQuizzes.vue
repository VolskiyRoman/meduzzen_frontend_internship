<template>
  <div>
    <button @click="fetchUserCompletedQuizzes">{{ $t("userCompletedQuizzes.show") }}</button>
    <div v-if="completedQuizzes.length > 0">
      <h2>{{ $t("userCompletedQuizzes.completed") }}</h2>
      <ul>
        <li v-for="quiz in completedQuizzes" :key="quiz.quiz_name">
          <p>{{ quiz.quiz_name }}</p>
          <p>{{ quiz.time_created }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axiosInstance from '@/api/api';

const completedQuizzes = ref([]);

const fetchUserCompletedQuizzes = async () => {
  try {
    const response = await axiosInstance.get('/api/quizzes/current_user_completed_quizzes/');
    completedQuizzes.value = response.data;
  } catch (error) {
    console.error('Error fetching user completed quizzes:', error);
  }
};
</script>
