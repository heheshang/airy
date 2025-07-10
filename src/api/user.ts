import axios from 'axios'

export async function fetchUserProfile() {
  // 实际 API 地址请替换为你的后端接口
  const res = await axios.post('/api/user/profile')
  return res.data
} 