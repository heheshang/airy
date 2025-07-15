/**
 * 生成虚拟SVG头像
 * 基于用户ID或名称生成一致的彩色头像
 */

export interface AvatarOptions {
  size?: number
  text?: string
  backgroundColor?: string
  textColor?: string
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
  '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
  '#10AC84', '#EE5A24', '#0652DD', '#9980FA', '#D63031'
]

/**
 * 根据字符串生成哈希值
 */
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转换为32位整数
  }
  return Math.abs(hash)
}

/**
 * 根据文本选择颜色
 */
function getColorForText(text: string): string {
  const hash = hashCode(text)
  return COLORS[hash % COLORS.length]
}

/**
 * 获取首字母
 */
function getInitials(text: string): string {
  if (!text) return '?'
  return text.charAt(0).toUpperCase()
}

/**
 * 安全的base64编码函数
 * 处理Unicode字符和不同环境的兼容性问题
 */
function encodeBase64(str: string): string {
  try {
    // 浏览器环境
    if (typeof btoa !== 'undefined') {
      return btoa(unescape(encodeURIComponent(str)))
    }
    
    // Node.js环境
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(str, 'utf8').toString('base64')
    }
    
    // 纯JavaScript实现
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    let output = ''
    
    str = encodeURIComponent(str)
    str = str.replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16)))
    
    for (let i = 0; i < str.length; i += 3) {
      const a = str.charCodeAt(i)
      const b = str.charCodeAt(i + 1)
      const c = str.charCodeAt(i + 2)
      
      const bitmap = (a << 16) | (b << 8) | c
      
      output += chars.charAt((bitmap >> 18) & 63)
      output += chars.charAt((bitmap >> 12) & 63)
      output += chars.charAt((bitmap >> 6) & 63)
      output += chars.charAt(bitmap & 63)
    }
    
    return output.replace(/A(?=A$|$)/g, '=')
  } catch (error) {
    console.error('Base64 encoding failed:', error)
    return ''
  }
}

/**
 * 生成SVG头像数据URL
 */
export function generateAvatar(options: AvatarOptions = {}): string {
  const {
    size = 40,
    text = '',
    backgroundColor,
    textColor = '#FFFFFF'
  } = options

  const bgColor = backgroundColor || getColorForText(text)
  const initials = getInitials(text)
  
  // 转义特殊字符以防止SVG注入
  const safeInitials = initials
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
  
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${bgColor}" rx="${size * 0.2}"/>
      <text 
        x="${size / 2}" 
        y="${size / 2}" 
        font-family="Arial, sans-serif" 
        font-size="${size * 0.4}" 
        font-weight="bold" 
        fill="${textColor}" 
        text-anchor="middle" 
        dominant-baseline="central"
      >
        ${safeInitials}
      </text>
    </svg>
  `.trim()

  const base64 = encodeBase64(svg)
  return base64 ? `data:image/svg+xml;base64,${base64}` : ''
}

/**
 * 生成用户头像
 */
export function generateUserAvatar(name: string, size: number = 40): string {
  return generateAvatar({ text: name, size })
}

/**
 * 生成频道头像
 */
export function generateChannelAvatar(channelName: string, size: number = 40): string {
  // 移除#前缀
  const cleanName = channelName.replace(/^#/, '')
  return generateAvatar({ text: cleanName, size })
}

/**
 * 生成系统头像
 */
export function generateSystemAvatar(size: number = 40): string {
  return generateAvatar({ 
    text: 'SYS', 
    size, 
    backgroundColor: '#6C757D',
    textColor: '#FFFFFF'
  })
}

/**
 * 生成机器人头像
 */
export function generateBotAvatar(size: number = 40): string {
  return generateAvatar({ 
    text: 'BOT', 
    size, 
    backgroundColor: '#28A745',
    textColor: '#FFFFFF'
  })
}
