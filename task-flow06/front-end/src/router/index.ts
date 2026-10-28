import Home from '@/views/Home.vue'
import TaskAdd from '@/views/TaskAdd.vue'
import TaskDetail from '@/views/TaskDetail.vue'
import TaskEdit from '@/views/TaskEdit.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/:id',
    component: TaskDetail
  },
  {
    path: '/new',
    component: TaskAdd
  },
  {
    path: '/:id/edit',
    component: TaskEdit
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
