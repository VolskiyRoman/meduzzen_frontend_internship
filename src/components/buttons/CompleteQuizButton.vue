<template>
  <button @click="completeQuiz(quizId)">{{ $t("completeQuiz") }}</button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const { quizId } = defineProps(['quizId']);
const router = useRouter();

const completeQuiz = (quizId) => {
  router.push({ path: `/complete-quiz/${quizId}` });
};

</script>
