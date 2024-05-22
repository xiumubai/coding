/*
 * @Author: 朽木白
 * @Date: 2023-10-13 17:05:39
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-17 20:04:27
 * @Description: 两数之和
 */

/**
 * 题目描述：给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 * 示例: 给定 nums = [2, 7, 11, 15], target = 9，因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
 */

// 时间复杂度O(n)、 空间复杂度O(n)
function twoNumAdd(arr, target) {
  if (Array.isArray(arr)) {
    // 使用map将遍历过的数字存起来，空间换时间
    let map = {};
    for (let i = 0; i < arr.length; i++) {
      // 从map中查找是否有key 等于 target-nums[i]，如果有，则条件成立，返回结果
      if (map[target - arr[i]] !== undefined) {
        return [target - arr[i], arr[i]];
      } else {
        // 条件不成立，将该值存起来
        map[arr[i]] = i;
      }
    }
  }
  return [];
}

var arr = [2, 7, 11, 15]
const result = twoNumAdd(arr, 9)
console.log(result);