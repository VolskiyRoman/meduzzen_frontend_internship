<template>
  <!-- Button to open the modal -->
  <button @click="openModal" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#quizModal">
    Launch Quiz Modal
  </button>

  <!-- Modal -->
  <div class="modal fade" id="quizModal" tabindex="-1" aria-labelledby="quizModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal content -->
        <div class="modal-header">
          <h5 class="modal-title" id="quizModalLabel">Create a Quiz</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Quiz form -->
          <form @submit.prevent="submitQuizForm">
            <!-- Company selection (replace with your logic) -->
            <div class="mb-3">
              <label for="companySelect" class="form-label">Select Company:</label>
              <!-- Replace with your logic to fetch and display companies -->
              <select v-model="selectedCompany" class="form-select" id="companySelect">
                <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}</option>
              </select>
            </div>

            <!-- Quiz title and description -->
            <div class="mb-3">
              <label for="quizTitle" class="form-label">Quiz Title:</label>
              <input v-model="quizTitle" type="text" class="form-control" id="quizTitle" required>
            </div>

            <div class="mb-3">
              <label for="quizDescription" class="form-label">Quiz Description:</label>
              <textarea v-model="quizDescription" class="form-control" id="quizDescription" rows="3" required></textarea>
            </div>

            <!-- Questions and Answers (replace with your logic) -->
            <div v-for="(question, index) in questions" :key="index">
              <label class="form-label">Question {{ index + 1 }}:</label>
              <input v-model="question.question_text" type="text" class="form-control" required>

              <div v-for="(answer, aIndex) in question.answers" :key="aIndex" class="mb-3">
                <label class="form-label">Answer {{ aIndex + 1 }}:</label>
                <input v-model="answer.answer_text" type="text" class="form-control" required>
                <div class="form-check">
                  <input v-model="answer.is_correct" class="form-check-input" type="checkbox" id="isCorrectCheck">
                  <label class="form-check-label" for="isCorrectCheck">Is Correct Answer</label>
                </div>
              </div>
            </div>

            <!-- Add Question button -->
            <button @click="addQuestion" type="button" class="btn btn-primary">Add Question</button>

            <!-- Submit button -->
            <button type="submit" class="btn btn-success mt-3">Create Quiz</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const companies = [
  { id: 1, name: 'Company A' },
  { id: 2, name: 'Company B' },
  // Add more companies as needed
];

const selectedCompany = ref(null);
const quizTitle = ref('');
const quizDescription = ref('');
const questions = ref([{ question_text: '', answers: [{ answer_text: '', is_correct: false }] }]);

const submitQuizForm = () => {
  const quizData = {
    company: selectedCompany.value,
    title: quizTitle.value,
    description: quizDescription.value,
    questions: questions.value.map((question) => {
      return {
        question_text: question.question_text,
        answers: question.answers.map((answer) => {
          return {
            answer_text: answer.answer_text,
            is_correct: answer.is_correct,
          };
        }),
      };
    }),
  };

  // Log the quiz data (replace this with your logic to send the data to the backend)
  console.log('Quiz Data:', quizData);
};

const addQuestion = () => {
  questions.value.push({ question_text: '', answers: [{ answer_text: '', is_correct: false }] });
};
</script>
