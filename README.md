# Airy - 移动端应用

一个基于 Tauri + Vue.js 构建的现代化移动端应用，采用微信风格设计。

## ✨ 特性

- 📱 **移动端优化** - 专为手机设备设计的UI和交互
- 🎨 **微信风格** - 采用微信绿主题色和简洁设计
- ⚡ **高性能** - 基于 Tauri 的原生性能
- 🔄 **响应式** - 支持不同屏幕尺寸
- 🌐 **国际化** - 支持中英文切换
- 🔐 **认证系统** - 完整的用户认证流程
- 📦 **模块化** - 清晰的代码结构和组件化设计

## 🚀 快速开始

### 环境要求

- Node.js 18+
- Rust 1.70+
- pnpm (推荐) 或 npm

### 安装依赖

```bash
# 安装前端依赖
pnpm install

# 安装 Rust 依赖 (自动执行)
pnpm tauri
```

### 开发模式

```bash
# 启动开发服务器
pnpm dev

# 启动 Tauri 开发模式
pnpm tauri:dev
```

### 构建应用

```bash
# 构建前端
pnpm build

# 构建桌面应用
pnpm tauri:build

# 构建移动端应用
pnpm tauri:android  # Android
pnpm tauri:ios      # iOS
```

## 📁 项目结构

```
src/
├── api/           # API接口管理
├── assets/        # 静态资源
├── axios/         # HTTP请求配置
├── components/    # 公共组件
├── hooks/         # 自定义Hooks
├── layout/        # 布局组件
├── locales/       # 国际化配置
├── plugins/       # 插件配置
├── router/        # 路由配置
├── store/         # 状态管理
├── styles/        # 全局样式
├── types/         # TypeScript类型定义
├── utils/         # 工具函数
└── views/         # 页面组件
```

## 🎨 设计系统

### 颜色

- **主色调**: `#07C160` (微信绿)
- **成功色**: `#52c41a`
- **警告色**: `#faad14`
- **错误色**: `#ff4d4f`
- **信息色**: `#1890ff`

### 断点

- **移动端小**: `320px`
- **移动端中**: `375px`
- **移动端大**: `414px`
- **平板**: `768px`
- **桌面端**: `1024px`

### 间距

- **xs**: `4px`
- **sm**: `8px`
- **md**: `12px`
- **lg**: `16px`
- **xl**: `20px`
- **2xl**: `24px`
- **3xl**: `32px`

## 📱 移动端特性

### 触摸优化

- 最小触摸目标尺寸: `44px`
- 移除点击高亮效果
- 支持触摸手势

### 安全区域适配

- 支持 iPhone 刘海屏
- 支持 Android 状态栏
- 自动适配安全区域

### 性能优化

- 代码分割和懒加载
- 图片优化和压缩
- 缓存策略

## 🔧 配置

### Tauri 配置

应用窗口配置为移动端尺寸:

```json
{
  "width": 375,
  "height": 667,
  "minWidth": 320,
  "minHeight": 568,
  "maxWidth": 414,
  "maxHeight": 896,
  "resizable": false,
  "decorations": false
}
```

### Vite 配置

- ES2015 目标兼容性
- Terser 压缩
- SCSS 预处理器
- 代码分割

## 📦 可用脚本

```bash
# 开发
pnpm dev              # 启动开发服务器
pnpm tauri:dev        # 启动 Tauri 开发模式

# 构建
pnpm build            # 构建前端
pnpm tauri:build      # 构建桌面应用
pnpm tauri:android    # 构建 Android 应用
pnpm tauri:ios        # 构建 iOS 应用

# 代码质量
pnpm lint             # ESLint 检查
pnpm type-check       # TypeScript 类型检查
```

## 🌍 国际化

支持中英文切换，配置文件位于 `src/locales/index.ts`。

## 🔐 认证系统

- 基于 JWT 的认证
- 本地存储用户信息
- 自动登录检查
- 路由守卫

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如有问题，请创建 Issue 或联系开发团队。
