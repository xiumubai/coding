const promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve(2), 500));
const promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 1500));

promiseAll([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // 输出 [1, 2, 3]
  })
  .catch((error) => {
    console.error(error);
  });


  function promiseAll(promsies) {
    let result = []
    let index = 0
    return new Promise((resolve, reject) => {
      for(let i = 0; i < promsies.length; i++) {
        Promise.resolve(promsies[i]).then(res => {
          result[i] = res
          index ++

          if (index === promsies.length) {
          resolve(result)
        }
        }).catch(err => {
          reject(err)
        })
      }
    })
  }
