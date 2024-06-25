// Exclude 用于删除类型集合中的指定类型



type MyExclude<T, U> = T extends U ? never : T

type Type1 = string | number; // 联合类型
type TypeExclude = MyExclude<Type1, string>; // number

