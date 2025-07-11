<template>
  <div class="mobile-layout">
    <!-- 顶部导航栏 -->
    <header class="mobile-header safe-area-top" v-if="showHeader">
      <div class="header-left">
        <button v-if="showBack" @click="goBack" class="back-btn">
          <span class="back-icon">←</span>
        </button>
        <slot name="header-left"></slot>
      </div>
      
      <div class="header-center">
        <h1 class="header-title">{{ title }}</h1>
      </div>
      
      <div class="header-right">
        <slot name="header-right"></slot>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main class="mobile-content" :class="{ 'has-header': showHeader, 'has-tabbar': showTabbar }">
      <slot />
    </main>

    <!-- 底部标签栏 -->
    <nav class="mobile-tabbar safe-area-bottom" v-if="showTabbar">
      <router-link 
        v-for="tab in tabs" 
        :key="tab.path"
        :to="tab.path" 
        class="tab-item"
        active-class="active"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface Tab {
  path: string
  label: string
  icon: string
}

interface Props {
  title?: string
  showHeader?: boolean
  showTabbar?: boolean
  showBack?: boolean
  tabs?: Tab[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Airy',
  showHeader: true,
  showTabbar: true,
  showBack: false,
  tabs: () => [
    { path: '/dashboard', label: '首页', icon: '🏠' },
    { path: '/profile', label: '个人', icon: '👤' },
    { path: '/settings', label: '设置', icon: '⚙️' }
  ]
})

const router = useRouter()
const route = useRoute()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/dashboard')
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.mobile-layout {
  min-height: 100vh;
  background-color: $background-secondary;
  display: flex;
  flex-direction: column;
}

.mobile-header {
  height: $mobile-header-height;
  background: $background-primary;
  border-bottom: 1px solid $border-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $spacing-lg;
  position: sticky;
  top: 0;
  z-index: $z-index-sticky;
  box-shadow: $shadow-light;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  min-width: 60px;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $text-primary;
  margin: 0;
  text-align: center;
}

.back-btn {
  background: none;
  border: none;
  padding: $spacing-sm;
  cursor: pointer;
  border-radius: $radius-medium;
  transition: background-color $transition-fast;
  
  &:hover {
    background-color: $background-secondary;
  }
  
  &:active {
    background-color: $border-light;
  }
}

.back-icon {
  font-size: $font-size-xl;
  color: $text-secondary;
}

.mobile-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  
  &.has-header {
    padding-top: 0;
  }
  
  &.has-tabbar {
    padding-bottom: calc($mobile-tabbar-height + $mobile-safe-area-inset-bottom);
  }
}

.mobile-tabbar {
  height: $mobile-tabbar-height;
  background: $background-primary;
  border-top: 1px solid $border-color;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z-index-fixed;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-xs 0;
  color: $text-tertiary;
  text-decoration: none;
  transition: color $transition-normal;
  min-height: $touch-target-size;
  
  &:hover {
    color: $primary-color;
  }
  
  &.active {
    color: $primary-color;
  }
}

.tab-icon {
  font-size: $font-size-xl;
  margin-bottom: $spacing-xs;
  line-height: 1;
}

.tab-label {
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
  line-height: 1;
}

// 响应式设计
@media (max-width: $mobile-sm) {
  .header-title {
    font-size: $font-size-md;
  }
  
  .tab-icon {
    font-size: $font-size-lg;
  }
  
  .tab-label {
    font-size: 10px;
  }
}

// 动画效果
.mobile-content {
  transition: transform $transition-normal;
}

// 安全区域适配
.safe-area-top {
  padding-top: $mobile-safe-area-inset-top;
}

.safe-area-bottom {
  padding-bottom: $mobile-safe-area-inset-bottom;
}
</style> 