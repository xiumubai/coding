// 给Function原型添加myBind方法
Function.prototype.myBind = function (thisArg, ...partialArgs) {
  const fn = this; // 保存原函数的引用
  
  // 返回一个新函数
  return function (...args) {
    // 通过apply改变this指向，合并预设参数和调用时的参数
    return fn.apply(thisArg, [...partialArgs, ...args]);
  };
};

// 测试
function a() {
  console.log(this);
}
const b = a.myBind({ name: 'guojianli' });
b(); // 输出: { name: 'guojianli' }