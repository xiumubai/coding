/*
 * @Author: 朽木白
 * @Date: 2023-10-11 15:06:29
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-16 16:58:37
 * @Description: map方法的实现原理
 */

// 使用

const arr = [
  { name: "Fluffykins", species: "rabbit" },
  { name: "Caro", species: "dog" },
]

const newArr = arr.map(i => i.name)

// console.log(newArr);

// 不会改变原来的数组，创建一个新的数组

// 实现

Array.prototype.myMap = function(callback) {
  const result = []

  for(let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }

  return result
}

// 测试用例
const numbers = [1, 2, 3, 4, 5];

// 测试用例 1: 将数组中的每个元素翻倍
const doubled = numbers.myMap(function(item) {
  return item * 2
});

console.log(doubled); // 期望输出 [2, 4, 6, 8, 10]