import { createRouter, createWebHistory } from 'vue-router'
import MovieList from '@/views/MovieList.vue'
import MovieDetails from '@/views/MovieDetails.vue'
import CategoryList from '@/views/CategoryList.vue'
import Login from '@/views/UserLogin.vue'
import Register from '@/views/RegistrerUser.vue'
import UserDashboard from '@/views/UsersDashboard.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import store from '@/store'

const routes = [
  { path: '/', component: MovieList, name: 'Movies' },
  { path: '/movies/:id', component: MovieDetails, name: 'MovieDetails' },
  { path: '/categories', component: CategoryList, name: 'Categories' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
  {
    path: '/user-dashboard',
    component: UserDashboard,
    name: 'UserDashboard',
    meta: { requiresAuth: true, role: 'user' },
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboard,
    name: 'AdminDashboard',
    meta: { requiresAuth: true, role: 'admin' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  const userRole = store.getters['auth/getUser']?.role

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.requiresAuth && to.meta.role && to.meta.role !== userRole) {
    if (userRole === 'admin') {
      next({ name: 'AdminDashboard' })
    } else if (userRole === 'user') {
      next({ name: 'UserDashboard' })
    } else {
      next({ name: 'Movies' })
    }
  } else {
    next()
  }
})

export default router
