## 一面

### 代码输出

1. commomjs打印结果

```js
// lib.js
let counter = 1

function increment() {
  counter++
}

module.exports = {
  counter: counter,
  increment: increment,
}


// index.js
const mod = require('./lib')
console.log(mod.counter);
mod.increment()
console.log(mod.counter);
```

```js
// lib.js
let counter = 1

function increment() {
  counter++
}

module.exports = {
  get counter() {
    return counter
  },
  increment: increment,
}

// index.js
const mod = require('./lib')
console.log(mod.counter);
mod.increment()
console.log(mod.counter);
```

```js
let a = 1;

(function() {
  console.log(a);
  console.log(this.a);
  var a = 2
  console.log(a + this.a);
})()
```

```js
function changeObj(o) {
  o.url = 'http://www.baidu.com'
  o = new Object()
  o.url = 'http://www.google.com'
}

let obj = new Object()
changeObj(obj)
console.log(obj.url); // http://www.baidu.com
```


### 代码实现

1. 设计模式 发布订阅

```js
class Bady {}
class Parent {}

let child = new Baby('孩子')
let mother = new Parent('妈妈')
let father = new Parent('爸爸')
child.attach(mother)
child.attach(father)
child.setState('开心')
setTimeout(() => {
  child.setState('不开心')
}, 2000)
```

输出的结果：

```shell
妈妈：孩子的状态是开心
爸爸：孩子的状态是开心

妈妈：孩子的状态是不开心
爸爸：孩子的状态是不开心
```

2. arr to tree

```js
const menu = [

  { id: 7, name: "深圳市", parentId: 4 },

  { id: 1, name: "北京市" },

  { id: 2, name: "朝阳区", parentId: 1 },

  { id: 3, name: "海淀区", parentId: 1 },

  { id: 4, name: "广东省" },

  { id: 5, name: "广州市", parentId: 4 },

  { id: 8, name: "中关村", parentId: 3 },

];
```

3. promise.allSettled方法实现

## 二面