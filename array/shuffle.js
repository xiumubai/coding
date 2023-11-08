/*
 * @Author: 朽木白
 * @Date: 2023-11-08 21:08:18
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-08 21:08:21
 * @Description: 数组乱序
 */

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 您的按序数组
const orderedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// 调用 shuffleArray 函数来对数组进行乱序
shuffleArray(orderedArray);

console.log(orderedArray); // 打印乱序后的数组