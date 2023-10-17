// keyof操作符
interface IUser {
  name: string;
  age: number;
  number: number;
}

type UserKyes = keyof IUser

// 返回  "name" | "age" | "number" 联合类型

// 工作中关于 keyof 常用的一个场景。一个函数，接受两个参数，参数一是一个对象，参数二是这个对象中 key，如何用 TypeScript 编写函数

function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
// 使用 keyof 可以得到所有 key 的联合类型，并且 obj[key] 会被推断为 T[K] 正确的返回值类型，不再是 any 类型

