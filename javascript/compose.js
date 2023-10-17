/*
 * @Author: 朽木白
 * @Date: 2023-10-11 17:28:11
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-11 17:38:32
 * @Description: 函数组合
 */

function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
  };
};

var add1 = x => x + 1;
var mul5 = x => x * 5;
console.log(compose(mul5, add1)(2));;// =>15 