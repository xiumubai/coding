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