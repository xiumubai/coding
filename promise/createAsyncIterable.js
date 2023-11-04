/*
 * @Author: 朽木白
 * @Date: 2023-11-04 22:56:32
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-04 23:00:27
 * @Description: 串行执行多个Promise
 */

// 一个封装的延迟函数，然后一个装有3,4,5的数组，
// 需求就是在开始执行时依次等待3, 4, 5秒，并在之后打印对应输出
function delay(time) {
  return new Promise((resolve, reject) => {
    console.log(`wait ${time}s`)
    setTimeout(() => {
      resolve()
    }, time * 1000)
  })
}

const arr = [3, 4, 5];

// 1.reduce
// arr.reduce((s, v) => {
//   return s.then(() => delay(v))
// }, Promise.resolve())

// 2. async + 循环 + await
// (
//   async function () {
//     for (const v of arr) {
//       await delay(v)
//     }
//   }
// )()

// 3. for wait of
function createAsyncIterable(arr) {
  return {
    [Symbol.asyncIterator]() {
      return {
        i: 0,
        next() {
          if (this.i < arr.length) {
            return delay(arr[this.i]).then(() => ({ value: this.i++, done: false }));
          }

          return Promise.resolve({ done: true });
        }
      };
    }
  }
}

(async function () {
  for await (i of createAsyncIterable(arr)) { }
})();
