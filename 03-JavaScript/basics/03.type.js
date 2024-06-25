/*
 * @Author: 朽木白
 * @Date: 2023-09-15 23:22:50
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-17 19:47:42
 * @Description: 数据类型检测
 */


// 1.typeof
// 只能识别基础类型和引用类型
// 注意：null、 NaN、 document.all 的判断
console.log(typeof 123); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object"
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof function(){}); // "function"
console.log(typeof null); // "object"
console.log(typeof NaN); // "number"
console.log(typeof document.all); // "undefined"

// 2.constructor
// 注意 null 和 undefined 没有 constructor，以及 constructor 可以被改写，不太可靠
const arr = [1, 2, 3];
console.log(arr.constructor === Array) // true

const obj = {name: "朽木白", age: 18};
console.log(obj.constructor === Object) // true

String.prototype.constructor = function fn() {
  return {};
}

// constructor 可以被改写
console.log("朽木白".constructor) // [Function: fn]


// 3.instanceof 
// 语法：obj instanceof Type
// 功能：判断 obj 是不是 Type 类的实例，只可用来判断引用数据
// 实现思路： Type 的原型对象是否是 obj 的原型链上的某个对象
// 注意：右操作数必须是函数或者 class
const arr2 = [1, 2, 3]
console.log(arr instanceof Array) // true
console.log(arr instanceof Object) // true

const obj2 = { name: "朽木白", age: 18 }
console.log(obj instanceof Object) // true
console.log(obj instanceof Array) // false


// 4. isPrototypeof
// 用于判断一个对象是否为另一个对象的原型
// prototypeObj.isPrototypeOf(object)，如果 prototypeObj 是 object 的原型对象，isPrototypeOf 方法返回 true，否则返回 false
// 注意：isPrototypeOf 方法只能用于判断对象类型，不能用于判断基本数据类型。如果 prototypeObj 不是一个对象，isPrototypeOf 方法会抛出 TypeError 异常
// getPrototypeOf 返回一个对象的原型，只能用于判断对象类型
const obj3 = { name: "朽木白", age: 18 }
const arr3 = [1, 2, 3]

const proto1 = Object.getPrototypeOf(obj)
console.log(proto1.isPrototypeOf(obj)) // true

const proto2 = Object.getPrototypeOf(arr)
console.log(proto2.isPrototypeOf(arr)) // true

console.log(Object.isPrototypeOf({})) // false
console.log(Object.prototype.isPrototypeOf({})) // true  期望左操作数是一个原型，{} 原型链能找到 Object.prototype

console.log(Object.getPrototypeOf(obj) === Object.prototype) // true
console.log(Object.getPrototypeOf(arr) === Array.prototype) // true

// Array.isArray 方法可以判断一个对象是否为数组
// Number.isNaN 可以判断一个值是否为 NaN
// Number.isFinite 可以判断一个值是否为有限数

console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({})); // false
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(123)); // false
console.log(Number.isNaN("hello")); // false
console.log(Number.isFinite(123)); // true
console.log(Number.isFinite("hello")); // false
console.log(Number.isFinite(Infinity)); // false


// 5.Object.prototype.toString.call

Object.prototype.toString.call(123); // "[object Number]"
Object.prototype.toString.call("hello"); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(function(){}); // "[object Function]"
// 注意的是，Object.prototype.toString.call 方法返回的字符串格式为 "[object 类型]"

// 封装
function typeOf(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

// 测试
console.log(typeOf(1)); // Number
console.log(typeOf("1")); // String
console.log(typeOf(true)); // Boolean
console.log(typeOf(null)); // Null
console.log(typeOf(undefined)); // Undefined
console.log(typeOf(Symbol(1))); // Symbol
console.log(typeOf({})); // Object
console.log(typeOf([])); // Array
console.log(typeOf(function () {})); // Function
console.log(typeOf(new Date())); // Date
console.log(typeOf(new RegExp())); // RegExp
