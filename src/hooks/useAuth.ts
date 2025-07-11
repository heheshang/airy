import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export function useAuth() {
  const router = useRouter()
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(null)

  const isAuthenticated = computed(() => !!token.value)

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
    router.push('/login')
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
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
} 