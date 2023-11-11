/*
 * @Author: 朽木白
 * @Date: 2023-11-11 21:06:17
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-11 21:09:41
 * @Description: 洋葱模型
 * @docs: https://juejin.cn/post/7179617351036796965
 */

/**
 

洋葱模型是一个非常简单的概念，它的核心是一个函数，这个函数接受一个函数数组，返回一个函数，这个函数就是洋葱模型的核心。

这个返回的函数就是聚合了所有中间件的函数，它的执行顺序是从外到内，从内到外

例如：

- 传入一个中间件数组，数组中有三个中间件，分别是a、b、c。
- 返回的函数执行时，会先执行a，然后执行b，最后执行c。
- 执行完c后，会从内到外依次执行b、a。
- 执行完a后，返回执行结果。

 */

class Compose {
  constructor(middleware) {
      if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
      for (const fn of middleware) {
          if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
      }
      this.index = -1
      this.middleware = middleware
      
      return (next) => {
          this.next = next
          return this.dispatch(0)
      }
  }
  
  dispatch(i) {
      if (i <= this.index) return Promise.reject(new Error('next() called multiple times'))
      this.index = i
      
      let fn = this.middleware[i]
      if (i === this.middleware.length) fn = this.next
      if (!fn) return Promise.resolve()
      
      try {
          return Promise.resolve(fn(this.dispatch.bind(this, i + 1)))
      } catch (err) {
          return Promise.reject(err)
      }
  }
}

var middleware = [
  (next) => {
      console.log(1)
      next()
      console.log(2)
  },
  (next) => {
      console.log(3)
      next()
      console.log(4)
  },
  (next) => {
      console.log(5)
      next()
      console.log(6)
  }
]

var compose = new Compose(middleware)

compose()

// var middleware = [
//   (next) => {
//       return next().then((res) => {
//           return res + '1'
//       })
//   },
//   (next) => {
//       return next().then((res) => {
//           return res + '2'
//       })
//   },
//   (next) => {
//       return next().then((res) => {
//           return res + '3'
//       })
//   }
// ]

// var compose = new Compose(middleware)

// compose(() => {
//   return Promise.resolve('0')
// }).then((res) => {
//   console.log(res)
// })
