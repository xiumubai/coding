/**
 * 线性搜索算法
 * 时间复杂度: O(n) - 最坏情况下需要遍历整个数组
 * 空间复杂度: O(1) - 只使用了常数级别的额外空间
 * 
 * @param {Array} arr - 要搜索的数组
 * @param {*} target - 要查找的目标值
 * @returns {number} - 目标值在数组中的索引，如果未找到则返回-1
 */
function linearSearch(arr, target) {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('第一个参数必须是数组');
  }
  
  // 遍历数组查找目标值
  for (let i = 0; i < arr.length; i++) {
    // 找到目标值，返回索引
    if (arr[i] === target) {
      return i;
    }
  }
  
  // 未找到目标值，返回-1
  return -1;
}

module.exports = linearSearch;