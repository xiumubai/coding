/*
 * @Author: 朽木白
 * @Date: 2023-10-12 13:45:41
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-12 14:20:23
 * @Description: 最长递增子序列
 * @docs: https://leetcode.cn/problems/longest-increasing-subsequence/solutions/405249/shi-pin-tu-jie-zui-chang-shang-sheng-zi-xu-lie-by-/
 */


/**
 * 该算法在vue3 diff算法中有用到，作用是找到最长递归子序列后，可以减少子元素的移动次数
 * 题目：
 * 一个整数数组 nums，找到其中一组最长递增子序列的值
 * 最长递增子序列是指：子序列中的所有元素单调递增
 * 例如：[3,5,7,1,2,8] 的 LIS 是 [3,5,7,8]
 */

// 该算法用的是动态规划的思想，时间复杂度为n²，并不是最优算法，最优算法应该是二分查找，最优时间复杂度为nlogn


function lengthOfLIS(nums) {
  if (!nums.length) return 0;
  // 创建一个和原数组等长的数组dp，用来存储每一项的最长递增子序列，比如[1,2,2] 表示第二项和第三项的最长递增子序列都为2
  // 该数组每一项初始值都为1，记录当前项的最长递增子序列，后面的项会在当前项的最长递增子序列个数进行累加
  let dp = new Array(nums.length).fill(1);
  // 双层for循环，每一项都和之前的所有项一一进行比较，计算出该项的最长递增子序列个数，存储到dp中
  for (let i = 0; i < nums.length; i++) {
    // 当前项依次和之前的每一项进行比较，累加出当前项的最长递增子序列
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        // 比较当前项已有的最大值和之前项最大值，比如当比较到第三项[1,2,2]时，如第三项比第二项大，所以第三项的计算结果为[1,2,3]
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  // 取出一组最长递增子序列的具体值（注意：最长递增子序列有可能有多组值，这里是只取出其中一组值）
  // 找到dp中的最大值，该值就是nums的最长递增子序列的个数
  let max = Math.max(...dp);
  let result = [];
  for (let i = max; i >= 1; i--) {
    // 倒序遍历，根据长度获取对应的值
    findArrNode(dp, i, result, nums);
  }
  return result;
}
function findArrNode(dp, value, result, arr) {
  // 找到符合条件最后一项的下标，这样才能保证数组的顺序是正确的
  let index = dp.lastIndexOf(value);
  // 存储对应的值
  result.unshift(arr[index]);
  // 对dp进行截取，保证只取最大项之前的数据
  dp.length = index + 1;
}

// 测试
console.log(lengthOfLIS([9, 1, 7, 10, 4, 8, 5, 2])); // [1, 4, 5]
console.log(lengthOfLIS([1, 4, 3, 5, 2, 6, 0])); // [1, 3, 5, 6]
