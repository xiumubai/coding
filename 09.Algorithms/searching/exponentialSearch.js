/**
 * 指数搜索算法
 * 时间复杂度: O(log n) - 与二分搜索相同
 * 空间复杂度: O(1) - 只使用了常数级别的额外空间
 * 注意: 数组必须是已排序的
 * 
 * @param {Array} arr - 要搜索的已排序数组
 * @param {*} target - 要查找的目标值
 * @returns {number} - 目标值在数组中的索引，如果未找到则返回-1
 */
function exponentialSearch(arr, target) {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('第一个参数必须是数组');
  }
  
  const n = arr.length;
  
  // 如果数组为空，返回-1
  if (n === 0) {
    return -1;
  }
  
  // 如果目标值就是第一个元素，直接返回0
  if (arr[0] === target) {
    return 0;
  }
  
  // 查找范围的上界
  let i = 1;
  while (i < n && arr[i] <= target) {
    i *= 2; // 指数增长
  }
  
  // 在找到的范围内使用二分搜索
  return binarySearchInRange(arr, target, i / 2, Math.min(i, n - 1));
}

/**
 * 在指定范围内进行二分搜索
 * 
 * @param {Array} arr - 要搜索的已排序数组
 * @param {*} target - 要查找的目标值
 * @param {number} left - 搜索范围的左边界
 * @param {number} right - 搜索范围的右边界
 * @returns {number} - 目标值在数组中的索引，如果未找到则返回-1
 */
function binarySearchInRange(arr, target, left, right) {
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  
  return -1;
}

module.exports = exponentialSearch;