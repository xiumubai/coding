/*
 * @Author: 朽木白
 * @Date: 2023-10-16 20:31:44
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-16 20:34:13
 * @Description: 多例沙箱
 */

/**
 * 激活沙箱后，每次对window取值的时候，先从自己沙箱环境的fakeWindow里面找，如果不存在，就从rawWindow(外部的window)里去找；当对沙箱内部的window对象赋值的时候，会直接操作fakeWindow，而不会影响到rawWindow。
 */

class ProxySandbox {
  active() {
    this.sandboxRunning = true;
  }
  inactive() {
    this.sandboxRunning = false;
  }
  constructor() {
    const rawWindow = window;
    const fakeWindow = {};
    const proxy = new Proxy(fakeWindow, {
      set: (target, prop, value) => {
        if(this.sandboxRunning) {
          target[prop] = value;
          return true;
        }
      },
      get: (target, prop) => {
        // 如果fakeWindow里面有，就从fakeWindow里面取，否则，就从外部的window里面取
        let value = prop in target ? target[prop] : rawWindow[prop];
        return value
      }
    })
    this.proxy = proxy;
  }
}

window.sex = '男';
let proxy1 = new ProxySandbox();
let proxy2 = new ProxySandbox();
((window) => {
  proxy1.active();
  console.log('修改前proxy1的sex', window.sex);
  window.sex = '女';
  console.log('修改后proxy1的sex', window.sex);
})(proxy1.proxy);
console.log('外部window.sex=>1', window.sex);

((window) => {
  proxy2.active();
  console.log('修改前proxy2的sex', window.sex);
  window.sex = '111';
  console.log('修改后proxy2的sex', window.sex);
})(proxy2.proxy);
console.log('外部window.sex=>2', window.sex);
