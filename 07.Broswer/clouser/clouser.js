// 错误的写法: 闭包所引用的info变量在函数外部
let info = {
  arr: new Array(10 * 1024 * 1024).fill(1),
  timer: null
};
export const debounce = (fn, time) => {
  // 正确的写法: 闭包所引用的info变量在函数内部
  let info = {
    arr: new Array(10 * 1024 * 1024).fill(1),
    timer: null
  };
  return function (...args) {
    info.timer && clearTimeout(info.timer);
    info.timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
};
