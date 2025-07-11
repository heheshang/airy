<template>
  <MobileLayout title="首页">
    <div class="dashboard-page">
      <!-- 欢迎卡片 -->
      <div class="welcome-card card">
        <div class="welcome-header">
          <div class="user-avatar">
            <img src="https://via.placeholder.com/60x60/07C160/ffffff?text=U" alt="用户头像" />
          </div>
          <div class="welcome-text">
            <h2 class="greeting">早上好，{{ user?.username || '用户' }}</h2>
            <p class="subtitle">今天是个美好的一天</p>
          </div>
        </div>
      </div>

      <!-- 快捷功能 -->
      <div class="quick-actions">
        <h3 class="section-title">快捷功能</h3>
        <div class="action-grid">
          <div class="action-item" @click="navigateTo('/profile')">
            <div class="action-icon">👤</div>
            <span class="action-label">个人资料</span>
          </div>
          <div class="action-item" @click="navigateTo('/settings')">
            <div class="action-icon">⚙️</div>
            <span class="action-label">设置</span>
          </div>
          <div class="action-item" @click="showNotification">
            <div class="action-icon">🔔</div>
            <span class="action-label">通知</span>
          </div>
          <div class="action-item" @click="showHelp">
            <div class="action-icon">❓</div>
            <span class="action-label">帮助</span>
          </div>
        </div>
      </div>

      <!-- 统计卡片 -->
      <div class="stats-section">
        <h3 class="section-title">数据统计</h3>
        <div class="stats-grid">
          <div class="stat-card card">
            <div class="stat-icon success">📈</div>
            <div class="stat-content">
              <div class="stat-value">1,234</div>
              <div class="stat-label">总访问量</div>
            </div>
          </div>
          <div class="stat-card card">
            <div class="stat-icon primary">👥</div>
            <div class="stat-content">
              <div class="stat-value">567</div>
              <div class="stat-label">活跃用户</div>
            </div>
          </div>
          <div class="stat-card card">
            <div class="stat-icon warning">📊</div>
            <div class="stat-content">
              <div class="stat-value">89%</div>
              <div class="stat-label">满意度</div>
            </div>
          </div>
          <div class="stat-card card">
            <div class="stat-icon info">⚡</div>
            <div class="stat-content">
              <div class="stat-value">2.3s</div>
              <div class="stat-label">响应时间</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 最近活动 -->
      <div class="recent-activities">
        <h3 class="section-title">最近活动</h3>
        <div class="activity-list">
          <div class="activity-item" v-for="activity in activities" :key="activity.id">
            <div class="activity-icon" :class="activity.type">
              {{ activity.icon }}
            </div>
            <div class="activity-content">
              <div class="activity-title">{{ activity.title }}</div>
              <div class="activity-time">{{ activity.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MobileLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import MobileLayout from '@/layout/MobileLayout.vue'

const router = useRouter()
const authStore = useAuthStore()

const user = ref<any>(authStore.user)

const activities = ref([
  {
    id: 1,
    title: '登录成功',
    time: '刚刚',
    icon: '✅',
    type: 'success'
  },
  {
    id: 2,
    title: '更新个人资料',
    time: '2小时前',
    icon: '📝',
    type: 'info'
  },
  {
    id: 3,
    title: '系统维护完成',
    time: '1天前',
    icon: '🔧',
    type: 'warning'
  }
])

const navigateTo = (path: string) => {
  router.push(path)
}

const showNotification = () => {
  // 显示通知
  console.log('显示通知')
}

const showHelp = () => {
  // 显示帮助
  console.log('显示帮助')
}

onMounted(() => {
  // 检查用户认证状态
  authStore.checkAuth()
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.dashboard-page {
  padding: $spacing-lg;
  background-color: $background-secondary;
  min-height: 100vh;
}

.welcome-card {
  margin-bottom: $spacing-2xl;
  background: linear-gradient(135deg, $primary-color 0%, $primary-hover 100%);
  color: white;
  border: none;
}

.welcome-header {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.welcome-text {
  flex: 1;
}

.greeting {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  margin: 0 0 $spacing-xs 0;
}

.subtitle {
  font-size: $font-size-sm;
  opacity: 0.9;
  margin: 0;
}

.section-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $text-primary;
  margin: 0 0 $spacing-lg 0;
}

.quick-actions {
  margin-bottom: $spacing-3xl;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
}

.action-item {
  background: $background-primary;
  border-radius: $radius-large;
  padding: $spacing-xl;
  text-align: center;
  cursor: pointer;
  transition: all $transition-normal;
  border: 1px solid $border-light;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-medium;
  }
  
  &:active {
    transform: translateY(0);
  }
}

.action-icon {
  font-size: $font-size-3xl;
  margin-bottom: $spacing-sm;
}

.action-label {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $text-secondary;
}

.stats-section {
  margin-bottom: $spacing-3xl;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
}

.stat-card {
  padding: $spacing-lg;
  display: flex;
  align-items: center;
  gap: $spacing-md;
  min-height: 80px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: $radius-medium;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-xl;
  
  &.success {
    background-color: rgba($success-color, 0.1);
    color: $success-color;
  }
  
  &.primary {
    background-color: rgba($primary-color, 0.1);
    color: $primary-color;
  }
  
  &.warning {
    background-color: rgba($warning-color, 0.1);
    color: $warning-color;
  }
  
  &.info {
    background-color: rgba($info-color, 0.1);
    color: $info-color;
  }
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $text-primary;
  line-height: 1;
  margin-bottom: $spacing-xs;
}

.stat-label {
  font-size: $font-size-xs;
  color: $text-tertiary;
}

.recent-activities {
  margin-bottom: $spacing-2xl;
}

.activity-list {
  background: $background-primary;
  border-radius: $radius-large;
  overflow: hidden;
  border: 1px solid $border-light;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: $spacing-lg;
  border-bottom: 1px solid $border-light;
  
  &:last-child {
    border-bottom: none;
  }
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: $radius-medium;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-md;
  margin-right: $spacing-md;
  
  &.success {
    background-color: rgba($success-color, 0.1);
    color: $success-color;
  }
  
  &.info {
    background-color: rgba($info-color, 0.1);
    color: $info-color;
  }
  
  &.warning {
    background-color: rgba($warning-color, 0.1);
    color: $warning-color;
  }
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: $font-size-md;
  font-weight: $font-weight-medium;
  color: $text-primary;
  margin-bottom: $spacing-xs;
}

.activity-time {
  font-size: $font-size-xs;
  color: $text-tertiary;
}

// 响应式设计
@media (max-width: $mobile-sm) {
  .dashboard-page {
    padding: $spacing-md;
  }
  
  .action-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .greeting {
    font-size: $font-size-lg;
  }
  
  .action-item {
    min-height: 80px;
  }
}
</style> 