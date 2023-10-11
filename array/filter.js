/*
 * @Author: 朽木白
 * @Date: 2023-10-11 16:28:51
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-11 16:32:18
 * @Description: filter方法
 */


// 使用

const arr = [
  { name: "Fluffykins", species: "rabbit" },
  { name: "Caro", species: "dog" },
]

// 返回满足条件的元素
const newArr = arr.filter(i => i.name === 'Caro')

console.log(newArr);

// 实现

Array.prototype.myFilter = function(callback) {
  const result = []
  for(let i = 0; i < this.length; i++) {
    if(callback(this[i], i ,this)) {
      result.push(this[i])
    }
  }

  return result
}

const newArr2 = arr.myFilter(i => i.name === 'Caro')

console.log(newArr2)