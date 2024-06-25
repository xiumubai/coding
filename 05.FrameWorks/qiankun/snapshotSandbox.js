/*
 * @Author: 朽木白
 * @Date: 2023-10-16 20:22:04
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-16 20:25:28
 * @Description: 快照沙箱
 * @docs: https://juejin.cn/post/6920110573418086413
 */

/**

 激活沙箱时，将window的快照信息存到windowSnapshot中， 如果modifyPropsMap有值，还需要还原上次的状态；激活期间，可能修改了window的数据；
 退出沙箱时，将修改过的信息存到modifyPropsMap里面，并且把window还原成初始进入的状态。

 */


//  以下代码请复制到浏览器执行

 const iter = (window, callback) => {
  for (const prop in window) {
    if(window.hasOwnProperty(prop)) {
      callback(prop);
    }
  }
}

class SnapshotSandbox {
  constructor() {
    this.proxy = window;
    this.modifyPropsMap = {};
  }
  // 激活沙箱
  active() {
    // 缓存active状态的window
    this.windowSnapshot = {};
    iter(window, (prop) => {
      this.windowSnapshot[prop] = window[prop];
    });
    Object.keys(this.modifyPropsMap).forEach(p => {
      window[p] = this.modifyPropsMap[p];
    })
  }
  // 退出沙箱
  inactive(){
    iter(window, (prop) => {
      if(this.windowSnapshot[prop] !== window[prop]) {
        // 记录变更
        this.modifyPropsMap[prop] = window[prop];
        // 还原window
        window[prop] = this.windowSnapshot[prop];
      }
    })
  }
}

const sandbox = new SnapshotSandbox();
((window) => {
   // 激活沙箱
   sandbox.active();
   window.sex= '男';
   window.age = '22';
   console.log(window.sex, window.age);
   // 退出沙箱
   sandbox.inactive();
   console.log(window.sex, window.age);
   // 激活沙箱
   sandbox.active();
   console.log(window.sex, window.age);
})(sandbox.proxy);
