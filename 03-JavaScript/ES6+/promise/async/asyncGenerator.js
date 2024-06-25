/*
 * @Author: 朽木白
 * @Date: 2023-11-04 22:13:53
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-04 22:41:43
 * @Description: async await的实现
 */


function request(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 10)
    }, 1000)
  })
}

// 用async await实现
// async function fn() {
//   const res1 = await(request(1))
//   const res2 = await(request(res1))
//   return res2
// }

// fn().then(res =>{
//   console.log(res);
// })


function* gen() {
  const res1 = yield request(1)
  const res2 = yield request(res1)
  return res2
}

// generatorToAsync方式实现
function generatorToAsync(generatorFn) {
  return function () {
    const g = generatorFn()
    return new Promise((resolve, reject) => {
      const n = g.next()
      n.value.then(res => {
        const n2 = g.next(res)
        n2.value.then(res2 => {
          resolve(res2.next().value)
        })
      })
    })
  }
}

const asyncFn = generatorToAsync(gen)

asyncFn().then(res=> {
  console.log(res);
})
