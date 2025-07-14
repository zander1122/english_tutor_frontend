# 🎨 AI 英語學習平台 - 前端介面

這是一個使用 Vue 3 (Composition API)、Vite 和 Bootstrap 5 打造的現代化、響應式前端應用程式。它為使用者提供了一個從上傳檔案到完成互動式測驗的無縫體驗。

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)

---

## ✨ 核心功能

- **🚀 流暢的單頁應用 (SPA)**: 使用 Vue Router 實現快速的頁面切換，無需重新載入。
- **🎨 專業級 UI/UX**: 借鑒現代設計風格，使用 Bootstrap 5 和 Bootstrap Icons 打造美觀、直觀且響應式的介面。
- **📤 上傳即測驗**: 優化的使用者流程，上傳 PDF 後直接跳轉至測驗頁面，提供即時的學習體驗。
- **📝 互動式問卷測驗**: 以「問卷模式」一次性展示所有題目，使用者可以自由作答後統一提交。
- **📊 視覺化結果報告**: 測驗結束後，提供清晰的分數總結，並以「手風琴」元件展示每一題的詳細對錯情況。
- **🛡️ 健壯的狀態管理**: 採用 Vue 3 Composition API 的 `ref` 和 `reactive` 精準管理元件狀態，確保複雜互動下的數據一致性。

---

## 🛠️ 技術棧

- **框架**: Vue 3 (Composition API, `<script setup>`)
- **建構工具**: Vite
- **語言**: TypeScript
- **CSS 框架**: Bootstrap 5 & Bootstrap Icons
- **HTTP 客戶端**: Axios (透過 Vite 代理與後端通訊)
- **路由管理**: Vue Router 4
- **狀態管理**: Pinia (已安裝，備用於未來擴展)

---

## 🚀 本地啟動指南

### 1. 環境準備
- 確保已安裝 Node.js (最新的 LTS 版本) 和 Git。
- **後端 API 伺服器 (`english_tutor_backend`) 必須已在 `http://127.0.0.1:8000` 上成功運行。**

### 2. 設定專案
```bash
# 複製儲存庫
git clone https://github.com/[您的 GitHub 使用者名稱]/english_tutor_frontend.git
cd english_tutor_frontend

# 安裝所有依賴
npm install
```

### 3. 啟動開發伺服器
```bash
npm run dev
```
前端應用將在 `http://localhost:5173` (或一個可用的新端口) 運行。Vite 的代理設定會自動將 `/api` 路徑的請求轉發到後端。

---

## 專案結構亮點

- **`src/views`**: 存放頁面級別的元件 (`HomeView.vue`, `QuizView.vue`)，由 Vue Router 管理。
- **`src/components`**: 存放可複用的 UI 元件 (如 `PdfUploader.vue`)。
- **`src/router`**: 負責定義應用的所有頁面路徑和導航邏輯。
- **`vite.config.ts`**: 專案的核心設定檔，包含了開發伺服器代理等重要配置。