// 使用typeof，它常用来推导类型


let s = "hello";
let n: typeof s;

// 推断一个 Interface 类型

let user = {
  name: 'xiao2',
  age: 18,
  number: 1,
}

type UserType1 = typeof user;

// 推断一个 class 类型
class TestClass{
  constructor(public name:string,public age:number){}
}
type Instance = InstanceType<typeof TestClass>; // 

// 推导函数返回值
function f() {
  return { x: 10, y: 3 };
}

type P = ReturnType<typeof f>;
