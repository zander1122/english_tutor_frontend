<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// 從 props 接收由路由傳入的 quizIds 陣列
const props = defineProps({
  quizIds: { type: Array, required: true }
});

const router = useRouter();

// --- 狀態管理：每個狀態都是獨立的 ---
const quizzes = ref([]); // 存放所有從後端獲取的原始題目資料
const score = ref(0);

// --- 流程控制 ---
const isLoading = ref(true);
const isFinished = ref(false); // 用於切換答題頁面和結果頁面
const error = ref(null);

// --- 生命週期鉤子：元件掛載時，一次性獲取所有題目資料 ---
onMounted(async () => {
  // 檢查是否有有效的 ID 傳入
  if (!props.quizIds || props.quizIds.length === 0) {
    error.value = "錯誤：沒有提供有效的測驗題目ID。";
    isLoading.value = false;
    return;
  }

  try {
    isLoading.value = true;
    // 使用批次 API 一次性獲取所有題目，效率最高
    const response = await axios.post('/api/quizzes/batch', { ids: props.quizIds });
    
    // 核心邏輯：在獲取資料後，為每一題動態新增一個 userAnswer 屬性
    // 這樣每一題的作答狀態都封裝在它自己的物件裡，完全獨立
    quizzes.value = response.data.map(quiz => ({
      ...quiz, // 保留所有從後端來的原始資料 (id, prompt, options, answer...)
      userAnswer: '' // 為每一題新增一個空的、獨立的 userAnswer 屬性
    }));

    // 如果後端返回空陣列，則拋出錯誤
    if (quizzes.value.length === 0) {
      throw new Error("所有題目 ID 均無效或未在資料庫中找到。");
    }
  } catch (err) {
    // 捕獲所有可能的錯誤
    error.value = `載入測驗題目時出錯：${err.response?.data?.detail || err.message}`;
    console.error("載入題目時發生錯誤:", err);
  } finally {
    // 無論成功或失敗，都結束載入狀態
    isLoading.value = false;
  }
});

// --- Methods ---

// 手動處理答案變更，取代 v-model 的複雜性
function selectAnswer(quiz, selectedOption) {
  // 直接修改對應 quiz 物件的 userAnswer 屬性
  quiz.userAnswer = selectedOption;
}

// 提交整個測驗
function submitQuiz() {
  const unansweredCount = quizzes.value.filter(q => !q.userAnswer).length;
  if (unansweredCount > 0) {
    if (!confirm(`您還有 ${unansweredCount} 題未作答，確定要提交嗎？`)) {
      return; // 如果使用者取消，則停止提交
    }
  }

  // 計算分數
  let finalScore = 0;
  quizzes.value.forEach(quiz => {
    // 在提交時，為每一題新增 isSubmitted 狀態，用於結果顯示
    quiz.isSubmitted = true;
    if (quiz.userAnswer === quiz.answer) {
      finalScore++;
    }
  });
  score.value = finalScore;

  // 切換到結果顯示模式
  isFinished.value = true;
  // 自動捲動到頁面頂部，方便使用者看到分數
  window.scrollTo(0, 0);
}

// 返回首頁
function restartQuiz() {
  router.push('/');
}
</script>

<template>
  <div class="container py-5">
    <!-- 狀態一：正在載入 -->
    <div v-if="isLoading" class="text-center p-5">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status"></div>
      <p class="mt-3 fs-5">正在從資料庫載入測驗題...</p>
    </div>
    
    <!-- 狀態二：發生錯誤 -->
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    
    <!-- 狀態三：答題中 (一次性顯示所有題目) -->
    <div v-else-if="!isFinished">
      <h2 class="mb-4 text-center">線上測驗 (共 {{ quizzes.length }} 題)</h2>
      <!-- 使用 v-for 一次性渲染所有題目卡片 -->
      <div v-for="(quiz, index) in quizzes" :key="quiz.id" class="card shadow-sm mb-4">
        <div class="card-header">
          <strong>第 {{ index + 1 }} 題</strong>
        </div>
        <div class="card-body">
          <p class="fs-5 mb-3">{{ quiz.prompt }}</p>
          <div v-if="quiz.type === 'vocabulary'" class="d-grid gap-2">
            <!-- 每個選項都是一個 button，通過 @click 手動更新狀態 -->
            <button
              v-for="option in quiz.options"
              :key="option"
              type="button"
              class="btn w-100 text-start p-3"
              :class="{
                'btn-primary': quiz.userAnswer === option, // 被選中的選項顯示為實心藍色
                'btn-outline-primary': quiz.userAnswer !== option // 未選中的是藍色外框
              }"
              @click="selectAnswer(quiz, option)"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>
      <!-- 提交按鈕放在所有題目下方 -->
      <div class="d-grid mt-4">
        <button @click="submitQuiz" class="btn btn-success btn-lg">全部提交，查看結果</button>
      </div>
    </div>

    <!-- 狀態四：測驗結束 - 結果回顧頁面 -->
    <div v-else-if="isFinished">
        <div class="text-center p-4 mb-4 bg-white rounded-3 shadow-sm">
            <h2 class="display-4 fw-bold">測驗完成！</h2>
            <p class="fs-3 my-2">
              您的最終成績是：
              <span class="text-primary fw-bold">{{ score }} / {{ quizzes.length }}</span>
            </p>
        </div>
        
        <h4 class="mb-3">答題詳情回顧：</h4>
        <div class="d-grid gap-4">
          <div v-for="quiz in quizzes" :key="`result-${quiz.id}`" class="card">
            <div class="card-body">
              <p class="fw-bold mb-2">{{ quiz.prompt }}</p>
              <!-- 根據 isSubmitted 和答案來決定顯示樣式 -->
              <div v-for="option in quiz.options" :key="option" 
                   class="p-2 rounded mb-1"
                   :class="{
                     'bg-success text-white': option === quiz.answer, // 正確答案永遠是綠底白字
                     'bg-danger text-white': option !== quiz.answer && option === quiz.userAnswer, // 您選的錯誤答案是紅底白字
                     'bg-light text-muted': option !== quiz.answer && option !== quiz.userAnswer // 其他未選的錯誤選項是淺灰底
                   }">
                {{ option }}
                <span v-if="option === quiz.userAnswer" class="fw-bold">   (您的答案)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
             <button @click="restartQuiz" class="btn btn-lg btn-primary">返回首頁，重新上傳</button>
        </div>
    </div>
  </div>
</template>