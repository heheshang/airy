import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import SettingsPage from '@/views/SettingsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', component: LoginPage
  },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  { path: '/settings', name: 'Settings', component: SettingsPage },
  { path: '/', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router; 