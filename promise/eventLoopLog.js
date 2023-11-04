/*
 * @Author: 朽木白
 * @Date: 2023-11-04 21:18:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-04 21:25:02
 * @Description: 事件循环输出题
 */

// 输出下面代码执行的结果输出的正确顺序

// 初级版本

async function add() {
  await fn()  
  console.log(3)
}

async function fn() {
  console.log(1)
}

add()

console.log(2)

// 1
// 2
// 3

// 进阶版本
async function async1() {
	console.log('async1 start');
	await async2();
	console.log('asnyc1 end');
}
async function async2() {
	console.log('async2');
}
console.log('script start');
setTimeout(() => {
	console.log('setTimeOut');
}, 0);
async1();
new Promise(function (reslove) {
	console.log('promise1');
	reslove();
}).then(function () {
	console.log('promise2');
})
console.log('script end');

// script start
// async1 start
// async2
// promise1
// script end
// asnyc1 end
// promise2
// setTimeOut


