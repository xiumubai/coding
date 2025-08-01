/**
 * 跳跃搜索算法
 * 时间复杂度: O(√n) - 最优步长为√n
 * 空间复杂度: O(1) - 只使用了常数级别的额外空间
 * 注意: 数组必须是已排序的
 * 
 * @param {Array} arr - 要搜索的已排序数组
 * @param {*} target - 要查找的目标值
 * @returns {number} - 目标值在数组中的索引，如果未找到则返回-1
 */
function jumpSearch(arr, target) {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('第一个参数必须是数组');
  }
  
  const n = arr.length;
  
  // 如果数组为空，返回-1
  if (n === 0) {
    return -1;
  }
  
  // 计算最优步长: √n
  let step = Math.floor(Math.sqrt(n));
  
  // 跳跃查找块
  let prev = 0;
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    
    // 如果超出数组范围，则未找到目标值
    if (prev >= n) {
      return -1;
    }
  }
  
  // 在当前块中进行线性搜索
  while (arr[prev] < target) {
    prev++;
    
    // 如果到达下一个块或数组末尾，则未找到目标值
    if (prev === Math.min(step, n)) {
      return -1;
    }
  }
  
  // 找到目标值，返回索引
  if (arr[prev] === target) {
    return prev;
  }
  
  // 未找到目标值，返回-1
  return -1;
}

module.exports = jumpSearch;