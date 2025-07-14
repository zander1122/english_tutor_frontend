// src/components/PdfUploader.vue
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedFile = ref(null);
const message = ref('');
const isLoading = ref(false);

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    message.value = `已選擇檔案：${file.name}`;
  } else {
    selectedFile.value = null;
    message.value = '';
  }
}

async function uploadFile() {
  if (!selectedFile.value) {
    message.value = '錯誤：請先選擇一個 PDF 檔案！';
    return;
  }

  isLoading.value = true;
  message.value = '檔案上傳與 AI 解析中，請稍候...';
  
  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    const response = await axios.post('/api/upload_and_parse_pdf', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000,
    });
    
    const quizzesToTest = response.data;

    if (Array.isArray(quizzesToTest) && quizzesToTest.length > 0) {
      const quizIds = quizzesToTest.map(q => q._id); // 使用 _id
      const destination = { name: 'quiz', query: { ids: quizIds.join(',') } };
      const path = router.resolve(destination).href;
      window.location.href = path;
    } else {
      throw new Error("成功解析，但後端未能返回任何測驗題。");
    }
  } catch (error) {
    const backendError = error.response?.data?.detail;
    const genericError = error.message;
    message.value = `錯誤：${backendError || genericError}`;
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="w-100">
    <div class="input-group input-group-lg">
      <input type="file" class="form-control" @change="handleFileChange" accept=".pdf" :disabled="isLoading">
      <button class="btn btn-primary px-4 fw-bold" @click="uploadFile" :disabled="isLoading || !selectedFile">
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
        {{ isLoading ? '處理中...' : '開始測驗' }}
      </button>
    </div>
    <div v-if="message" class="mt-3">
      <div class="alert py-2 text-center" :class="message.startsWith('錯誤') ? 'alert-danger' : 'alert-info'">
        {{ message }}
      </div>
    </div>
  </div>
</template>