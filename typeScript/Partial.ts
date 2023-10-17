// Partial 用于 修改类型中属性为可选类型

type MyPartial<T> = {[P in keyof T]?:T[P]}

// 测试

interface IUser {
  name: string
  age: string
}

type User = MyPartial<IUser>