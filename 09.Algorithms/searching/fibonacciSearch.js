/**
 * 斐波那契搜索算法
 * 时间复杂度: O(log n) - 与二分搜索相同
 * 空间复杂度: O(1) - 只使用了常数级别的额外空间
 * 注意: 数组必须是已排序的
 * 
 * @param {Array} arr - 要搜索的已排序数组
 * @param {*} target - 要查找的目标值
 * @returns {number} - 目标值在数组中的索引，如果未找到则返回-1
 */
function fibonacciSearch(arr, target) {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('第一个参数必须是数组');
  }
  
  const n = arr.length;
  
  // 如果数组为空，返回-1
  if (n === 0) {
    return -1;
  }
  
  // 初始化斐波那契数列
  let fibMMinus2 = 0; // (m-2)th Fibonacci number
  let fibMMinus1 = 1; // (m-1)th Fibonacci number
  let fibM = fibMMinus1 + fibMMinus2; // mth Fibonacci number
  
  // 找到大于或等于数组长度的最小斐波那契数
  while (fibM < n) {
    fibMMinus2 = fibMMinus1;
    fibMMinus1 = fibM;
    fibM = fibMMinus1 + fibMMinus2;
  }
  
  // 标记已经被排除的范围
  let offset = -1;
  
  // 当还有元素需要检查时
  while (fibM > 1) {
    // 检查 fibMMinus2 是否是一个有效的索引
    const i = Math.min(offset + fibMMinus2, n - 1);
    
    // 如果目标值大于当前位置的值，向右移动
    if (arr[i] < target) {
      fibM = fibMMinus1;
      fibMMinus1 = fibMMinus2;
      fibMMinus2 = fibM - fibMMinus1;
      offset = i;
    }
    // 如果目标值小于当前位置的值，向左移动
    else if (arr[i] > target) {
      fibM = fibMMinus2;
      fibMMinus1 = fibMMinus1 - fibMMinus2;
      fibMMinus2 = fibM - fibMMinus1;
    }
    // 找到目标值，返回索引
    else {
      return i;
    }
  }
  
  // 检查最后一个元素
  if (fibMMinus1 && arr[offset + 1] === target) {
    return offset + 1;
  }
  
  // 未找到目标值，返回-1
  return -1;
}

module.exports = fibonacciSearch;