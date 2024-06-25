/*
 * @Author: 朽木白
 * @Date: 2023-11-02 19:05:28
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-02 19:12:10
 * @Description: 判断数组
 */

// 第一种


console.log(Array.isArray([1,2,3]))


// 第二种
function isArray(arr) {
  return typeof(arr) === 'object'
    && Object.prototype.toString.call(arr) === '[object Array]'
}

console.log(isArray([1,2,3]))

// 第三种
// 当有多个iframe窗口的时候不适合

console.log([1,2, 3] instanceof Array)