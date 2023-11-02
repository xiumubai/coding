/*
 * @Author: 朽木白
 * @Date: 2023-11-02 10:49:35
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-02 20:01:35
 * @Description: 实现数组的旋转
 */
// 示例用法
// const array = [1, 2, 3, 4, 5];  4 5 1 2 3
// const k = 2;
// const rotatedArray = rotateArray(inputArray, k);
// console.log(rotatedArray); // 输出: [4, 5, 1, 2, 3]

function rotateArray(inputArray, k) {
  const n = inputArray.length;
  k = k % n; // 处理 k 大于数组长度的情况

  for (let i = 0; i < k; i++) {
      const element = inputArray.pop(); // 移除数组的最后一个元素
      inputArray.unshift(element); // 将元素插入到数组的开头
  }

  return inputArray;
}

const inputArray = [1, 2, 3, 4, 5];
const k = 2;
const result = rotateArray(inputArray, k);
console.log(result); // 输出: [4, 5, 1, 2, 3]
