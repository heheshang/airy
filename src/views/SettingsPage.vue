<template>
  <MainLayout>
    <div class="settings-page">
      <button class="back-btn" @click="goBack">← 返回</button>
      <h2>设置</h2>
      <div class="settings-content">
        <p>这里可以放置用户设置项。</p>
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
.settings-page {
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
.settings-content {
  font-size: 1.05rem;
}
</style> 