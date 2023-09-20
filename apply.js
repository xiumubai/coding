  /*
  * @Author: 朽木白
  * @Date: 2023-09-15 17:40:48
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-09-15 20:07:11
  * @Description: apply的实现
  */

  // 实现方式跟call类似，唯一的区别是第二参数是一个数组

  Function.prototype.myApply = function(context, args) {

    if (typeof this !== 'function') {
      throw new Error('Error')
    }

    context = context || window
    context.fn = this
    var result;
    if (!args) {
      result = context.fn()
    } else {
      var arr = []
      for(var i = 0, len = args.length; i < len; i++) {
        arr.push('args['+ i +']')
      }
      // es6写法
      // result = cotext.fn(...args)
      result = eval('context.fn('+ arr +')')
    }
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

  console.log(bar.myApply(foo, ['xiumubai', 18]))
