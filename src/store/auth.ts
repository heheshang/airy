import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(null)
  const isLoggedIn = computed(() => !!token.value)

  const login = (userToken: string, userData: any) => {
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
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    token,
    user,
    isLoggedIn,
    login,
    logout,
    checkAuth
  }
}) 