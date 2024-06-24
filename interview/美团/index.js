


// 代码输出题
// 1. commomjs打印结果

let counter = 1

function increment() {
  counter++
}

moudule.exports = {
  counter: counter,
  increment: increment,
}

const mod = require('./module')

console.log(mod.counter);
mod.increment()
console.log(mod.counter);

// 2

var a = 1;

(function() {
  console.log(a);
  console.log(this.a);
  var a = 2
  console.log(a + this.a);
})()

// 3
function changeObj(o) {
  o.url = 'http://www.baidu.com'
  o = new Object()
  o.url = 'http://www.google.com'
}

let obj = new Object()
changeObj(obj)
console.log(obj.url); // http://www.baidu.com

// coding题

// 1.设计模式 发布订阅

let baby = new Baby('孩子')
let father = new Parent('爸爸')
let mother = new Parent('妈妈')

baby.attach('爸爸')
baby.attach('妈妈')

baby.setState('开心')
baby.setState('不开心')

// 2.arr to tree

// 3.allSettled方法实现
