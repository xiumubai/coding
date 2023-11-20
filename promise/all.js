// all：返回 promise 列表中全部执行完的结果


const promise1 = Promise.resolve(3);
const promise2 = 42;

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// Promise.all([promise1, promise2, promise3]).then((values) => {
//   console.log(values);
// });

// Expected output: Array [3, 42, "foo"]

function myAll(promises) {
  let result = [];   
  let index = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(res => {
          // 输出结果的顺序和promises的顺序一致
          result[i] = res;
          index++;
          if (index === promises.length) {
            resolve(result);
          }
        })
        .catch(err => {
          reject(err);
        });
    }
  });
}
myAll([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});