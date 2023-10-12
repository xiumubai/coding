/*
 * @Author: 朽木白
 * @Date: 2023-10-12 15:06:04
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-12 15:28:21
 * @Description: 二分查找法
 */

/**
 * 在计算机科学中，二分查找（Binary Search），也称为折半查找、对数查找或二分法，是一种用于在有序数组中查找目标值位置的搜索算法。
 * 二分查找将目标值与数组的中间元素进行比较；如果它们不相等，则可以排除目标值不可能存在的一半，并在剩余的一半上继续搜索，直到找到目标值或搜索结束。如果搜索结束时剩余的一半为空，则表示数组中不存在目标值
 * 注意：数组必须是有序的
 * 时间复杂度：O(log(n)) - 因为每次迭代都将搜索区域分成两半
 */

function binarySearch(array, target) {
  let left = 0
  let right = array.length - 1

  while(left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (array[mid] === target) {
      return mid
    } else if(array[mid] < target) {
      // 左边界直接移动到mid+1
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  // 未找到
  return -1
}

let array = [1,3,4,5,6]
console.log(binarySearch(array, 6))

