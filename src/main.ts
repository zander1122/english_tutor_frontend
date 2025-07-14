import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router' // 引入 router

const app = createApp(App)

app.use(createPinia())
app.use(router) // 啟用 router

app.mount('#app')