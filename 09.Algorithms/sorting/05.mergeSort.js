// 归并排序（Merge sort）是建立在归并操作上的一种有效的排序算法。归并排序算法的步骤描述如下：
// 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；
// 设定两个指针，最初位置分别为两个已经排序序列的起始位置；
// 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；
// 重复步骤 3 直到某一指针达到序列尾；
// 将另一序列剩下的所有元素直接复制到合并序列尾。

function mergeSort(arr) {  // 采用自上而下的递归方法
  let len = arr.length;
  if(len < 2) {
      return arr;
  }
  let middle = Math.floor(len / 2),
      left = arr.slice(0, middle),
      right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
  let result = [];
  while (left.length && right.length) {
      if (left[0] <= right[0]) {
          result.push(left.shift());
      } else {
          result.push(right.shift());
      }
  }
  while (left.length)
      result.push(left.shift());
  while (right.length)
      result.push(right.shift());
  return result;
}


const arr = [5, 3, 8, 6, 4]
const result = mergeSort(arr);
console.log(result); // [3, 4, 5, 6, 8]