<template>
  <div class="main-layout">
    <div class="layout-body">
      <aside class="sidebar">
        <ul>
          <li><router-link to="/dashboard">🏠 首页</router-link></li>
          <li><router-link to="/profile">👤 个人资料</router-link></li>
          <li><router-link to="/settings">⚙️ 设置</router-link></li>
        </ul>
      </aside>
      <main class="main-content">
        <slot />
      </main>
    </div>
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
  background: linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%);
}
.navbar {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
}
.logo {
  font-weight: bold;
  font-size: 1.3rem;
  color: #4f8cff;
}
.nav-links {
  display: flex;
  gap: 1.5rem;
}
.nav-links a {
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s;
}
.nav-links a.router-link-active {
  color: #4f8cff;
  font-weight: bold;
}
.user-center {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.user-avatar {
  font-size: 1.2rem;
}
.user-name {
  font-size: 1rem;
  color: #333;
}
.layout-body {
  display: flex;
  flex: 1;
  min-height: 0;
}
.sidebar {
  width: 180px;
  background: rgba(255,255,255,0.92);
  box-shadow: 2px 0 8px rgba(0,0,0,0.03);
  padding: 2rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar li {
  margin-bottom: 1.2rem;
}
.sidebar a {
  color: #333;
  text-decoration: none;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}
.sidebar a.router-link-active {
  color: #4f8cff;
  font-weight: bold;
}
.main-content {
  flex: 1;
  padding: 2.5rem 2rem;
  min-width: 0;
}
</style> 