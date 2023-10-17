// ReturnType 接收一个函数类型作为参数，推断出函数的返回值类型。 

type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

type ReturnType1 = MyReturnType<() => number>; // number
type ReturnType2 = MyReturnType<(s: string) => void>; // void
type ReturnType3 = MyReturnType<typeof Math.random>; // number
type ReturnType4 = MyReturnType<typeof Array.isArray>; // boolean
