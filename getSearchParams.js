/*
 * @Author: 朽木白
 * @Date: 2023-11-01 15:34:16
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-01 15:36:30
 * @Description: 提取url参数
 */

/**
 * 从url中提取查询参数 /add?a=2&b=3 => {a:2,b:3}
 * @param {string} url 用户请求的路径
 * @returns 提取好的查询参数形成的对象
 */
function getSearchParams(url) {
  // 创建结果对象
  const obj = {};

  // 摘出a=2&b=3
  // "/add?a=123&b=456&c=789#abc".match(/\w+=\w+/g)
  // const reg = /?(.*)/;
  // const str = reg.exec(url)[1];
  // 使用&做分隔符 肢解字符串为[a=2,b=3]
  // const arr = str.split("&");

  const reg = /\w+=\w+/g
  const arr = url.match(reg)//[子串1，子串2] [a=2,b=3]

  // 遍历上述数组 将每个元素以=肢解为 [a,2] 将这一组key-value收集到结果对象中
  arr.forEach((item) => {
    let [key,value] = item.split("=");
    obj[key] = value//obj.a = 2 obj.b=3
  });

  // 返回结果对象
  return obj;//{a:2,b:3}
}

const result = getSearchParams('https://juejin.cn/post/7236670284559925306?searchId=2023110115140053E5E7B4D5BFA05A2322&a=1')
console.log(result.searchId)