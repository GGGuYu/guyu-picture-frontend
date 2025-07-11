import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from '@/router/mainRoutes'
import userRoutes from '@/router/userRoutes'
import adminRoutes from '@/router/adminRoutes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...mainRoutes,
    ...userRoutes,
    ...adminRoutes,
  ],
})

export default router
