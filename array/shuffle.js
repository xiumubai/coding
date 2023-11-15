/*
 * @Author: 朽木白
 * @Date: 2023-11-08 21:08:18
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-14 17:02:01
 * @Description: 数组乱序
 */

// 洗牌算法
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    console.log(j);
    [array[i], array[j]] = [array[j], array[i]];

    console.log(array)
  }
}


// 您的按序数组
const orderedArray = [1, 2, 3, 4, 5];

// 调用 shuffleArray 函数来对数组进行乱序
shuffleArray(orderedArray);

console.log(orderedArray); // 打印乱序后的数组

// sort方法

function shuffleArrayUsingSort(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

// 使用示例
const myArray = [1, 2, 3, 4, 5];
const shuffledArray = shuffleArrayUsingSort(myArray);
// console.log(shuffledArray);


