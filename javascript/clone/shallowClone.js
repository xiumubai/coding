// 1. Object.assign()
// Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。

let obj1 = { 
  person: { name: "kobe", age: 41 }, 
  sports:'basketball'
};
let obj2 = Object.assign({}, obj1);
obj2.person.name = "wade";
obj2.sports = 'football'
// console.log(obj1); // { person: { name: 'wade', age: 41 }, sports: 'basketball' }
// console.log(obj2); // { person: { name: 'wade', age: 41 }, sports: 'football' }

// 2.展开运算符...
let obj3 = { name: 'Kobe', address: {x: 100, y: 100 }}
let obj4 = { ... obj3 }
obj3.address.x = 200;
obj3.name = 'wade'
console.log('obj4', obj4) // obj4 { name: 'Kobe', address: { x: 200, y: 100 } }
