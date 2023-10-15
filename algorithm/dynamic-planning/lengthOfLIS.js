/*
 * @Author: 朽木白
 * @Date: 2023-10-12 13:45:41
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-15 20:03:38
 * @Description: 最长递增子序列
 * @docs: https://leetcode.cn/problems/longest-increasing-subsequence/description/
 */


/**
 * 该算法在vue3 diff算法中有用到，作用是找到最长递归子序列后，可以减少子元素的移动次数
 * 题目：
 * 一个整数数组 nums，找到其中一组最长递增子序列的值
 * 最长递增子序列是指：子序列中的所有元素单调递增
 * 例如：[3,5,7,1,2,8] 的 LIS 是 [3,5,7,8]
 */

// 该算法用的是动态规划的思想，时间复杂度为n²，并不是最优算法，最优算法应该是二分查找，最优时间复杂度为nlogn

// [7, 13, 18, 15, 8, 10, 11, 12]
// [7]
// [7,13]
// [7, 13, 18]
// [7, 13, 15]
// [7, 8, 15]
// [7,8, 10]
// [7, 8, 10, 11, 12]

// 当遍历的数字大于记录的最后一项，新增记录，
// 否则，找到记录当中，第一个末尾大于该数字的记录，更改其末尾，

function lengthOfLIS(nums) {
  if (nums.lenght === 0) return 0
  let tails = [nums[0]]

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > tails[tails.length - 1]) {
      tails.push(nums[i])
    } else {
      const index = getFirstGreaterIndex(nums[i])
      tails[index] = nums[i]
    }
  }

  return tails.length

  function getFirstGreaterIndex(target) {
    for (let i = 0; i < tails.length; i++) {
      if (tails[i] >= target) {
        return i
      }
    }
  }
}

const nums = [7, 13, 18, 15, 8, 10, 11, 12, 13]
const result = lengthOfLIS(nums)
console.log(result)

