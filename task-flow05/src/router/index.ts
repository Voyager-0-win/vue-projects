import Home from '@/views/Home.vue'
import List from '@/views/List.vue'
import Login from '@/views/Login.vue'
import Manage from '@/views/Manage.vue'
import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/list',
    name: 'list',
    component: List,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/manage',
    name: 'manage',
    component: Manage,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const isLogin = localStorage.getItem('task-flow-login') === 'true'
  if (!isLogin && to.meta.requireAuth) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }
  if (isLogin && to.name === 'login') {
    return { name: 'home' }
  }
})

export default router
