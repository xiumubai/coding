/*
 * @Author: 朽木白
 * @Date: 2023-10-12 14:37:25
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-12 15:04:19
 * @Description: 冒泡排序
 */

// 需要排序的数组
let arr = [5, 3, 8, 6, 4]

/**
 * 1.双for循环
 * 思路：其基本思想是通过不断地比较相邻元素并在必要时进行交换，将最大（或最小）的元素"冒"到序列的一端
 * 算法复杂度: O(n^2)
 */
for(let i = 0, len = arr.length; i < len; i++) {
  for(let j = 0; j < len - i - 1; j++) {
    // 这里-1是因为最后一位已经与前一位做了比较，下标到了最后一位的时候，不需要与别的比较了
    if (arr[j] > arr[j + 1]) {
      let temp = arr[j]
      arr[j] = arr[j + 1]
      arr[j + 1] = temp
    }
  }
}

console.log(arr)

/**
 * 2.交换标记法
 * 思路：如果在一次遍历过程中没有发生过交换，那么意味着序列已经是有序的，不需要继续排序。我们可以通过设置一个标记来优化算法。如果在某次遍历中没有发生交换，则直接结束排序
 */

// 需要排序的数组
let arr2 = [5, 3, 8, 6, 4]
let swapped = true
while(swapped) {
  swapped = false
  for(let i = 0, len = arr2.length; i < len - 1; i++) {
    if (arr2[i] > arr2[i + 1]) {
      let temp = arr2[i]
      arr2[i] = arr2[i +1]
      arr2[i + 1] = temp 
      swapped = true
    }
  }
}

console.log(arr2);

/**
 * 3.双向冒泡排序
 * 思路：一趟遍历只能确保最大（或最小）的数被移到序列一端，在双向冒泡排序中，一趟遍历包括了两个过程，一个从头至尾，一个从尾至头，这样就能确保在一趟遍历后，最大和最小的数都被移到了正确的位置
 */
let array = [5, 3, 8, 4, 6];
let swapped2;
let start = 0;
let end = array.length - 1;

while(start < end) {
  for(let i = start; i < end; i++) {
    if(array[i] > array[i + 1]) {
      let temp = array[i];
      array[i] = array[i + 1];
      array[i + 1] = temp;
      swapped2 = i;
    }
  }
  end = swapped2;

  for(let i = end; i > start; i--) {
    if(array[i] < array[i - 1]) {
      let temp = array[i];
      array[i] = array[i - 1];
      array[i - 1] = temp;
      swapped2 = i;
    }
  }
  start = swapped2;
}

console.log(array);  // 输出: [3, 4, 5, 6, 8]

/**
 * 4.记录最后一次交换的位置
 * 思路：在实际的数据序列中，尾部的有序序列通常不只一个，因此我们可以记住最后一次交换发生的位置，下一次比较到这个位置即可
 */
let array2 = [5, 3, 8, 4, 6];
let lastExchangeIndex = 0;
let sortBorder = array2.length - 1;

for(let i = 0; i < array2.length - 1; i++) {
  let isSorted = true;
  for(let j = 0; j < sortBorder; j++) {
    if(array2[j] > array2[j + 1]) {
      let temp = array2[j];
      array2[j] = array2[j + 1];
      array2[j + 1] = temp;
      
      isSorted = false;
      lastExchangeIndex = j;
    }
  }
  sortBorder = lastExchangeIndex;
  if(isSorted) {
    break;
  }
}

console.log(array2);  // 输出: [3, 4, 5, 6, 8]
