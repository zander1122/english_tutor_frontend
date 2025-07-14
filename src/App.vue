<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>
<template>
  <div class="d-flex flex-column min-vh-100 bg-body-tertiary">
    <!-- 導覽列 -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div class="container py-2">
        <RouterLink class="navbar-brand d-flex align-items-center" to="/">
          <i class="bi bi-robot fs-3 text-primary me-2"></i>
          <span class="fs-4 fw-bolder">AI Quiz Platform</span>
        </RouterLink>
      </div>
    </nav>

    <!-- 主內容區域 -->
    <main class="flex-grow-1">
      <RouterView />
    </main>

    <!-- 頁腳 -->
    <footer class="py-4 bg-dark text-white">
      <div class="container text-center">
        <p class="mb-0">© {{ new Date().getFullYear() }} AI Quiz Platform. All Rights Reserved.</p>
        <p class="mb-0 small text-white-50">Powered by FastAPI & Vue.js</p>
      </div>
    </footer>
  </div>
</template>