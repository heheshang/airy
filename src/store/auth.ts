import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  user_id: string
  username: string
  display_name: string
  email: string
  avatar_url?: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!token.value)

  const login = (userToken: string, userData: User) => {
    token.value = userToken
    user.value = userData
    localStorage.setItem('token', userToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      try {
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Failed to parse stored user data:', error)
        logout()
      }
    }
  }

  // 初始化时检查认证状态
  checkAuth()

  return {
    token,
    user,
    isLoggedIn,
    login,
    logout,
    checkAuth
  }
})
