/*
 * @Author: 朽木白
 * @Date: 2023-11-05 14:53:19
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-05 15:02:05
 * @Description: proxy的语法
 */

const target = {
  name: '白哥',
  age: 18,
}

const handler = {
  get(target, key, receiver) {
      console.log(`获取对象属性${key}值`)
      return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
      console.log(`设置对象属性${key}值`)
      return Reflect.set(target, key, value, receiver)
  },
  deleteProperty(target, key) {
      console.log(`删除对象属性${key}值`)
      return Reflect.deleteProperty(target, key)
  },
}

const proxy = new Proxy(target, handler)

// get
console.log(proxy.name, proxy.age);

// set
proxy.age = '19'

// delete
delete proxy.age