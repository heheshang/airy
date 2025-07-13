<template>
  <div class="slack-mobile-layout">
    <!-- 顶部导航栏 -->
    <header class="mobile-header">
      <div class="header-left">
        <button @click="toggleSidebar" class="menu-btn">
          <span class="menu-icon">☰</span>
        </button>
        <div class="channel-info">
          <h1 class="channel-name">#{{ currentChannelName }}</h1>
          <span class="members-count">{{ membersCount }} 位成员</span>
        </div>
      </div>
      <div class="header-right">
        <button class="search-btn">
          <span class="search-icon">🔍</span>
        </button>
      </div>
    </header>

    <!-- 消息列表 -->
    <main class="messages-container" ref="messagesContainer">
      <div class="messages-list">
        <div 
          v-for="message in messages" 
          :key="message.id"
          class="message-item"
        >
          <div class="message-avatar">
            <img :src="message.avatar" :alt="message.author" />
          </div>
          <div class="message-content">
            <div class="message-header">
              <span class="message-author">{{ message.author }}</span>
              <span class="message-time">{{ formatTime(message.timestamp) }}</span>
            </div>
            <div class="message-text">{{ message.text }}</div>
            <div class="message-reactions" v-if="message.reactions && message.reactions.length">
              <span 
                v-for="reaction in message.reactions" 
                :key="reaction.emoji"
                class="reaction"
              >
                {{ reaction.emoji }} {{ reaction.count }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 消息输入框 -->
    <div class="message-input-container">
      <div class="message-input-wrapper">
        <div class="input-toolbar">
          <button class="toolbar-btn">📎</button>
          <button class="toolbar-btn">😊</button>
          <button class="toolbar-btn">@</button>
        </div>
        <div class="message-input">
          <textarea 
            v-model="newMessage"
            :placeholder="`发送消息到 #${currentChannelName}`"
            @keydown.enter.prevent="sendMessage"
            rows="1"
          ></textarea>
        </div>
        <button 
          class="send-btn" 
          :disabled="!newMessage.trim()"
          @click="sendMessage"
        >
          发送
        </button>
      </div>
    </div>

    <!-- 侧边栏抽屉 -->
    <div 
      class="sidebar-overlay" 
      :class="{ 'show': sidebarOpen }"
      @click="closeSidebar"
    >
      <aside class="sidebar-drawer" @click.stop>
        <div class="sidebar-header">
          <h2 class="workspace-name">Airy</h2>
          <button class="close-btn" @click="closeSidebar">×</button>
        </div>
        
        <div class="user-status">
          <div class="user-avatar">
            <img :src="generateUserAvatar('当前用户', 32)" alt="用户头像" />
            <span class="status-indicator online"></span>
          </div>
          <div class="user-info">
            <span class="user-name">当前用户</span>
            <span class="user-status-text">在线</span>
          </div>
        </div>

        <div class="channels-section">
          <div class="section-header">
            <span>频道</span>
          </div>
          <div class="channels-list">
            <div 
              v-for="channel in channels" 
              :key="channel.id"
              class="channel-item"
              :class="{ 'active': currentChannel === channel.id }"
              @click="switchChannel(channel.id)"
            >
              <span class="channel-prefix">#</span>
              <span class="channel-name">{{ channel.name }}</span>
              <span class="unread-badge" v-if="channel.unread">{{ channel.unread }}</span>
            </div>
          </div>
        </div>

        <div class="dms-section">
          <div class="section-header">
            <span>私信</span>
          </div>
          <div class="dms-list">
            <div 
              v-for="dm in directMessages" 
              :key="dm.id"
              class="dm-item"
              :class="{ 'active': currentDM === dm.id }"
              @click="switchDM(dm.id)"
            >
              <div class="dm-avatar">
                <img :src="dm.avatar" :alt="dm.name" />
                <span class="status-indicator" :class="dm.status"></span>
              </div>
              <div class="dm-info">
                <span class="dm-name">{{ dm.name }}</span>
                <span class="dm-preview">{{ dm.lastMessage }}</span>
              </div>
              <span class="unread-badge" v-if="dm.unread">{{ dm.unread }}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { generateUserAvatar, generateSystemAvatar } from '@/utils/avatar'

// 侧边栏状态
const sidebarOpen = ref(false)

// 当前频道
const currentChannel = ref('general')
const currentDM = ref('')

// 频道数据
const channels = ref([
  { id: 'general', name: '一般讨论', unread: 3 },
  { id: 'random', name: '闲聊', unread: 0 },
  { id: 'development', name: '开发', unread: 12 },
  { id: 'design', name: '设计', unread: 0 },
  { id: 'announcements', name: '公告', unread: 1 }
])

// 私信数据
const directMessages = ref([
  { id: 'user1', name: '张三', avatar: generateUserAvatar('张三', 32), status: 'online', lastMessage: '你好！', unread: 2 },
  { id: 'user2', name: '李四', avatar: generateUserAvatar('李四', 32), status: 'away', lastMessage: '稍后回复', unread: 0 },
  { id: 'user3', name: '王五', avatar: generateUserAvatar('王五', 32), status: 'offline', lastMessage: '明天见', unread: 1 }
])

// 消息数据
const messages = ref([
  {
    id: '1',
    author: '系统消息',
    avatar: generateSystemAvatar(40),
    text: '欢迎来到 #一般讨论 频道！',
    timestamp: new Date(Date.now() - 3600000),
    reactions: [{ emoji: '👋', count: 5 }]
  },
  {
    id: '2',
    author: '张三',
    avatar: generateUserAvatar('张三', 40),
    text: '大家好！今天有什么新消息吗？',
    timestamp: new Date(Date.now() - 1800000),
    reactions: [{ emoji: '😊', count: 2 }]
  },
  {
    id: '3',
    author: '李四',
    avatar: generateUserAvatar('李四', 40),
    text: '我刚更新了项目文档，大家可以看看。',
    timestamp: new Date(Date.now() - 900000),
    reactions: []
  }
])

const newMessage = ref('')
const messagesContainer = ref<HTMLElement>()

// 计算属性
const currentChannelName = computed(() => {
  const channel = channels.value.find(c => c.id === currentChannel.value)
  return channel?.name || '未知频道'
})

const membersCount = computed(() => 42)

// 方法
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const switchChannel = (channelId: string) => {
  currentChannel.value = channelId
  currentDM.value = ''
  // 清除未读消息
  const channel = channels.value.find(c => c.id === channelId)
  if (channel) channel.unread = 0
  closeSidebar()
}

const switchDM = (dmId: string) => {
  currentDM.value = dmId
  currentChannel.value = ''
  // 清除未读消息
  const dm = directMessages.value.find(d => d.id === dmId)
  if (dm) dm.unread = 0
  closeSidebar()
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  const message = {
    id: Date.now().toString(),
    author: '当前用户',
    avatar: generateUserAvatar('当前用户', 40),
    text: newMessage.value,
    timestamp: new Date(),
    reactions: []
  }
  
  messages.value.push(message)
  newMessage.value = ''
  
  // 滚动到底部
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped lang="scss">
.slack-mobile-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1a1d21;
  color: #d1d2d3;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

// 顶部导航栏
.mobile-header {
  height: 56px;
  background-color: #19171d;
  border-bottom: 1px solid #2d3139;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-btn {
  background: none;
  border: none;
  color: #d1d2d3;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
}

.channel-info {
  display: flex;
  flex-direction: column;
}

.channel-name {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.members-count {
  font-size: 12px;
  color: #8b8e94;
}

.search-btn {
  background: none;
  border: none;
  color: #d1d2d3;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
}

// 消息区域
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  gap: 12px;
}

.message-avatar {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
}

.message-author {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
}

.message-time {
  font-size: 11px;
  color: #8b8e94;
}

.message-text {
  font-size: 14px;
  color: #d1d2d3;
  line-height: 1.4;
  word-wrap: break-word;
}

.message-reactions {
  display: flex;
  gap: 4px;
  margin-top: 4px;
}

.reaction {
  background-color: #2d3139;
  border: 1px solid #3e424a;
  color: #d1d2d3;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 11px;
  cursor: pointer;
  
  &:hover {
    background-color: #3e424a;
  }
}

// 消息输入框
.message-input-container {
  padding: 12px;
  background-color: #19171d;
  border-top: 1px solid #2d3139;
}

.message-input-wrapper {
  background-color: #1a1d21;
  border: 1px solid #2d3139;
  border-radius: 8px;
  padding: 8px;
}

.input-toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.toolbar-btn {
  background: none;
  border: none;
  color: #8b8e94;
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  
  &:hover {
    color: #d1d2d3;
  }
}

.message-input {
  textarea {
    width: 100%;
    background: none;
    border: none;
    color: #d1d2d3;
    font-size: 14px;
    font-family: inherit;
    resize: none;
    outline: none;
    min-height: 20px;
    max-height: 100px;
    
    &::placeholder {
      color: #8b8e94;
    }
  }
}

.send-btn {
  background-color: #1264a3;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-top: 8px;
  
  &:hover:not(:disabled) {
    background-color: #0b5394;
  }
  
  &:disabled {
    background-color: #2d3139;
    cursor: not-allowed;
  }
}

// 侧边栏抽屉
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: none;
  
  &.show {
    display: block;
  }
}

.sidebar-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: #19171d;
  border-right: 1px solid #2d3139;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  
  .sidebar-overlay.show & {
    transform: translateX(0);
  }
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #2d3139;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.workspace-name {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #d1d2d3;
  font-size: 24px;
  cursor: pointer;
}

.user-status {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #2d3139;
}

.user-avatar {
  position: relative;
  width: 32px;
  height: 32px;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}

.status-indicator {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #19171d;
  
  &.online {
    background-color: #2bac76;
  }
  
  &.away {
    background-color: #e8912d;
  }
  
  &.offline {
    background-color: #8b8e94;
  }
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.user-status-text {
  font-size: 12px;
  color: #8b8e94;
}

.channels-section,
.dms-section {
  padding: 16px 0;
}

.section-header {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #8b8e94;
}

.channels-list,
.dms-list {
  padding: 4px 0;
}

.channel-item,
.dm-item {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  position: relative;
  
  &:hover {
    background-color: #2d3139;
  }
  
  &.active {
    background-color: #1264a3;
    color: #ffffff;
  }
}

.channel-prefix {
  color: #8b8e94;
}

.channel-name {
  flex: 1;
}

.dm-item {
  padding: 10px 16px;
}

.dm-avatar {
  position: relative;
  width: 20px;
  height: 20px;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}

.dm-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dm-name {
  font-size: 14px;
  color: #d1d2d3;
}

.dm-preview {
  font-size: 12px;
  color: #8b8e94;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unread-badge {
  background-color: #cd2553;
  color: #ffffff;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}
</style>
