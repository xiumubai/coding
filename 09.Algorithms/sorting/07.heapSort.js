/**
 堆排序
 堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。
 堆排序算法的步骤描述如下：
 创建一个堆 H[0……n-1]；把堆首（最大值）和堆尾互换；
 把堆的尺寸缩小 1，并调用 shift_down(0)，目的是把新的数组顶端数据调整到相应位置；
 重复步骤 2，直到堆的尺寸为 1。JavaScript实现堆排序算法的代码如下：let len;
 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
 */

 function buildMaxHeap(arr) {   // 建立大顶堆
  len = arr.length;
  for (let i = Math.floor(len/2); i >= 0; i--) {
      heapify(arr, i);
  }
}

function heapify(arr, i) {     // 堆调整
  let left = 2 * i + 1,
      right = 2 * i + 2,
      largest = i;

  if (left < len && arr[left] > arr[largest]) {
      largest = left;
  }

  if (right < len && arr[right] > arr[largest]) {
      largest = right;
  }

  if (largest != i) {
      swap(arr, i, largest);
      heapify(arr, largest);
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function heapSort(arr) {
  buildMaxHeap(arr);

  for (let i = arr.length-1; i > 0; i--) {
      swap(arr, 0, i);
      len--;
      heapify(arr, 0);
  }
  return arr;
}

const arr = [5, 3, 8, 6, 4]
const result = heapSort(arr);
console.log(result); // [3, 4, 5, 6, 8]