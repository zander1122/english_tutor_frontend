import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizView.vue'),
      props: route => {
        const ids = route.query.ids;
        // 核心修正：先分割，然後過濾掉所有空字串
        const quizIds = (typeof ids === 'string' && ids) 
          ? ids.split(',').filter(id => id.trim() !== '') 
          : [];
        return { quizIds };
      }
    }
  ]
})

export default router