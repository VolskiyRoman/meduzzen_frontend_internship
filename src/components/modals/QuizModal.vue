<template>
  <button class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#quizModal">
    {{ $t("quizModal.launch") }}
  </button>

  <div class="modal fade"
       id="quizModal"
       tabindex="-1"
       aria-labelledby="quizModalLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"
              id="quizModalLabel">{{ $t("quizModal.create") }}</h5>
          <button type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitQuiz">
            <div class="mb-3">
              <label for="quizTitle"
                     class="form-label">{{ $t("quizModal.title") }}</label>
              <input v-model="quizTitle" type="text"
                     class="form-control"
                     id="quizTitle" required>
            </div>

            <div class="mb-3">
              <label for="quizDescription"
                     class="form-label">{{ $t("quizModal.description") }}</label>
              <textarea v-model="quizDescription"
                        class="form-control"
                        id="quizDescription"
                        rows="3" required></textarea>
            </div>

            <div v-for="(question, qIndex) in questions"
                 :key="qIndex"
                 class="mb-4">
              <label class="form-label">{{ $t("quizModal.question") }} {{ qIndex + 1 }}:</label>
              <div class="d-flex justify-content-between align-items-center">
                <input v-model="question.question_text"
                       type="text"
                       class="form-control" required>
                <button @click="deleteQuestion(qIndex)"
                        type="button"
                        class="btn btn-danger ms-2">{{ $t("quizModal.delete") }}</button>
              </div>

              <div v-for="(answer, aIndex) in question.answers"
                   :key="aIndex"
                   class="mb-3">
                <label class="form-label">{{ $t("quizModal.answer") }} {{ aIndex + 1 }}:</label>
                <div class="d-flex justify-content-between align-items-center">
                  <input v-model="answer.answer_text"
                         type="text"
                         class="form-control" required>
                  <div class="form-check">
                    <input v-model="answer.is_correct"
                           class="form-check-input"
                           type="checkbox"
                           id="isCorrectCheck">
                    <label class="form-check-label"
                           for="isCorrectCheck">{{ $t("quizModal.isCorrect") }}</label>
                  </div>
                  <button @click="deleteAnswer(qIndex, aIndex)"
                          type="button"
                          class="btn btn-danger ms-2">{{ $t("quizModal.delete") }}</button>
                </div>
              </div>

              <button @click="addAnswer(qIndex)"
                      type="button"
                      class="btn btn-primary">{{ $t("quizModal.addAnswer") }}</button>
            </div>

            <button @click="addQuestion"
                    type="button"
                    class="btn btn-primary">{{ $t("quizModal.addQuestion") }}</button>

            <button type="submit"
                    class="btn btn-success mt-3"
                    data-bs-dismiss="modal">{{ $t("quizModal.addQuiz") }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from "vue-router";
import axiosInstance from "@/api/api";
import { toast } from "vue3-toastify";

const route = useRoute();
const quizTitle = ref('');
const quizDescription = ref('');
const questions = ref([{ question_text: '', answers: [{ answer_text: '', is_correct: false }] }]);

const showToast = (type, message) => {
  toast[type](message);
};

const submitQuiz = async () => {
  try {
    const quizData = {
      company: parseInt(route.params.id),
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
      frequency: 1,
    };
    await axiosInstance.post(`/api/quizzes/`, quizData);
    showToast('success', 'Quiz created successfully');
  } catch (error) {
    const errorMessage = 'Error creating quiz';
    showToast('error', errorMessage);
  }
};


const addQuestion = () => {
  questions.value.push({ question_text: '', answers: [{ answer_text: '', is_correct: false }] });
};

const deleteQuestion = (qIndex) => {
  questions.value.splice(qIndex, 1);
};

const addAnswer = (qIndex) => {
  questions.value[qIndex].answers.push({ answer_text: '', is_correct: false });
};

const deleteAnswer = (qIndex, aIndex) => {
  questions.value[qIndex].answers.splice(aIndex, 1);
};

</script>
