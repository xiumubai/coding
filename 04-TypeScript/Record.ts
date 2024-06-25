// Record 用于生成接口类型的 Record, Record 接收两个泛型参数：第一个参数作为接口类型的属性，第二个参数是接口类型的属性值

type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};
// 使用 Record 例子
type testRecord = MyRecord<string, string>
