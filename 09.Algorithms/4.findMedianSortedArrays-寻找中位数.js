/*
 * @Author: 朽木白
 * @Date: 2023-11-06 22:41:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-06 22:44:57
 * @Description: 寻找两个正序数组的中位数
 * @docs: https://leetcode.cn/problems/median-of-two-sorted-arrays/description/
 */

/**
 * 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
 * 算法的时间复杂度应该为 O(log (m+n)) 
 * 示例：
 * 输入：nums1 = [1,3], nums2 = [2]
 * 输出：2.00000
 * 解释：合并数组 = [1,2,3] ，中位数 2
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

function findMedianSortedArrays(nums1, nums2) {
    const len1 = nums1.length
    const len2 = nums2.length
    const merge = new Array(len1 + len2)
    let i = 0, j = 0, k = 0;
    while (i < len1 && j < len2) {
        merge[k++] = nums1[i] < nums2[j] ? nums1[i++] : nums2[j++];
    }
    while (i < len1) {
        merge[k++] = nums1[i++];
    }
    while (j < len2) {
        merge[k++] = nums2[j++];
    }
    
    const len = merge.length
    return len % 2 == 0 ? (merge[len / 2] + merge[len / 2 - 1]) / 2 : merge[(len - 1) / 2];
};

var nums1 = [1, 2];
var nums2 = [3, 4];
const result = findMedianSortedArrays(nums1, nums2)

console.log(result)
