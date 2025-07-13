<template>
  <div class="chat-page">
    <component :is="currentLayout" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import SlackLayout from '@/layout/SlackLayout.vue'
import SlackMobileLayout from '@/layout/SlackMobileLayout.vue'

const isMobile = ref(false)

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const currentLayout = computed(() => {
  return isMobile.value ? SlackMobileLayout : SlackLayout
})
</script>

<style scoped>
.chat-page {
  height: 100vh;
  width: 100%;
}
</style>
