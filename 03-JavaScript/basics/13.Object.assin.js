// 手写Object.assin()
Object.myAssign = function (target) {
  let len = arguments.length
	if (target === undefined || target === null || len == 0 ) {  // 判断参数是否正确(目的对象不能为空，我们可以直接设置{}传递进去,但必须设置该值)
	  throw new TypeError('Cannot convert undefined or null to object');
	}
	
  if(len == 1){
    if(target instanceof Object) {
       return target;
    }else {
       let newObj =target;
       if(typeof target === 'string'){
         return new String(newObj);
       }else if(typeof target === 'boolean'){
         return new Boolean(newObj);
       }else if(typeof target === 'number'){
         return new Number(newObj);
       }
    }
  } else {
    let output = Object(target);  // 使用Object在原有的对象基础上返回该对象，并保存为output
	  for (let index = 1; index < arguments.length; index++) {
	  let source = arguments[index];
	  if (source !== undefined && source !== null) {
	    for (let nextKey in source) {  // 使用for…in循环遍历出所有的可枚举的自有对象。并复制给新的目标对象(hasOwnProperty返回非原型链上的属性)
	      if (source.hasOwnProperty(nextKey)) {
	        output[nextKey] = source[nextKey];
	      }
	    }
	  }
	}
	return output;
  }
};
let box = {
  color: 'blue',
  width: 200,
  height: 300
}
let obj1 = Object.myAssign({}, box) // {color: "blue", width: 200, height: 300}
let obj2 = Object.myAssign({color: 'red'}, box) // {color: "blue", width: 200, height: 300}