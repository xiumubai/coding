
/**
 * 选择排序是一种简单直观的排序算法，无论什么数据进去都是 O(n²) 的时间复杂度
 * 步骤描述如下：
 * 1.首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置。
 * 2.再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
 * 3.重复第二步，直到所有元素均排序完毕。
 */

/**
 * @description: 选择排序
 * @returns {*}
 */
function selectionSort(arr) {
  let len = arr.length;
  let minIndex, temp;
  for (let i = 0; i < len - 1; i++) {
      minIndex = i;
      for (let j = i + 1; j < len; j++) {
          if (arr[j] < arr[minIndex]) {     // 寻找最小的数
              minIndex = j;                 // 将最小数的索引保存
          }
      }
      temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
  }
  return arr;
}

const arr = [5, 3, 8, 6, 4]
const result = selectionSort(arr);
console.log(result); // [3, 4, 5, 6, 8]
