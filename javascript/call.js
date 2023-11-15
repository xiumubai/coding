https://github.com/mqyqingfeng/Blog/issues/11

// var foo = {
//   value: 1
// };

// function bar() {
//   console.log(this.value);
// }

// bar.call(foo); // 1


// foo.fn = bar

// foo.fn()

// delete foo.fn

// 第一步
// Function.prototype.myCall = function(ctx) {
//   ctx.fn = this
//   ctx.fn()
//   delete ctx.fn
// }

// var foo = {
//   value: 2
// };

// function bar() {
//   console.log(this.value);
// }

// bar.myCall(foo, 'bar')

// 第二步
Function.prototype.myCall = function(context) {

  if (typeof this !== 'function') {
    // 这里的this是外部调用的bar
    throw new Error('参数不是函数')
  }

  console.log(context);
  console.log(this);

  context = context || window
  context.fn = this

  console.log(arguments)
  // var args = []
  // for(var i = 1, len = arguments.length; i < len; i++) {
  //   args.push('arguments[' + i +']')
  // }

  // es6实现，主要是参数实现的不一样  Array.from(arguments)
  // arguments是一个伪数组，需要转化成真正的数组
  const args = Array.prototype.slice.call(arguments).splice(1) // 删除第一个参数
  const result = context.fn(...args)

  // var result = eval('context.fn('+ args +')')

  delete context.fn

  return result

}

var foo = {
  value: 1
}

function bar(name, age) {
  return {
    value: this.value,
    name,
    age
  }
}

console.log(bar.myCall(foo, 123, 34))

