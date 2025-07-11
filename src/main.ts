import { createApp } from 'vue'
import App from '@/App.vue'
import { setupPlugins } from '@/plugins'
import '@/styles/index.scss'

const app = createApp(App)

// 设置插件
setupPlugins(app)

app.mount('#app')
