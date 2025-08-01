/**
 * 二分搜索算法
 * 时间复杂度: O(log n) - 每次迭代将搜索范围减半
 * 空间复杂度: O(1) - 只使用了常数级别的额外空间
 * 注意: 数组必须是已排序的
 * 
 * @param {Array} arr - 要搜索的已排序数组
 * @param {*} target - 要查找的目标值
 * @returns {number} - 目标值在数组中的索引，如果未找到则返回-1
 */
function binarySearchIterative(arr, target) {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('第一个参数必须是数组');
  }
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    // 计算中间索引 (避免整数溢出的写法)
    const mid = left + Math.floor((right - left) / 2);
    
    // 找到目标值，返回索引
    if (arr[mid] === target) {
      return mid;
    }
    
    // 如果中间值大于目标值，在左半部分继续搜索
    if (arr[mid] > target) {
      right = mid - 1;
    } 
    // 如果中间值小于目标值，在右半部分继续搜索
    else {
      left = mid + 1;
    }
  }
  
  // 未找到目标值，返回-1
  return -1;
}

/**
 * 二分搜索的递归实现
 * 
 * @param {Array} arr - 要搜索的已排序数组
 * @param {*} target - 要查找的目标值
 * @param {number} left - 搜索范围的左边界
 * @param {number} right - 搜索范围的右边界
 * @returns {number} - 目标值在数组中的索引，如果未找到则返回-1
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  // 基本情况：如果左边界大于右边界，则未找到目标值
  if (left > right) {
    return -1;
  }
  
  // 计算中间索引
  const mid = left + Math.floor((right - left) / 2);
  
  // 找到目标值，返回索引
  if (arr[mid] === target) {
    return mid;
  }
  
  // 如果中间值大于目标值，在左半部分继续搜索
  if (arr[mid] > target) {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
  
  // 如果中间值小于目标值，在右半部分继续搜索
  return binarySearchRecursive(arr, target, mid + 1, right);
}

module.exports = { binarySearchIterative, binarySearchRecursive };