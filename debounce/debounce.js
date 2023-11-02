var count = 1;
var container = document.getElementById('container');

function getUserAction() {
  container.innerHTML = count++;
};

// 防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行。

// container.onmousemove = getUserAction;

// 1.延时执行
// function debounce(func, wait) {
//   var timer = null;
//   return function() {
//     clearTimeout(timer)
//     timer = setTimeout(func, wait)
//   }
// }

// container.onmousemove = debounce(getUserAction, 300);

// 2.this指向
// function debounce(func, wait) {
//   var timer = null;

//   return function() {
//     var context = this
    
//     clearTimeout(timer)
//     timer = setTimeout(function() {
//       // 在setTimeout中，this指向window，这里需要把外面正确的this指向传递进来
//       func.apply(context)
//     }, wait)
//   }
// }

// 3.event参数

// debounce为什么会默认就执行一次

// debounce里面为什么要返回一个匿名函数，这个匿名函数啥时候执行的？ 

// 它是如何拿到getUserAction函数的参数的？

// debounce内部执行的机制
// function debounce() {
//   console.log(2);
//   return function() {
//     console.log(1);
//   }
// }

// container.onmousemove = debounce();

// 一、默认不会执行debounce事件，鼠标滑动事件触发之后，执行了debounce函数，打印2
// container.onmousemove = debounce;

// 二、默认执行了debounce事件，鼠标滑动事件触发之后，执行了debounce函数内部的匿名函数，打印1

// container.onmousemove = debounce;


// 匿名函数的参数传递
// function add() {
//   return function() {
//     console.log(arguments)
//   }
// }

// add()(1,2)

// function debounce(func, wait) {
//   var timer = null;

//   return function() {
//     var context = this
//     var args = arguments;
//     console.log('args', args);
//     clearTimeout(timer)
//     timer = setTimeout(function() {
//       // 在setTimeout中，this指向window，这里需要把外面正确的this指向传递进来
//       func.apply(context, args)
//     }, wait)
//   }
// }

// container.onmousemove = debounce(getUserAction.bind(null, 1), 300);


// 4、是否需要立即执行

// // 创建一个定时器，并将标识符存储在 timerId 中
// let timerId = setTimeout(function() {
//   console.log("定时器已触发！");
//   timerId = 'aa'
//   console.log(timerId);
// }, 1000);

// // 取消定时器
// clearTimeout(timerId);

// // 现在 timerId 的值是 undefined
// console.log(timerId); // 输出 undefined

// function debounce(func, wait, immediate) {
//   var timer = null;

//   return function() {
//     // DOM对象
//     var context = this
//     // 自定义参数和Event对象
//     var args = arguments;
//     if(timer) {
//       clearTimeout(timer)
//     }

//     // 是否需要立即执行
//     if (immediate) {
      
//       // timer在触发后的wait（ms）是true，所以callNow在这期间为false
//       var callNow = !timer
//       // 停止触发wait（ms）后，才可以重新触发执行
//       timer = setTimeout(function() {
//         // 这里timer需要手动设置为null，callNow才能重新执行
//         timer = null
//       }, wait)
//       // 触发的第一时间立即执行
//       if (callNow) {
//         func.apply(context, args)
//       }
//     } else {

//       // 如果不是立即执行，延时wait（ms）以后执行
//       timer = setTimeout(function() {
//         // 在setTimeout中，this指向window，所以这里需要把外面正确的this指向传递进来
//         func.apply(context, args)
//       }, wait)
//     }
    
//   }
// }

// container.onmousemove = debounce(getUserAction.bind(null, 1), 300, true);

// 5、返回值
function debounce(func, wait, immediate) {
  var timer, result;

  return function() {
    // DOM对象
    var context = this
    // 自定义参数和Event对象
    var args = arguments;
    if(timer) {
      clearTimeout(timer)
    }

    // 是否需要立即执行
    if (immediate) {
      
      // timer在触发后的wait（ms）是true，所以callNow在这期间为false
      var callNow = !timer
      // 停止触发wait（ms）后，才可以重新触发执行
      timer = setTimeout(function() {
        // 这里timer需要手动设置为null，callNow才能重新执行
        timer = null
      }, wait)
      // 触发的第一时间立即执行
      if (callNow) {
        result = func.apply(context, args)
      }
    } else {

      // 如果不是立即执行，延时wait（ms）以后执行
      timer = setTimeout(function() {
        // 在setTimeout中，this指向window，所以这里需要把外面正确的this指向传递进来
        result = func.apply(context, args)
      }, wait)
    }
    
    return result;
  }
}
//TODO： 如果鼠标一直停留在滑动区域内一直滑动的话，事件就不生效了

container.onclick = debounce(getUserAction, 1000, true);


// 6.取消
// 能取消 debounce 函数，比如说我 debounce 的时间间隔是 10 秒钟，immediate 为 true，
// 这样的话，我只有等 10 秒后才能重新触发事件，现在我希望有一个按钮，点击后，取消防抖，这样我再去触发，就可以又立刻执行。
// function debounce(func, wait, immediate) {
//   var timer, result;

//   var debounced =  function() {
//     // DOM对象
//     var context = this
//     // 自定义参数和Event对象
//     var args = arguments;
//     if(timer) {
//       clearTimeout(timer)
//     }

//     // 是否需要立即执行
//     if (immediate) {
      
//       // timer在触发后的wait（ms）是true，所以callNow在这期间为false
//       var callNow = !timer
//       // 停止触发wait（ms）后，才可以重新触发执行
//       timer = setTimeout(function() {
//         // 这里timer需要手动设置为null，callNow才能重新执行
//         timer = null
//       }, wait)
//       // 触发的第一时间立即执行
//       if (callNow) {
//         result = func.apply(context, args)
//       }
//     } else {
//       // 如果不是立即执行，延时wait（ms）以后执行
//       timer = setTimeout(function() {
//         // 在setTimeout中，this指向window，所以这里需要把外面正确的this指向传递进来
//         result = func.apply(context, args)
//       }, wait)
//     }
    
//     return result;
//   }

//   debounced.cancel = function() {
//     clearTimeout(timer)
//     timer = null
//   }

//   return debounced
// }

// var setUseAction = debounce(getUserAction, 10000, true);

// container.onmousemove = setUseAction;

// document.getElementById("button").addEventListener('click', function(){
//     setUseAction.cancel();
// })
