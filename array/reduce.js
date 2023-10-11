/*
 * @Author: 朽木白
 * @Date: 2023-10-11 17:10:04
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-11 17:15:37
 * @Description: reduce方法
 */

// 使用

// 求和

// 使用高阶函数
const arr = [5, 7, 1, 8, 4];
const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue,0);
console.log(sum)//25

// 实现

Array.prototype.myReduce = function(callback, initValue) {
  let accumulator = initValue !== undefined ? initValue : this[0]
  const startIndex = initValue !== undefined ? 0 : 1

  for(let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], this)
  }

  return accumulator
}

const sum2 = arr.myReduce((accumulator, currentValue) => accumulator + currentValue,0)
console.log(sum2);