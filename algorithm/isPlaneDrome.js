/*
 * @Author: 朽木白
 * @Date: 2023-10-15 20:13:34
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-15 20:18:18
 * @Description: 验证回文字符串
 */


/**
 * abcba
 * @param {*} s
 */

function isPalindrome(s) {
  let i = 0, j = s.length - 1

  while(j >= i) {
    if (s[i] === s[j]) {
      i++
      j--
    } else {
      return false
    }
  }

  return true
}

const result = isPalindrome('abcba')
console.log(result)