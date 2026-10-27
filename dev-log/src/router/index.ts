import Home from '@/views/Home.vue'
import LogDetail from '@/views/LogDetail.vue'
import LogEdit from '@/views/LogEdit.vue'
import Logs from '@/views/Logs.vue'
import NewLog from '@/views/NewLog.vue'
import NotFound from '@/views/NotFound.vue'
import Setting from '@/views/Setting.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/logs',
    name: 'logs',
    component: Logs,
    children: [
      {
        path: 'new',
        name: 'log-new',
        component: NewLog
      },
      {
        path: ':id',
        name: 'log-detail',
        component: LogDetail,
        children: [
          {
            path: 'edit',
            name: 'log-edit',
            component: LogEdit
          }
        ]
      }
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    component: Setting
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

export default router
