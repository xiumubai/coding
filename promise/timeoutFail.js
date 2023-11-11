/*
 * @Author: 朽木白
 * @Date: 2023-11-11 20:59:51
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-11 20:59:54
 * @Description: 请求超时重试
 */

/**
 * @param {一次请求的最大响应时间} time 
 * @param {最大超时请求次数} limit 
 * @param {资源加载函数} fn 
 * @returns Promise
 */
function request(time, limit, fn) {
  let retryCount = 0;

  async function tryRequest() {
    try {
      return await Promise.race([fn(), timeoutFail(time)]);
    } catch (error) {
      retryCount++;
      if (retryCount <= limit) {
        console.log(`Retry #${retryCount}`);
        return tryRequest();
      } else {
        throw new Error("Max retry limit reached");
      }
    }
  }

  return tryRequest();
}

function timeoutFail(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Request timed out"));
    }, time);
  });
}
function sleep(time = 2000, val = 1) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(val);
    }, time)
  );
}

// 调用 sleep 函数，最多重试 3 次，每次超时等待 1000 毫秒
request(1000, 3, sleep)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error.message);
  });
