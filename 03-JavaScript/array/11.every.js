// 手写every
let family = ['jim', 'tom', 'jack', 'kim']

// every
Array.prototype.myEvery= function(func) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (!func(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
}
family.every((item, index, arr) => { return item === 'bim'}) // false
family.myEvery((item, index, arr) => { return item === 'bim'}) // false