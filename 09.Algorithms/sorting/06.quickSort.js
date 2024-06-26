/**

快速排序是由东尼·霍尔所发展的一种排序算法。
它是处理大数据最快的排序算法之一。快速排序是一种分而治之思想在排序算法上的典型应用。
本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法。快速排序算法的步骤描述如下：
- 从数列中挑出一个元素，称为 “基准”（pivot）;
- 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
- 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序；
- 递归的最底部情形，是数列的大小是零或一，也就是永远都已经被排序好了。虽然一直递归下去，但是这个算法总会退出，因为在每次的迭代（iteration）中，它至少会把一个元素摆到它最后的位置去。
 */


// 1

function quickSort(arr, l, r) {
  let len = arr.length,
      partitionIndex,
      left = typeof l != 'number' ? 0 : l,
      right = typeof r != 'number' ? len - 1 : r;

  if (left < right) {
      partitionIndex = partition(arr, left, right);
      quickSort(arr, left, partitionIndex-1);
      quickSort(arr, partitionIndex+1, right);
  }
  return arr;
}

function partition(arr, left ,right) {     // 分区操作
  let pivot = left,                      // 设定基准值（pivot）
      index = pivot + 1;
  for (let i = index; i <= right; i++) {
      if (arr[i] < arr[pivot]) {
          swap(arr, i, index);
          index++;
      }        
  }
  swap(arr, pivot, index - 1);
  return index-1;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const arr = [5, 3, 8, 6, 4]
const result = quickSort(arr);
console.log(result); // [3, 4, 5, 6, 8]