/*
 * @Author: 朽木白
 * @Date: 2023-09-15 20:07:29
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-09-15 23:11:07
 * @Description: new的实现
 */

// 使用案例

function Person(name, age) {
  this.name = name
  this.age = age
  return {
    age
  }
}

Person.prototype.sex = '男'

Person.prototype.getInfo = function() {
  console.log(`name: ${this.name}, age: ${this.age}, sex: {this.sex}`)
}

var p = new Person('xiumuba', 18)
console.log(p.name)
p.getInfo()

// 使用方式：var p = myNew(Pserson, ...)

// new的结果是一个新的对象，这个新的对象具有Person的属性和方法

function Person(name, age) {
  this.name = name
  this.age = age
  return {
    name,
    age
  }
}

Person.prototype.sex = '男'

Person.prototype.getInfo = function() {
  console.log(`name: ${this.name}, age: ${this.age}, sex: {this.sex}`)
}

// 第一版
function myNew() {
  var obj = new Object()
  // 拿到arguments的第一个元素，也就是构造函数，命名为Constructor（在class中是构造函数的意思）
  let Constructor = [].shift.call(arguments)
  // 把新对象的原型指向构造函数.prototype，这样以便于继承构造函数的属性和方法
  obj.__proto__ = Constructor.prototype
  // 传入参数，修改this的指向
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj
}

var p = myNew(Person, 'xiumubai', 18)
console.log(p.nage);
console.log(p.age);
p.getInfo()







// 默写案例
function Person(name, age) {
  this.name = name
  this.age = age
  return {
    name,
  }
}

Person.prototype.getAge = function() {
  console.log(this.age)
}


function MyNew() {

  var obj = new Object()
  var Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  var ret = Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}

var p = MyNew(Person, 'xiumubai', 19)
console.log(p.name, p.age);