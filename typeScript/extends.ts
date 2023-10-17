// Pick 的源码实现中 extends 不是继承的意思。这里是用来约束类型。 第二个泛型输入的 Key 被约束在 T 的 key 内，如果超过这个范围会报错。

type MyPick2<T, K extends keyof T> = { [S in K]: T[S] }

type TypeCheck<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object';
type T0 = TypeCheck<string>; // "string"
type T1 = TypeCheck<'a'>; // "string"
type T2 = TypeCheck<true>; // "boolean"
type T3 = TypeCheck<() => void>; // "function"
type T4 = TypeCheck<string[]>; // "object"
type T10 = TypeCheck<string | (() => void)>; // "string" | "function"
type T11 = TypeCheck<string | string[] | undefined>; // "string" | "object" | "undefined"
