<script setup>
import PdfUploader from '../components/PdfUploader.vue';
</script>
<template>
  <div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <!-- 這裡可以放一張相關的圖片或插畫 -->
        <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070" 
             class="d-block mx-lg-auto img-fluid rounded-3 shadow-lg" 
             alt="Education hero image" loading="lazy">
      </div>
      <div class="col-lg-6">
        <h1 class="display-4 fw-bold text-body-emphasis lh-1 mb-3">
          智慧學習，從這裡開始
        </h1>
        <p class="lead fs-4">
          上傳您的 PDF 學習筆記或教科書，讓 AI 為您量身打造互動測驗。將被動閱讀轉化為主動學習，加深記憶，提高效率。
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
          <!-- 將上傳元件直接整合進來 -->
          <PdfUploader />
        </div>
      </div>
    </div>
  </div>
</template>