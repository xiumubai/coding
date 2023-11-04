function request(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * 10)
    }, 1000)
  })
}

async function fn() {
  const res1 = await(request(1))
  console.log(res1);
  const res2 = await(request(res1))
  console.log(res2);
  return res2
}

fn()