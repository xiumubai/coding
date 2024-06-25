// allSettled: 不管成功失败，一起返回成功
function promiseAllSettled(promises) {
  const result = [];
  for (let p of promises) {
    result.push(
      Promise.resolve(p).then(
        (value) => ({ value, status: "FULFILLED" }),
        (reason) => ({ reason, status: "REJECTED" })
      )
    );
  }
  return Promise.all(result);
}
