import { createRouter, createWebHistory } from "vue-router"

const HomeView = () => import('../views/HomeView.vue')
const StatsView = () => import('../views/StatsView.vue')
const TasksView = () => import('../views/TasksView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')
const TaskDetailView = () => import('../views/TaskDetailView.vue')
const SignInView = () => import('../views/SignInView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TasksView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsView,
  },
  {
    path: '/tasks/:id',
    name: 'task-detail',
    component: TaskDetailView,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignInView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const isSignedIn = localStorage.getItem('taskflow-sign-in') === 'true'
  if (!isSignedIn && to.meta.requireAuth) {
    return {
      name: 'sign-in',
      query: {
        redirect: to.fullPath
      }
    }
  }

  if (isSignedIn && to.name === 'sign-in') {
    return {
      name: 'home'
    }
  }
})

export default router