/*
 * @Author: 朽木白
 * @Date: 2023-10-15 16:27:29
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-15 16:50:30
 * @Description: 斐波那契数列
 */

/**
 * 描述：[1, 1, 2, 3, 5, 8],当前的数字是前两数之和
 * 求：第n位数字
 */


/**
 * 使用递归
 */
function fibonacciRecursive(n) {
  if(n === 1 || n === 2) {
    return 1
  }
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}
const r1 = fibonacciRecursive(6)
console.log(r1)

/**
 * 使用迭代
 */
function fibonacciIterative(n) {
  if(n === 1 || n === 2) {
    return 1
  }
  
  let fib = [1, 1]
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n - 1]
}
const r2 = fibonacciIterative(6)
console.log(r2)

// 对空间复杂度进行优化

/**
 * 空间复杂度为O(1)的做法
 * 我们每次只需要关注前两位，就可以得出当前的项
 * n = p1 + p2
 * @param {*} n 
 */
function fibonicci(n) {

  if(n === 1 || n === 2) {
    return 1
  }

  let p1 = 1,
    p2 = 1,
    r;
  for (let i = 2; i < n; i++) {
    r = p1 + p2
    p1 = p2
    p2 = r
  }
  return r
}

const result = fibonicci(6)
console.log(result);