// 用户相关类型
export interface User {
  id: string | number
  username: string
  email?: string
  avatar?: string
  role?: string
  status?: 'active' | 'inactive'
  createdAt?: string
  updatedAt?: string
}

// 认证相关类型
export interface LoginParams {
  username: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  success: boolean
  message: string
  token?: string
  user?: User
}

// API响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

// 分页类型
export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  list: T[]
  pagination: Pagination
}

// 文件上传类型
export interface UploadFile {
  file: File
  name: string
  size: number
  type: string
  url?: string
  progress?: number
  status?: 'uploading' | 'success' | 'error'
}

// 路由元信息类型
export interface RouteMeta {
  title?: string
  requiresAuth?: boolean
  roles?: string[]
  icon?: string
  hidden?: boolean
  keepAlive?: boolean
}

// 菜单项类型
export interface MenuItem {
  id: string
  title: string
  path?: string
  icon?: string
  children?: MenuItem[]
  meta?: RouteMeta
}

// 表格列类型
export interface TableColumn {
  key: string
  title: string
  dataIndex: string
  width?: number | string
  fixed?: 'left' | 'right'
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  render?: (value: any, record: any, index: number) => any
}

// 表单字段类型
export interface FormField {
  name: string
  label: string
  type: 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file'
  required?: boolean
  placeholder?: string
  options?: Array<{ label: string; value: any }>
  rules?: any[]
  disabled?: boolean
}

// 通知类型
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  showClose?: boolean
}

// 主题类型
export type Theme = 'light' | 'dark'

// 语言类型
export type Language = 'zh' | 'en'

// 设备类型
export type DeviceType = 'desktop' | 'tablet' | 'mobile'

// 状态类型
export type Status = 'active' | 'inactive' | 'pending' | 'deleted'

// 性别类型
export type Gender = 'male' | 'female' | 'other'

// 权限类型
export interface Permission {
  id: string
  name: string
  code: string
  description?: string
}

// 角色类型
export interface Role {
  id: string
  name: string
  code: string
  description?: string
  permissions?: Permission[]
}

// 系统配置类型
export interface SystemConfig {
  siteName: string
  siteDescription?: string
  logo?: string
  favicon?: string
  theme: Theme
  language: Language
  timezone: string
  dateFormat: string
  timeFormat: string
} 