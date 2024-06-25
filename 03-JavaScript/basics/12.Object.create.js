// 手写Object.create()
Object.myCreate = function(obj, properties){
  let F = function(){}
  F.prototype = obj;
  if (properties) {
     Object.defineProperties(F, properties)
  }
  return new F()
}
let box = {
  color: 'blue',
  width: 200,
  height: 300
}
let obj = Object.myCreate(box) // {}
obj.__proto__ === box // true