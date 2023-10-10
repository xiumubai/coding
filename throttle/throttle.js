var count = 1;
var container = document.getElementById('container');

function getUserAction() {
  container.innerHTML = count++;
};

// container.onmousemove = getUserAction;


function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};
  // leading 代表首次是否执行，trailing 代表结束后是否再执行一次
  var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
  };

  var throttled = function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          previous = now;
          func.apply(context, args);
          if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
      }
  };
  return throttled;
}

// container.onmousemove = throttle(getUserAction, 1000);
// container.onmousemove = throttle(getUserAction, 1000, {
//     leading: false
// });
container.onmousemove = throttle(getUserAction, 1000, {
    trailing: false
});