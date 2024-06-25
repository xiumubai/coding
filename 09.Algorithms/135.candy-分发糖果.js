/*
 * @Author: 朽木白
 * @Date: 2023-11-06 22:41:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-06 23:06:27
 * @Description: 分发糖果
 * @docs: https://leetcode.cn/problems/candy/description/
 */

/**

n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。

你需要按照以下要求，给这些孩子分发糖果：

每个孩子至少分配到 1 个糖果。
相邻两个孩子评分更高的孩子会获得更多的糖果。
请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。


示例 1：

输入：ratings = [1,0,2]
输出：5
解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
示例 2：

输入：ratings = [1,2,2]
输出：4
解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
 */

/**
 * @param {number[]} ratings
 * @return {number}
 */

const candy =(ratings) => {
    // 每个人先分配一个
    let nums = new Array(ratings.length).fill(1);
     // 从左往右
    for(let i = 1 ; i < ratings.length; i++){
        if(ratings[i] > ratings[i-1]){
            nums[i] = nums[i-1] +1;
        }
    }
    // 从右往左 
    for(let j = ratings.length - 1; j > 0; j--){
        if (ratings[j] < ratings[j-1] && nums[j-1] <= nums[j]) {
            nums[j-1] = nums[j] + 1;
        }
    }   
    // 求和
    let sum = 0;
    for(let i = 0; i < nums.length; i++){
        sum += nums[i];
    }
    return sum;
}

var ratings = [1, 0, 2]
const result = candy(ratings)
console.log(result)
