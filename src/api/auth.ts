export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  success: boolean
  message: string
}

export function login({ username, password }: LoginParams): Promise<LoginResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'admin' && password === '123456') {
        resolve({ success: true, message: `欢迎，${username}！` })
      } else {
        resolve({ success: false, message: '用户名或密码错误' })
      }
    }, 1000)
  })
} 