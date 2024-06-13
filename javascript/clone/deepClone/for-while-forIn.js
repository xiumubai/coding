// 效率对比

// while > for > for in

function testWhile(n) {
  const startTime = new Date()
  let i = 0, sum = 0

  while(i < n) {
    i++;
    sum += 1
  }
  const endTime = new Date()
  const duration = endTime - startTime
  console.log(`while循环执行了${duration}ms`)
}


function testFor(n) {
  const startTime = new Date()
  let sum = 0
  for(let i = 0; i < n; i++) {
    sum += 1
  }
  const endTime = new Date()
  const duration = endTime - startTime
  console.log(`for循环执行了${duration}ms`)
}

function testForIn(n) {
  const startTime = new Date()
  let sum = 0
  const arr = Array(n).fill(1)
  for(i in arr) {
    sum += 1
  }
  const endTime = new Date()
  const duration = endTime - startTime
  console.log(`forIn循环执行了${duration}ms`)
}

let n = 10000000;
testWhile(n);
testFor(n);
testForIn(n);
