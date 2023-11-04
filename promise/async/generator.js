/*
 * @Author: 朽木白
 * @Date: 2023-11-04 21:06:49
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-04 22:42:27
 * @Description: Generator函数的用法
 */

function request(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * 10)
    }, 1000)
  })
}

function* gen() {
  const res1 = yield request(1)
  const res2 = yield request(res1)
  return res2
}

const g = gen()

const n = g.next()

n.value.then(res => {
  console.log(res);
  const n2 = g.next(res)
  n2.value.then(res2 => {
    console.log(res2);
  })
})
