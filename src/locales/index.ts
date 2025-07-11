import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    common: {
      login: '登录',
      logout: '退出登录',
      username: '用户名',
      password: '密码',
      confirm: '确认',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      add: '添加',
      search: '搜索',
      loading: '加载中...',
      success: '操作成功',
      error: '操作失败',
      welcome: '欢迎使用'
    },
    auth: {
      loginTitle: '用户登录',
      loginSubtitle: '请登录您的账户',
      usernameRequired: '请输入用户名',
      passwordRequired: '请输入密码',
      loginSuccess: '登录成功',
      loginFailed: '登录失败',
      logoutSuccess: '退出成功'
    }
  },
  en: {
    common: {
      login: 'Login',
      logout: 'Logout',
      username: 'Username',
      password: 'Password',
      confirm: 'Confirm',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
      welcome: 'Welcome'
    },
    auth: {
      loginTitle: 'User Login',
      loginSubtitle: 'Please login to your account',
      usernameRequired: 'Please enter username',
      passwordRequired: 'Please enter password',
      loginSuccess: 'Login successful',
      loginFailed: 'Login failed',
      logoutSuccess: 'Logout successful'
    }
  }
}

const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'en',
  messages
})

export default i18n 