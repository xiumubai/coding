// 手写some
let family = ['jim', 'tom', 'jack', 'kim']
Array.prototype.mySome= function(func) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i], i, arr)) {
      return true
    }
  }
  return false;
}
family.some((item, index, arr) => { return item === 'bim'}) // true
family.mySome((item, index, arr) => { return item === 'bim'}) // true
