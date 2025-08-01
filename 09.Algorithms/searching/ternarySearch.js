/**
 * 三分搜索算法
 * 时间复杂度: O(log3 n) - 每次迭代将搜索范围减少到原来的1/3
 * 空间复杂度: O(1) - 只使用了常数级别的额外空间
 * 注意: 数组必须是已排序的
 * 
 * @param {Array} arr - 要搜索的已排序数组
 * @param {*} target - 要查找的目标值
 * @returns {number} - 目标值在数组中的索引，如果未找到则返回-1
 */
function ternarySearch(arr, target) {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('第一个参数必须是数组');
  }
  
  // 对于大型数组，直接使用迭代方法避免栈溢出
  if (arr.length > 1000) {
    return ternarySearchIterative(arr, target);
  }
  
  return ternarySearchRecursive(arr, target, 0, arr.length - 1);
}

/**
 * 三分搜索的递归实现
 * 
 * @param {Array} arr - 要搜索的已排序数组
 * @param {*} target - 要查找的目标值
 * @param {number} left - 搜索范围的左边界
 * @param {number} right - 搜索范围的右边界
 * @returns {number} - 目标值在数组中的索引，如果未找到则返回-1
 */
function ternarySearchRecursive(arr, target, left, right) {
  if (left > right) {
    return -1;
  }
  
  // 计算三等分点
  const mid1 = left + Math.floor((right - left) / 3);
  const mid2 = right - Math.floor((right - left) / 3);
  
  // 检查三等分点是否为目标值
  if (arr[mid1] === target) {
    return mid1;
  }
  
  if (arr[mid2] === target) {
    return mid2;
  }
  
  // 如果目标值小于第一个三等分点，在左侧1/3部分继续搜索
  if (target < arr[mid1]) {
    return ternarySearchRecursive(arr, target, left, mid1 - 1);
  }
  
  // 如果目标值大于第二个三等分点，在右侧1/3部分继续搜索
  if (target > arr[mid2]) {
    return ternarySearchRecursive(arr, target, mid2 + 1, right);
  }
  
  // 如果目标值在两个三等分点之间，在中间1/3部分继续搜索
  return ternarySearchRecursive(arr, target, mid1 + 1, mid2 - 1);
}

/**
 * 三分搜索的迭代实现
 * 
 * @param {Array} arr - 要搜索的已排序数组
 * @param {*} target - 要查找的目标值
 * @returns {number} - 目标值在数组中的索引，如果未找到则返回-1
 */
function ternarySearchIterative(arr, target) {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('第一个参数必须是数组');
  }
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    // 计算三等分点
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);
    
    // 检查三等分点是否为目标值
    if (arr[mid1] === target) {
      return mid1;
    }
    
    if (arr[mid2] === target) {
      return mid2;
    }
    
    // 如果目标值小于第一个三等分点，在左侧1/3部分继续搜索
    if (target < arr[mid1]) {
      right = mid1 - 1;
    }
    // 如果目标值大于第二个三等分点，在右侧1/3部分继续搜索
    else if (target > arr[mid2]) {
      left = mid2 + 1;
    }
    // 如果目标值在两个三等分点之间，在中间1/3部分继续搜索
    else {
      left = mid1 + 1;
      right = mid2 - 1;
    }
  }
  
  // 未找到目标值，返回-1
  return -1;
}

module.exports = { ternarySearchRecursive, ternarySearchIterative, ternarySearch };