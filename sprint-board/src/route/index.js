import {createRouter, createWebHistory} from 'vue-router'

const ProjectDetailView = () => import('@/views/ProjectDetailView.vue')
const TaskDetailView = () => import('@/views/TaskDetailView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')
const ProjectListView = () => import('@/views/ProjectListView.vue')
const ProjectBoardView = () => import('@/views/ProjectBoardView.vue')
const LoginView = () => import('@/views/LoginView.vue')

const routes = [
    {
        path: '/',
        name: 'project-list',
        component: ProjectListView,
        meta: {
            auth: true
        }
    },
    {
        path: '/project/:id',
        name: 'project-detail',
        component: ProjectDetailView,
        meta: {
            auth: true
        }
    },
    {
        path: '/task/:id',
        name: 'task-detail',
        component: TaskDetailView,
        meta: {
            auth: true
        }
    },
    {
        path: '/project/:id/board',
        name: 'project-board',
        component: ProjectBoardView,
        meta: {
            auth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    const isLogin = localStorage.getItem('sprint-board-login') === 'true'
    if (to.meta.auth && !isLogin) {
        return {
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        }
    }

    if (to.name === 'login' && isLogin) {
        return {
            name: 'project-list'
        }
    }
})

export default router