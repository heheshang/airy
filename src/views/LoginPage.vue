<template>
  <MainLayout>
    <LoginForm @login="handleLogin" />
    <div v-if="msg" :class="['msg', msgType]">{{ msg }}</div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import LoginForm from '../components/LoginForm.vue'
import { login, LoginParams } from '../api/auth'
import { useRouter } from 'vue-router'

const msg = ref('')
const msgType = ref('')
const router = useRouter()

async function handleLogin(params: LoginParams) {
  msg.value = ''
  msgType.value = ''
  const res = await login(params)
  msg.value = res.message
  msgType.value = res.success ? 'success' : 'error'

  if (res.success) {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
.msg {
  margin-top: 1.5rem;
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  min-width: 200px;
  text-align: center;
}
.success {
  background: #e8f5e9;
  color: #388e3c;
  border: 1px solid #b2dfdb;
}
.error {
  background: #ffebee;
  color: #d32f2f;
  border: 1px solid #ffcdd2;
}
</style> 