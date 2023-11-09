/*
 * @Author: 朽木白
 * @Date: 2023-11-09 12:56:02
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-09 13:28:52
 * @Description: 函数重载
 */

/**
 * 参数归一
 * 函数重载：
 *  - 同名函数可以定义多次
 *  - 参数数量或者类型不一样
 */

function createOverLoad() {
  const fnMap = new Map()
  function overload(...args) {
    const key = args.map(it => typeof it).join(',')
    const fn = fnMap.get(key)
    if(!fn) {
      throw new TypeError('没有找到对应函数的实现')
    }
    return fn.apply(this, args)
  }
  overload.addImpl = function(...args) {
    const fn = args.pop()
    if(typeof fn !== 'function') {
      throw new TypeError('最后一个参数必须是函数')
    }
    const key = args.join(',')
    fnMap.set(key, fn)
  }
  return overload
}

const getUsers = createOverLoad()

getUsers.addImpl(() => {
  console.log('获取所有的用户');
})

const searchPage = (page, size = 10) => {
  console.log('按照页码和数量查询用户');
}

getUsers.addImpl('number', searchPage)
getUsers.addImpl('number', 'number', searchPage)

getUsers.addImpl('string', (name) => {
  console.log(`获取所有姓${name}的用户`);
})

getUsers.addImpl('string', 'string', (name, sex) => {
  console.log(`获取所有姓${name},性别为${sex}的用户`);
})

getUsers() // 获取所有的用户
getUsers(1, 20) // 获取1-20个用户
getUsers('张') // 获取所有姓张的用户
getUsers('张', '男') // 获取姓张，性别为男的用户