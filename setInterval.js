function mySetInterval(fn, time) {
  let timer = null

  function interval() {
    fn()
    timer = setTimeout(interval, time)
  }
  interval()
  return {
    cancel() {
      clearTimeout(timer)
    }
  }
}

mySetInterval(() => {
  console.log(1)
}, 1000)