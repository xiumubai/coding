// 手写forEach

let family = ['jim', 'tom', 'jack', 'kim']
Array.prototype.myforEach= function(func) {
  if (this === null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof func !== 'function') {
      throw new TypeError(func + ' is not a function');
  }
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    func(arr[i], i, arr)
  }
}
family.forEach((item, index, arr) => {arr[index] = `hello ${item}`}) // ["hello jim", "hello tom", "hello jack", "hello kim"]
family.myforEach((item, index, arr) => {arr[index] = `${item}!`}) // ["hello jim!", "hello tom!", "hello jack!", "hello kim!"]