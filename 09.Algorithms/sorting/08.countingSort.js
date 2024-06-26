/**
 计数排序算法:
 计数排序的核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。
 时间复杂度是 O(n + k)
 */

 function countingSort(arr) {
  if (arr.length === 0) return arr;

  // 找到数组中的最大值和最小值
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) min = arr[i];
      if (arr[i] > max) max = arr[i];
  }

  // 创建计数数组并统计每个元素的出现次数
  const countArray = new Array(max - min + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
      countArray[arr[i] - min]++;
  }

  // 构建排序后的数组
  let sortedIndex = 0;
  for (let i = 0; i < countArray.length; i++) {
      while (countArray[i] > 0) {
          arr[sortedIndex++] = i + min;
          countArray[i]--;
      }
  }

  return arr;
}



const arr = [5, 3, 8, 6, 4]
const result = countingSort(arr);
console.log(result); // [3, 4, 5, 6, 8]