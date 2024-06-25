// 手写find和findIndex

let family = ['jim', 'tom', 'jack', 'kim']
Array.prototype.myFind= function(func) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i], i, arr)) {
      return arr[i]
    }
  }
  return undefined;
}
let name1 = family.find((item, index, arr) => { return item === 'kim'}) // kim
let name2 = family.myFind((item, index, arr) => { return item === 'kim'})  // kim
// findIndex
Array.prototype.myFindIndex= function(func) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i], i, arr)) {
      return i
    }
  }
  return -1;
}
let num1 = family.findIndex((item, index, arr) => { return item === 'kim'}) // 3
let num2 = family.myFindIndex((item, index, arr) => { return item === 'kim'})  // 3
