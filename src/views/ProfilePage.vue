<template>
  <MainLayout>
    <div class="profile-page">
      <button class="back-btn" @click="goBack">← 返回</button>
      <h2>个人资料</h2>
      <div v-if="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="user" class="profile-info">
        <p><strong>用户名：</strong> {{ user.name }}</p>
        <p><strong>邮箱：</strong> {{ user.email }}</p>
        <p><strong>角色：</strong> {{ user.role}}</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useRouter } from 'vue-router'
import { fetchUserProfile, UserProfile } from '@/api/user'

const router = useRouter()
function goBack() {
  router.back()
}

const user = ref<UserProfile | null>(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await fetchUserProfile()
    user.value = res // 视后端返回结构调整
  } catch (e: any) {
    error.value = e.message || '获取用户信息失败'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.profile-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.back-btn {
  background: none;
  border: none;
  color: #4f8cff;
  font-size: 1.1rem;
  cursor: pointer;
  margin-bottom: 1.2rem;
}
.profile-info p {
  margin: 0.7rem 0;
  font-size: 1.05rem;
}
</style> 