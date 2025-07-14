<script setup>
// 作為應用的最外層容器，我們只需要從 vue-router 引入 RouterView
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- 
    這個 <RouterView /> 元件是一個神奇的佔位符。
    Vue Router 會根據您瀏覽器當前的 URL：
    - 如果 URL 是 '/'，就在這裡顯示 HomeView.vue 的內容。
    - 如果 URL 是 '/quiz?ids=...'，就在這裡顯示 QuizView.vue 的內容。
  -->
  <RouterView />
</template>

<style>
/* 
  我們可以在這裡放置整個應用程式都通用的全域樣式。
  例如，設定一個統一的背景顏色。
*/
body {
  background-color: #f8f9fa; /* 一個類似 Bootstrap bg-light 的淺灰色，讓背景不那麼刺眼 */
}
</style>