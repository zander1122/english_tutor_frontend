<script setup>
// 首頁只負責引入上傳元件
import PdfUploader from '../components/PdfUploader.vue';
</script>

<template>
  <div class="container py-5">
    <header class="text-center mb-5">
      <h1 class="display-4 fw-bold">AI 英語學習平台</h1>
      <p class="fs-5 text-muted">上傳您的 PDF 題庫，立即開始測驗！</p>
    </header>
    <main class="row justify-content-center">
      <div class="col-lg-8">
        <!-- 這裡只顯示上傳元件 -->
        <PdfUploader />
      </div>
    </main>
  </div>
</template>