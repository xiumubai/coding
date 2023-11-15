/*
 * @Author: 朽木白
 * @Date: 2023-11-01 15:17:54
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-14 10:59:51
 * @Description: 沿原型链往上查找
 */
const myInstanceof = (left, right) => {
  let proto = Object.getPrototypeOf(left)
  while(true) {
      if(proto === right.prototype) return true
      if(proto === null ) return false
      proto = Object.getPrototypeOf(proto)
  }
}
