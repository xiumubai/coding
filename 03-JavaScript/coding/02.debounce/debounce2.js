var count = 1;
var container = document.getElementById('container');

function getUserAction() {
  container.innerHTML = count++;
};

// 1.延时执行
function debounce(func, wait) {
  var timer = null;
  return function() {
    console.log(1);
    clearTimeout(timer)
    timer = setTimeout(func, wait)
  }
}

// container.onmousemove = getUserAction();
container.onmousemove = debounce(getUserAction, 300);
