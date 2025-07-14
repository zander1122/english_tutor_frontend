# AI 英語學習平台 - 前端介面

這是一個使用 Vue 3、Vite 和 Bootstrap 打造的現代化前端應用程式。它提供了一個友善的使用者介面，讓使用者可以輕鬆地上傳 PDF 題庫，並立即開始一場互動式的線上測驗。

---

## ✨ 主要功能

- **檔案上傳**: 提供直觀的介面來選擇並上傳 PDF 檔案。
- **即時反饋**: 在上傳和 AI 處理過程中，顯示清晰的狀態訊息。
- **動態路由**: 使用 Vue Router 實現「上傳即測驗」的無縫頁面跳轉。
- **互動式測驗**: 以「問卷模式」一次性展示所有題目，方便使用者作答。
- **結果回顧**: 測驗結束後，提供詳細的答題報告，包含分數、個人答案和正確答案。

---

## 🛠️ 技術棧

- **框架**: Vue 3 (使用 Composition API 和 `<script setup>`)
- **建構工具**: Vite
- **語言**: TypeScript
- **CSS 框架**: Bootstrap 5
- **HTTP 客戶端**: Axios
- **路由管理**: Vue Router
- **狀態管理**: Pinia (已安裝，備用)

---

## 🚀 如何在本地運行

### 1. 前置需求
- 已安裝 Node.js (LTS 版本) 和 npm
- 後端 API 伺服器 (`english_tutor_backend`) 必須已在 `http://127.0.0.1:8000` 上運行。

### 2. 設定專案
```bash
# 1. 複製儲存庫
git clone https://github.com/[您的 GitHub 使用者名稱]/english_tutor_frontend.git
cd english_tutor_frontend

# 2. 安裝所有必要的依賴套件
npm install
```

### 3. 啟動開發伺服器
```bash
# 啟動 Vite 開發伺服器，並開啟熱模組重載 (HMR)
npm run dev
```
前端應用將在 `http://localhost:5173` (或一個可用的新端口) 上運行。

---

## 專案結構

- **`src/components`**: 存放可複用的 Vue 元件 (如 `PdfUploader.vue`)。
- **`src/views`**: 存放頁面級別的元件 (如 `HomeView.vue`, `QuizView.vue`)。
- **`src/router`**: 存放 Vue Router 的設定。
- **`main.ts`**: 應用程式的主入口檔案。
