/*
 * @Author: 朽木白
 * @Date: 2023-11-01 15:47:42
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-01 15:52:33
 * @Description: 下划线命名转成驼峰命名
 */

function toCamel(str) {
  // 小驼峰
  if (typeof str !== "string") {
    throw Error("传入的值类型不是字符串!!!");
  }
  let camelStr = str.replace(/(\b|_)([A-Za-z])/, ($, $1, $2) =>
    $2.toLowerCase()
  );
  camelStr = camelStr.replace(/_(\w)/g, ($, $1) => {
    return $1.toUpperCase();
  });
  return camelStr;
}

const result = toCamel('_a_b_c')

console.log(result)