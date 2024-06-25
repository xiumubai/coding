/*
 * @Author: 朽木白
 * @Date: 2023-11-13 22:39:41
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-13 22:45:59
 * @Description: 指数
 */

/**
 * 细胞分裂
 * 算法复杂度:O(2^n)
 * @param {*} n 分裂的层级
 * @returns 
 */
function exponential(n) {
  let count = 0,
      base = 1;

  for (let i = 0; i < n; i++) {
    
    for (let j = 0; j < base; j++) {
      count++
    }
    base *= 2
  }
  return count
}

const result = exponential(2)

console.log(result)