/**
 桶排序算法:

 */
 function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return arr;

  // 找到数组中的最大值和最小值
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) min = arr[i];
      if (arr[i] > max) max = arr[i];
  }

  // 计算桶的数量
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = new Array(bucketCount).fill(null).map(() => []);

  // 将元素分布到各个桶中
  for (let i = 0; i < arr.length; i++) {
      const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
      buckets[bucketIndex].push(arr[i]);
  }

  // 对每个桶中的元素进行排序，并合并到结果数组中
  const sortedArray = [];
  for (let i = 0; i < buckets.length; i++) {
      if (buckets[i].length > 0) {
          insertionSort(buckets[i]);
          sortedArray.push(...buckets[i]);
      }
  }

  return sortedArray;
}

// 插入排序（用于对桶中的元素进行排序）
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          j--;
      }
      arr[j + 1] = key;
  }
  return arr;
}


// 测试桶排序算法

const arr = [5, 3, 8, 6, 4]
const result = bucketSort(arr);
console.log(result); // [3, 4, 5, 6, 8]
