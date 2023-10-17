// Required 用于修改类型中可选属性为必填属性

type MyRequired<T> = {[P in keyof T]-?: T[P]}

// 测试

interface IUser {
  sex?: string
  hoby?: string
}

type User2 = MyRequired<IUser>