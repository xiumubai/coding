// 泛型T被约束为number或string类型
function add<T extends number | string>(a: T, b: T): T {
  // 类型判断：如果是number则相加，string则拼接
  if (typeof a === 'number' && typeof b === 'number') {
    return (a + b) as T;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return (a + b) as T;
  }
  // 理论上不会走到这里，因为类型约束已经限制了参数类型
  throw new Error('参数类型不匹配');
}

// 正确调用
console.log(add(1, 2)); // 输出 3
console.log(add('hello', ' world')); // 输出 "hello world"

// 错误调用（类型不匹配）
// add(1, '2'); // 类型报错，不符合约束