// 在字符串的原型链上添加一个方法，实现字符串翻转：
String.prototype._reverse = function(a){
  return a.split("").reverse().join("");
}
var obj = new String();
var res = obj._reverse ('hello');
console.log(res);    // olleh