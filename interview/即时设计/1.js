// 示例用法
const array = [1, 2, 3, 4, 5];
const k = 2;
// const rotatedArray = rotateArray(inputArray, k);
// console.log(rotatedArray); // 输出: [4, 5, 1, 2, 3]

// 2
// [1, 2, 3, 4, 5]
// [4, 5, 1, 2, 3]

// k = 3

// [3, 4, 5, 1, 2]

function rotateArray(inputArray, k) {
  let len = inputArray.length
  let arr = new Array().fill(len)
  for (let i = 0; i < len; i++) {
    let index = i + k;
    if (index < len) {
      arr[i + k] = inputArray[i]
    } else {

      // arr[i] = inputArray[i]
    }
  }

  return arr
}


const result  = rotateArray(array, 2)
console.log(result);