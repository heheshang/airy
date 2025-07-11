import type { App } from 'vue'
import pinia from '@/store'
import router from '@/router'

export function setupPlugins(app: App) {
  app.use(pinia)
  app.use(router)
} 