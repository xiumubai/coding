/*
 * @Author: 朽木白
 * @Date: 2023-10-15 15:48:48
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-15 16:12:42
 * @Description: 背包问题
 */

/**
 * 物品价值：[5, 10, 3, 6, 3]
 * 物品重量：[2, 5, 1, 4, 3]
 * 背包重量容量：6
 * 问：这个背包装的最大价值是多少
 */


/**
 * 解题思路：
 * 1.选择   
 * 2.不选择
 * next[j] = Math.max(value[i] + result[j - weight[i]], result[j])
 * 算法复杂度：O(weight)
 */

/**
 * @description: 求最大价值
 * @param {*} baseWeight 背包重量容量
 * @param {*} value 物品价值
 * @param {*} weight 物品重量
 */
function package(baseWeight, value, weight) {
  
  let result = []
  // 第一次：循环背包的容量
  for(let i = 0; i <= baseWeight; i++) {
    result[i] = i >= weight[0] ? value[0] : 0
  }

  // 循环剩下的
  for(let i = 1; i < value.length; i++) {
    let next = []
    for(let j = 0; j <= baseWeight; j++) {
      if (j >= weight[i]) {
        next[j] = Math.max(value[i] + result[j - weight[i]], result[j])
      } else {
        next[j] = result[j]
      }
    }
    result = next
  }

  return result[baseWeight]
}

const result = package(6, [5, 10, 3, 6, 3], [2, 5, 1, 4, 3])

console.log(result)


