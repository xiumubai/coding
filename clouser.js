/*
 * @Author: 朽木白
 * @Date: 2023-10-11 14:54:27
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-11 14:55:53
 * @Description: 闭包的持久引用
 */


// 下面的这个函数可以对数据进行持久引用

// 简单的缓存工具
// 匿名函数创造了一个闭包
const cache = (function() {
  const store = {};
  
  return {
    get(key) {
      return store[key];
    },
    set(key, val) {
      store[key] = val;
    }
  }
}());
cache.set('a', 1);
console.log(cache.get('a'));
console.log(cache.get('a'));
