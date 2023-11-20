<template>
  <div v-if="quiz">
    <h1>{{ quiz.title }}</h1>
    <form @submit.prevent="submitQuiz">
      <div v-for="question in quiz.questions"
           :key="question.id">
        <h3>{{ question.question_text }}</h3>
        <div v-for="answer in question.answers"
             :key="answer.id">
          <label>
            <input
                type="checkbox"
                :value="answer.id"
                :checked="userAnswers[question.id]?.includes(answer.id)"
                @change="updateUserAnswers(question.id, answer.id)"
            />
            {{ answer.answer_text }}
          </label>
        </div>
      </div>
      <button type="submit">{{ $t("submitQuiz") }}</button>
    </form>
  </div>
  <div v-else>
    <p>{{ $t("loading") }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import axiosInstance from '@/api/api';
import { useRoute } from 'vue-router';
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify"

const router = useRouter()
const route = useRoute();
const quizId = ref(route.params.quizId);
const quiz = ref(null);
const userAnswers = reactive({});

const fetchQuiz = async () => {
  try {
    const response = await axiosInstance.get(`api/quizzes/${quizId.value}/`);
    quiz.value = response.data;
  } catch (error) {
    console.error('Error fetching quiz:', error);
  }
};

const updateUserAnswers = (questionId, answerId) => {
  if (!userAnswers[questionId]) {
    userAnswers[questionId] = [];
  }

  const index = userAnswers[questionId].indexOf(answerId);

  if (index === -1) {
    userAnswers[questionId].push(answerId);
  } else {
    userAnswers[questionId].splice(index, 1);
  }
};

const submitQuiz = async () => {
  try {
    const userInput = [];
    for (const questionId in userAnswers) {
      if (userAnswers.hasOwnProperty(questionId)) {
        const answerIds = userAnswers[questionId];
        userInput.push({ question: parseInt(questionId), answers: answerIds });
      }
    }

    await axiosInstance.post(`api/quizzes/${quizId.value}/complete/`, {
      user_input: userInput,
    });
    toast.success("Quiz completed successful")
    router.push('/companies');
  } catch (error) {
    toast.error("Error while completing quiz")
  }
};

onMounted(() => {
  fetchQuiz();
});
</script>

<style scoped>

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

form {
  margin-top: 20px;
}

h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input {
  margin-right: 8px;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

</style>
