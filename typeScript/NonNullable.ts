// NonNullable 用于删除联合类型中的 null和 undefined

type MyNonNullable<T> = T extends null | undefined ? never : T;
