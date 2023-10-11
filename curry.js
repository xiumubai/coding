/*
 * @Author: 朽木白
 * @Date: 2023-10-11 17:17:43
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-11 17:35:39
 * @Description: 函数柯里化
 */

/**
 * 柯里化又称部分求值，柯里化函数会接收一些参数，然后不会立即求值，而是继续返回一个新函数，将传入的参数通过闭包的形式保存，等到被真正求值的时候，再一次性把所有传入的参数进行求值。
 * 简言之：使用多个参数的一个函数转化成使用一个参数的多个函数
 */
// 对两个数求和

// 普通函数

function add(x,y) {
  return x + y
}

add(1, 2)

// 函数柯里化

function add(x) {
  return function(y) {
    return x + y
  }
}

add(1)(2)

// 实现

function sub_curry(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
      return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}

function curry(fn, length) {

  length = length || fn.length;

  var slice = Array.prototype.slice;

  return function() {
      if (arguments.length < length) {
          var combined = [fn].concat(slice.call(arguments));
          return curry(sub_curry.apply(this, combined), length - arguments.length);
      } else {
          return fn.apply(this, arguments);
      }
  };
}

var fn = curry(function(a, b, c) {
  return [a, b, c];
});

console.log(fn("a", "b", "c") ) // ["a", "b", "c"];
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]