import { createRouter, createWebHistory } from "vue-router"

const BookDetailView = () => import('@/views/BookDetailView.vue')
const BookListView = () => import('@/views/BookListView.vue')
const HomeView = () => import('@/views/HomeView.vue')
const ManageBookView = () => import('@/views/ManageBookView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')
const LoginView = () => import('@/views/LoginView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/books',
    name: 'books',
    component: BookListView
  },
  {
    path: '/manage',
    name: 'manage',
    component: ManageBookView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/books/:id',
    name: 'book-detail',
    component: BookDetailView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const isSignIn = localStorage.getItem('book-nest-login') === 'true'
  if (!isSignIn && to.name === 'manage') {
    return {
      name: 'login',
      query: {
        redirect: to.name
      }
    }
  }
  if (isSignIn && to.name === 'login') {
    return {
      name: 'home'
    }
  }
})

export default router