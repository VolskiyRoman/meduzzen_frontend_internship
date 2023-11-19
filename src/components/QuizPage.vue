<template>
  <div>
    <h1 v-if="quiz">{{ quiz.title }}</h1>
    <p v-if="quiz">{{ quiz.description }}</p>

    <ul v-if="quiz">
      <li v-for="question in quiz.questions"
          :key="question.id">
        <h3>{{ question.question_text }}</h3>
        <ul>
          <li v-for="answer in question.answers" :key="answer.id">
            {{ answer.answer_text }}
          </li>
        </ul>
        <button @click="removeQuestion(question.id)">{{ $t("quizPage.remove") }}</button>
      </li>
    </ul>

    <form @submit.prevent="addQuestion">
      <h2>{{ $t("quizPage.add") }}</h2>
      <label for="questionText">{{ $t("quizPage.text") }}</label>
      <input v-model="newQuestionText"
             type="text"
             id="questionText" required>

      <div v-for="(answer, index) in answers"
           :key="index">
        <label :for="'answer' + (index + 1)">{{ $t("quizModal.answer") }} {{ index + 1 }}:</label>
        <input v-model="answer.answer_text"
               :id="'answer' + (index + 1)"
               type="text" required>
        <label class="answer-label">
          <input v-model="answer.is_correct" type="checkbox">
          {{ $t("quizPage.correct") }}
        </label>
        <button type="button"
                @click="removeAnswer(index)"
                v-if="answers.length > 1">{{ $t("quizPage.remove") }}</button>
      </div>

      <button type="button"
              @click="addAnswer">{{ $t("quizModal.addAnswer") }}</button>
      <button type="submit">{{ $t("quizModal.addQuestion") }}</button>

      <button type="button"
              @click="clearForm">{{ $t("quizPage.clear") }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/api';
import { useRoute } from 'vue-router';
import { toast } from "vue3-toastify";

const quiz = ref({});
const quizId = useRoute().params.quizId;
const newQuestionText = ref('');
const answers = ref([{ answer_text: '', is_correct: false }]);

const fetchQuiz = async () => {
  try {
    const response = await axiosInstance.get(`api/quizzes/${quizId}`);
    quiz.value = response.data;
  } catch (error) {
    console.error('Error fetching quiz:', error);
  }
};

const addAnswer = () => {
  answers.value.push({ answer_text: '', is_correct: false });
};

const removeAnswer = (index) => {
  answers.value.splice(index, 1);
};

const addQuestion = async () => {
  try {
    const response = await axiosInstance.post(`api/quizzes/${quizId}/add-question/`, {
      question_text: newQuestionText.value,
      answers: answers.value,
    });
    fetchQuiz();
    clearForm();
    toast.success('Question added successfully');
  } catch (error) {
    console.error('Error adding question:', error);
    toast.error('Failed to add question');
  }
};

const removeQuestion = async (questionId) => {
  try {
    const response = await axiosInstance.post(`api/quizzes/${quizId}/delete-question/`, {
      question_id: questionId,
    });
    fetchQuiz();
    toast.success('Question removed successfully');
  } catch (error) {
    console.error('Error removing question:', error);
    toast.error('Failed to remove question');
  }
};

const clearForm = () => {
  newQuestionText.value = '';
  answers.value = [{ answer_text: '', is_correct: false }];
};

onMounted(() => {
  fetchQuiz();
});
</script>


<style scoped>
h1, h2, h3 {
  color: #333;
}

p {
  margin-bottom: 15px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  margin-bottom: 10px;
  padding: 8px;
  width: 70%;
}

button {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  border: none;
}

button:hover {
  background-color: #2980b9;
}

.answer-label{
  display: flex;
  flex-direction: row;
  width: 100px;
  justify-content: space-around;
  align-items: center;
}
</style>
