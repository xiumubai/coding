/*
 * @Author: 朽木白
 * @Date: 2023-10-17 20:00:37
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-17 20:00:42
 * @Description: 并发请求控制
 */

// 控制请求最大并发数，前面的请求成功后，再发起新的请求

/*
 * 控制并发数
 * @param {array} list - 请求列表
 * @param {number} num - 最大并发数
 */
function control(list, num) {
  function fn() {
    if (!list.length) return;
    // 从任务数 和 num 中 取最小值，兼容并发数num > list.length的情况
    let max = Math.min(list.length, num);
    for (let i = 0; i < max; i++) {
      let f = list.shift();
      num--;
      // 请求完成后，num++
      f.finally(() => {
        num++;
        fn();
      });
    }
  }
  fn();
}

