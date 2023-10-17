/*
 * @Author: 朽木白
 * @Date: 2023-10-17 20:15:29
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-17 20:15:33
 * @Description: 有效的括号
 * @docs: https://leetcode.cn/problems/valid-parentheses/
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  let obj = {
      '(': ')',
      '[': ']',
      '{': '}'
  };
  let statck = [];
  for(let i = 0; i < s.length; i++) {
      const ele = s[i];
      if (ele in obj) {
          statck.push(s[i]);
      } else {
          if (ele != obj[statck.pop()]) {
              return false
          }
      }
  }
  return !statck.length;
};
