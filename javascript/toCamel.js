/*
 * @Author: 朽木白
 * @Date: 2023-11-01 15:47:42
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-15 20:26:22
 * @Description: 下划线命名转成驼峰命名
 */

function toCamel(str) {
  // 小驼峰
  if(str?.[0] === '_') {
    return toCamel(str.slice(1))
  } else {
    return str.replace(/_([a-z])/g, function(match, letter) {
      return letter.toUpperCase()
    })
  }
}

const result = toCamel('____hello_world')

console.log(result)


/**
题目：中划线命名转驼峰
示例：
1. -hello-world => helloWorld
2. hello-world => helloWorld
*/

function hyphenToCamelCase(str) {
  let words = str.split('-');
  if(words[0] === '') {
    // 如果首位是-，str.split('-')以后数组为['', 'hello', 'world'],所以需要删除掉
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
console.log(camelCaseString); // 输出：helloWorld