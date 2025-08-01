/**
 * 插值搜索算法
 * 时间复杂度: 平均情况 O(log log n)，最坏情况 O(n)
 * 空间复杂度: O(1) - 只使用了常数级别的额外空间
 * 注意: 数组必须是已排序的，且元素分布应相对均匀
 * 
 * @param {Array<number>} arr - 要搜索的已排序数字数组
 * @param {number} target - 要查找的目标值
 * @returns {number} - 目标值在数组中的索引，如果未找到则返回-1
 */
function interpolationSearch(arr, target) {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('第一个参数必须是数组');
  }
  
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    // 如果数组只有一个元素
    if (low === high) {
      if (arr[low] === target) {
        return low;
      }
      return -1;
    }
    
    // 使用插值公式计算可能的位置
    // 公式: low + ((target - arr[low]) * (high - low) / (arr[high] - arr[low]))
    // 这个公式根据目标值在范围内的相对位置来估计索引
    const pos = low + Math.floor(
      ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );
    
    // 找到目标值，返回索引
    if (arr[pos] === target) {
      return pos;
    }
    
    // 如果当前位置的值大于目标值，在左半部分继续搜索
    if (arr[pos] > target) {
      high = pos - 1;
    } 
    // 如果当前位置的值小于目标值，在右半部分继续搜索
    else {
      low = pos + 1;
    }
  }
  
  // 未找到目标值，返回-1
  return -1;
}

module.exports = interpolationSearch;