/*
 * @Author: 朽木白
 * @Date: 2023-11-01 15:34:16
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2024-05-15 18:02:48
 * @Description: 提取url参数
 */

function parseUlr(url) {
  const urlArr = url.split('?')[1];
  const paramsArr = urlArr.split('&');
  const result = {};
  paramsArr.forEach((item) => {
    let [key,value] = item.split("=");
    const decodeValue = decodeURIComponent(value);
    if(result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(decodeValue);
      } else {
        result[key] = [result[key], decodeValue];
      }
    } else {
      result[key] = decodeValue;
    }
  });
  return result
}

const url = 'https://www.juejin.cn?user=gs&user=gt&id=1&name=%E5%BC%A0%E4%B8%89'
console.log(parseUlr(url))