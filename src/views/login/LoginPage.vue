<template>
  <SlackLayout title="登录">
    <div class="login-page">
      <div class="login-card card">
        <h2 class="login-title">欢迎回来</h2>
        <p class="login-subtitle">请输入您的账号信息登录</p>

        <form class="login-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username" class="form-label">用户名</label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="form-input"
              placeholder="请输入用户名"
              required
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">密码</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-input"
              placeholder="请输入密码"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary login-btn" :disabled="isLoading">
            <span v-if="!isLoading">登录</span>
            <span v-if="isLoading">登录中...</span>
          </button>

          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  </SlackLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import type { User } from '@/store/auth';
import SlackLayout from '@/layout/SlackLayout.vue';

const username = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    // 模拟登录验证 - 实际项目中应该调用真实的API
    if (username.value && password.value) {
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser: User = {
        user_id: 'user-' + Date.now(),
        username: username.value,
        display_name: username.value,
        email: username.value + '@example.com'
      };
      
      authStore.login(mockToken, mockUser);
      // 登录成功后跳转到chat页面
      router.push('/chat');
    } else {
      throw new Error('用户名和密码不能为空');
    }
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : '登录失败，请检查用户名和密码';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.login-card {
  padding: 30px;
  margin-top: 40px;
}

.login-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
}

.login-subtitle {
  color: #666;
  text-align: center;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.login-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border-radius: 8px;
}

.error-message {
  color: #ff4d4f;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}
</style>
