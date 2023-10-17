/*
 * @Author: 朽木白
 * @Date: 2023-10-17 18:51:46
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-17 18:54:09
 * @Description: 寄生组合继承
 */

// 精简版
class Child {
  constructor() {
    // 调用父类的构造函数
    Parent.call(this);
    // 利用Object.create生成一个对象，新生成对象的原型是父类的原型，并将该对象作为子类构造函数的原型，继承了父类原型上的属性和方法
    Child.prototype = Object.create(Parent.prototype);
    // 原型对象的constructor指向子类的构造函数
    Child.prototype.constructor = Child;
  }
}

// 通用版
function Parent(name) {
  this.name = name;
}
Parent.prototype.getName = function() {
  console.log(this.name);
};
function Child(name, age) {
  // 调用父类的构造函数
  Parent.call(this, name);
  this.age = age;
}
function createObj(o) {
  // 目的是为了继承父类原型上的属性和方法，在不需要实例化父类构造函数的情况下，避免生成父类的实例，如new Parent()
  function F() {}
  F.prototype = o;
  // 创建一个空对象，该对象原型指向父类的原型对象
  return new F();
}

// 等同于 Child.prototype = Object.create(Parent.prototype)
Child.prototype = createObj(Parent.prototype);
Child.prototype.constructor = Child;

let child = new Child("tom", 12);
child.getName(); // tom