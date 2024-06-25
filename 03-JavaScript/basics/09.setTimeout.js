function mySetTimeout(fn, time) {
  let timer = setInterval(() => {
    clearInterval(timer)
    fn()
  }, time)
}

mySetTimeout(() => {
  console.log(1)
}, 2000)