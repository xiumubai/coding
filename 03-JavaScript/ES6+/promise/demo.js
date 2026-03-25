// 基础题



// 1.Promise面试题
Promise.resolve()
  .then(function() {
    console.log("promise0");
  })
  .then(function() {
    console.log("promise5");
  });

setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function() {
    console.log("promise2");
  });
  Promise.resolve().then(function() {
    console.log("promise4");
  });
}, 0);

setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function() {
    console.log("promise3");
  });
}, 0);

Promise.resolve().then(function() {
  console.log("promise1");
});
console.log("start");

// 打印结果： 
// start 
// promise0 
// promise1 
// promise5 
// timer1 
// promise2 
// promise4 
// timer2 
// promise3

/**

问题：为什么是promise0 → promise1 → promise5，而不是promise0 → promise5 → promise1
          
执行顺序是 `promise0 → promise1 → promise5` 的原因在于**微任务队列的执行机制**和**Promise链式调用的特性**。

## 代码分析

```javascript
// 第一个Promise链
Promise.resolve()
  .then(function() {
    console.log("promise0");  // 微任务1
  })
  .then(function() {
    console.log("promise5");  // 微任务3（依赖于promise0完成）
  });

// 第二个独立Promise
Promise.resolve().then(function() {
  console.log("promise1");    // 微任务2
});
```

## 关键原理

### 1. 微任务注册时机
- **promise0** 和 **promise1** 在同步代码执行阶段就被注册到微任务队列
- **promise5** 只有在 promise0 执行完成后才会被注册到微任务队列

### 2. 微任务队列的执行顺序
初始微任务队列：`[promise0, promise1]`

**执行步骤：**
1. 执行 `promise0` → 输出 "promise0"
   - promise0 执行完成后，`.then(promise5)` 被注册到微任务队列
   - 微任务队列变为：`[promise1, promise5]`

2. 执行 `promise1` → 输出 "promise1"
   - 微任务队列变为：`[promise5]`

3. 执行 `promise5` → 输出 "promise5"
   - 微任务队列清空

### 3. 为什么不是 promise0 → promise5 → promise1？

这种理解是**错误的**，因为：
- Promise 链中的 `.then()` 不会立即执行，而是等待前一个 Promise 完成
- `promise5` 在 `promise0` 执行完成之前**不存在于微任务队列中**
- 微任务队列遵循 **FIFO（先进先出）** 原则

## 总结

Promise 链式调用的关键特性是：**后续的 `.then()` 只有在前一个 Promise 完成后才会被添加到微任务队列**。这确保了链式调用的顺序性，同时与其他独立的微任务按照注册顺序执行。
 */

// 2. async 面试题

// async 隐式返回 Promise，会产生一个微任务
// await 后面的代码是在微任务时执行
console.log("script start");
async function async1() {
  await async2(); // await 隐式返回promise
  console.log("async1 end"); // 这里的执行时机：在执行微任务时执行
}
async function async2() {
  console.log("async2 end"); // 这里是同步代码
}
async1();
setTimeout(function() {
  console.log("setTimeout");
}, 0);
new Promise(resolve => {
  console.log("Promise"); // 这里是同步代码
  resolve();
})
  .then(function() {
    console.log("promise1");
  })
  .then(function() {
    console.log("promise2");
  });
console.log("script end");

// 打印结果:  
// script start
// async2 end 
// Promise 
// script end 
// async1 end 
// promise1 
// promise2 
// setTimeout

// 3.

const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 end')
  return 'async1 success'
} 
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res))
setTimeout(() => {
  console.log('timer2')
}, 1000)

// 完整的执行顺序分析：
// 同步代码的执行
// console.log('script start') 输出：script start
// 调用 async1() 函数（返回一个 Promise）
// console.log('async1') 输出：async1
// 设置一个 2000ms 的定时器，但不会立即执行，加入宏任务队列。
// console.log('promise1') 输出：promise1
// await new Promise(resolve => {...})，该 Promise 不会被 resolve，导致 async1 函数暂停在这里。
// console.log('script end') 输出：script end
// 处理 Promise 链

// Promise.resolve(1)
// .then(2) 因为 2 不是一个函数，所以被忽略。
// .then(Promise.resolve(3)) 同理，Promise.resolve(3) 也被忽略。
// .catch(4) 也被忽略，因为没有错误。
// .then(res => console.log(res)) 输出：1，因为 Promise.resolve(1) 的值是 1。
// 定时器

// 1000ms 后执行 setTimeout(() => console.log('timer2'))，输出：timer2
// 2000ms 后执行 setTimeout(() => console.log('timer1'))，输出：timer1
// 结果输出顺序
// script start
// async1
// promise1
// script end
// 1
// timer2 (1秒后)
// timer1 (2秒后)
// 注意：由于 await new Promise(resolve => {...}) 永远不会 resolve，因此 console.log('async1 end') 和 console.log('async1 success') 永远不会执行。