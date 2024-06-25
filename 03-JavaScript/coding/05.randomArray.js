// 实现数组的乱序输出

// 方法一

var arr = [1,2,3,4,5,6,7,8,9,10];
for (var i = 0; i < arr.length; i++) {
  const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
console.log(arr)

// 方法二

var arr = [1,2,3,4,5,6,7,8,9,10];
let length = arr.length,
    randomIndex,
    temp;
while (length) {
  randomIndex = Math.floor(Math.random() * length--);
  temp = arr[length];
  arr[length] = arr[randomIndex];
  arr[randomIndex] = temp;
}
console.log(arr)