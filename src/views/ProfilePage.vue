<template>
  <MainLayout>
    <div class="profile-page">
      <button class="back-btn" @click="goBack">← 返回</button>
      <h2>个人资料</h2>
      <div class="profile-info">
        <p><strong>用户名：</strong> demo_user</p>
        <p><strong>邮箱：</strong> demo@example.com</p>
        <p><strong>简介：</strong> 这里是用户简介信息。</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function goBack() {
  router.back()
}
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