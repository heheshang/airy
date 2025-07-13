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
        ${initials}
      </text>
    </svg>
  `.trim()

  return `data:image/svg+xml;base64,${btoa(svg)}`
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
