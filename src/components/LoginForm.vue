<template>
  <form class="login-form" @submit.prevent="onLogin">
    <h2>登录</h2>
    <div class="form-group">
      <label for="username">用户名</label>
      <input id="username" v-model="username" type="text" placeholder="请输入用户名" />
      <span v-if="usernameError" class="error">{{ usernameError }}</span>
    </div>
    <div class="form-group">
      <label for="password">密码</label>
      <input id="password" v-model="password" type="password" placeholder="请输入密码" />
      <span v-if="passwordError" class="error">{{ passwordError }}</span>
    </div>
    <button type="submit" :disabled="loading">{{ loading ? '登录中...' : '登录' }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['login'])
const username = ref('')
const password = ref('')
const loading = ref(false)
const usernameError = ref('')
const passwordError = ref('')

function onLogin() {
  usernameError.value = ''
  passwordError.value = ''
  if (!username.value) {
    usernameError.value = '请输入用户名'
  }
  if (!password.value) {
    passwordError.value = '请输入密码'
  }
  if (usernameError.value || passwordError.value) {
    return
  }
  loading.value = true
  emit('login', { username: username.value, password: password.value })
  setTimeout(() => {
    loading.value = false
  }, 1200)
}
</script>

<style scoped>
.login-form {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.login-form h2 {
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
input[type="text"], input[type="password"] {
  padding: 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
input:focus {
  border-color: #74ebd5;
}
button[type="submit"] {
  padding: 0.8rem;
  background: linear-gradient(90deg, #74ebd5 0%, #ACB6E5 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: #e74c3c;
  font-size: 0.9rem;
}
</style> 