/*
 * @Author: 朽木白
 * @Date: 2023-11-01 15:47:42
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-15 19:35:45
 * @Description: 下划线命名转成驼峰命名
 */

// 示例

// -hello-world => helloWorld
// hello-world => helloWorld

// 第一种：正则
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

const result = toCamel( '_a_b_c')

// console.log(result)

// 第二种：循环

function hyphenToCamelCase(str) {
  let words = str.split('-');
  if(words[0] === '') {
    words = words.slice(1)
  }
  for (let i = 1; i < words.length; i++) {
    // words[i][0].toUpperCase() -后的一位字母转大写
    // words[i].slice(1) 删除第一位的字符串
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return words.join('');
}

// 示例用法
const hyphenString = '-hello-world';
const camelCaseString = hyphenToCamelCase(hyphenString);
console.log(camelCaseString); // 输出：abSfafCd
