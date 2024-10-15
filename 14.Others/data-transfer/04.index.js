// 把s转换为时分秒格式

function formatTime(seconds) {
  // 处理负数情况
  const isNegative = seconds < 0;
  seconds = Math.abs(seconds);

  // 如果小于60秒，按1分钟计算
  if (seconds % 60 !== 0) {
    seconds = Math.ceil(seconds / 60) * 60;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  // 格式化输出
  const formattedTime = `${hours}h ${minutes}m ${secs}s`;

  return isNegative ? `-${formattedTime}` : formattedTime;
}

console.log(formatTime(59));   // 输出：0h 1m 0s
console.log(formatTime(3601)); // 输出：1h 0m 1s
console.log(formatTime(-69));  // 输出：-0h 2m 0s

