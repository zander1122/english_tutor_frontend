<script setup>
// Script setup 區塊的邏輯完全保持不變，因為它是成功的基礎
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const props = defineProps({
  quizIds: { type: Array, required: true }
});

const router = useRouter();
const quizzes = ref([]);
const score = ref(0);
const isLoading = ref(true);
const isFinished = ref(false);
const error = ref(null);

onMounted(async () => {
  if (!props.quizIds || props.quizIds.length === 0) {
    error.value = "錯誤：沒有提供有效的測驗題目ID。";
    isLoading.value = false;
    return;
  }
  try {
    isLoading.value = true;
    const response = await axios.post('/api/quizzes/batch', { ids: props.quizIds });
    quizzes.value = response.data.map(quiz => ({
      ...quiz,
      userAnswer: ''
    }));
    if (quizzes.value.length === 0) {
      throw new Error("所有題目 ID 均無效或未在資料庫中找到。");
    }
  } catch (err) {
    error.value = `載入測驗題目時出錯：${err.response?.data?.detail || err.message}`;
  } finally {
    isLoading.value = false;
  }
});

function selectAnswer(quiz, selectedOption) {
  quiz.userAnswer = selectedOption;
}

function submitQuiz() {
  const unansweredCount = quizzes.value.filter(q => !q.userAnswer).length;
  if (unansweredCount > 0) {
    if (!confirm(`您還有 ${unansweredCount} 題未作答，確定要提交嗎？`)) {
      return;
    }
  }
  let finalScore = 0;
  quizzes.value.forEach(quiz => {
    quiz.isSubmitted = true;
    if (quiz.userAnswer === quiz.answer) {
      finalScore++;
    }
  });
  score.value = finalScore;
  isFinished.value = true;
  window.scrollTo(0, 0);
}

function restartQuiz() {
  router.push('/');
}
</script>

<template>
  <div class="container py-5">
    <div v-if="isLoading">...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    
    <!-- 答題中 -->
    <div v-else-if="!isFinished" class="mx-auto" style="max-width: 800px;">
      <div class="text-center mb-5">
        <h2 class="fw-bolder">線上測驗</h2>
        <p class="fs-5 text-muted">共 {{ quizzes.length }} 道題目</p>
      </div>
      
      <div v-for="(quiz, index) in quizzes" :key="quiz.id" class="card shadow-sm mb-4 border-0">
        <div class="card-body p-4">
          <p class="fs-5 mb-0"><span class="badge bg-primary rounded-pill me-2">{{ index + 1 }}</span> {{ quiz.prompt }}</p>
          <hr class="my-3">
          <div v-if="quiz.type === 'vocabulary'" class="vstack gap-2">
            <button
              v-for="option in quiz.options" :key="option" type="button"
              class="btn btn-outline-secondary btn-lg w-100 text-start transition-all"
              :class="{ 'active text-white': quiz.userAnswer === option }"
              @click="selectAnswer(quiz, option)">
              {{ option }}
            </button>
          </div>
        </div>
      </div>
      <div class="d-grid mt-5">
        <button @click="submitQuiz" class="btn btn-primary btn-lg py-3 fs-4 fw-bold shadow">提交所有答案</button>
      </div>
    </div>

    <!-- 測驗結束 -->
    <div v-else-if="isFinished" class="mx-auto" style="max-width: 900px;">
        <div class="text-center p-5 mb-5 bg-white rounded-4 shadow">
            <i class="bi bi-award-fill text-warning" style="font-size: 5rem;"></i>
            <h2 class="display-3 fw-bolder text-body-emphasis mt-3">測驗完成！</h2>
            <p class="fs-2 my-3">
              您的成績: <span class="text-primary fw-bold">{{ score }} / {{ quizzes.length }}</span>
            </p>
        </div>
        
        <h4 class="mb-3 text-center fw-bold">答題詳情回顧</h4>
        <div class="accordion" id="quizResultAccordion">
          <div v-for="(quiz, index) in quizzes" :key="`result-${quiz.id}`" class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fs-5" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse-${quiz.id}`">
                <span class="fw-bold me-3">第 {{ index + 1 }} 題</span>
                <span class="text-truncate">{{ quiz.prompt }}</span>
                <span class="ms-auto">
                  <i v-if="quiz.userAnswer === quiz.answer" class="bi bi-check-circle-fill text-success"></i>
                  <i v-else class="bi bi-x-circle-fill text-danger"></i>
                </span>
              </button>
            </h2>
            <div :id="`collapse-${quiz.id}`" class="accordion-collapse collapse" data-bs-parent="#quizResultAccordion">
              <div class="accordion-body">
                <ul class="list-group list-group-flush">
                  <li v-for="option in quiz.options" :key="option" 
                      class="list-group-item d-flex justify-content-between align-items-center p-3 fs-5">
                    <span>{{ option }}</span>
                    <div>
                      <span v-if="option === quiz.answer" class="badge text-bg-success">正確答案</span>
                      <span v-if="option === quiz.userAnswer && option !== quiz.answer" class="badge text-bg-danger">您的選擇</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
          <button @click="restartQuiz" class="btn btn-lg btn-outline-primary"><i class="bi bi-arrow-repeat me-2"></i>回到首頁</button>
        </div>
    </div>
  </div>
</template>

<style scoped>
/* 讓按鈕的 class 變化有過渡動畫 */
.btn {
  transition: all 0.2s ease-in-out;
}
.text-truncate {
  max-width: 85%;
  display: inline-block;
}
/* 美化手風琴的樣式 */
.accordion-button:not(.collapsed) {
  background-color: #e9ecef;
  box-shadow: inset 0 -1px 0 rgba(0,0,0,.125);
}
</style>