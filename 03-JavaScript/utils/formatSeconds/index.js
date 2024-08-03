/**
 * 格式化秒为HH:MM:SS
 * @param {number} s
 * @returns 
 */
const formatSeconds = (s) =>
  [parseInt(s / 60 / 60), parseInt((s / 60) % 60), parseInt(s % 60)]
    .join(':')
    .replace(/\b(\d)\b/g, '0$1')

// 测试

console.log(formatSeconds(36611)) // 01:01:01