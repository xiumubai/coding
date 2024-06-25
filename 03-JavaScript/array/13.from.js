// 手写Array.from
Array.myFrom = function (el) {
  return Array.apply(this, el);
}
var arrLike = {length: 4, 2: "foo" };
var arr = Array.from( arrLike ); //  [undefined, undefined, "foo", undefined]
