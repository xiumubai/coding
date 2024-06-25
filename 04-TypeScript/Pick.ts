// Pick<T, K> 从一个复合类型 T 中取出几个想要的属性 K，构造一个新类型。

// 定义一个用户信息原始类型
interface IUser {
  name: string;
  age: number;
  number: number;
}

// 我现在还需要定义一个编辑用户新的类型，只需要 name 和 age 因为 number 不可修改
interface IEditUser {
  name: string;
  age: number;
}

type EditUser = Pick<IUser, 'name' | 'age'>;
// EditUser 等同于 IEditUser

// 源码实现
type MyPick<T, K extends keyof T> = { [S in K]: T[S] }

// 测试一下

type EditUser2 = MyPick<IUser, 'name' | 'age'>;
