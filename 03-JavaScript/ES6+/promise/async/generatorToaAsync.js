/*
 * @Author: 朽木白
 * @Date: 2023-11-04 22:46:35
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-04 22:47:31
 * @Description: async功能函数的实现
 */

function request(num) {
  return new Promise((resolve, reject) => {
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

// generatorToAsync方式实现
function generatorToAsync(generatorFn) {
  return function () {
    const gen = generatorFn.apply(this, arguments)
    // const gen = generatorFn()
    return new Promise((resolve, reject) => {

      function loop(key,arg) {
        let res = null;

        res = gen[key](arg); // 等价于gen.next(arg)  // { value: Promise { <pending> }, done: false }
        const { value, done } = res;
        if(done) {
          return resolve(value);
        } else {   
          // 没执行完yield
          // Promise.resolve(value) 为了保证value 中 Promise状态已经变更成'fulfilled'
          Promise.resolve(value).then(val => loop('next',val));
        }
      }
      loop('next')
    })
  }
}

const asyncFn = generatorToAsync(gen)

asyncFn().then(res=> {
  console.log(res);
})