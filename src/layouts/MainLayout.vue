<template>
  <div class="main-layout">
    <slot />
  </div>
</template>

<script setup lang="ts">
// 可添加全局导航、侧边栏等
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%);
}
</style> 