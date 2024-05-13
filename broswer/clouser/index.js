function fn() {
  let num = 1;
  return function f1() {
    console.log(num);
  };
}
let a = fn();
a();
