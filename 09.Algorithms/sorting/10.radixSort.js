/**
 基数排序算法：
 基数排序是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。
 由于整数也可以表达字符串（比如名字或日期）和特定格式的浮点数，所以基数排序也不是只能使用于整数。
 */

 function radixSort(arr) {
  if (arr.length === 0) return arr;

  // 获取数组中最大数的位数
  const maxNum = Math.max(...arr);
  const maxDigits = Math.floor(Math.log10(maxNum)) + 1;

  // 逐位排序
  let digit = 1;
  while (digit <= maxDigits) {
      // 创建桶（0-9）
      const buckets = Array.from({ length: 10 }, () => []);

      // 将元素分配到桶中
      for (let i = 0; i < arr.length; i++) {
          const num = Math.floor((arr[i] / Math.pow(10, digit - 1)) % 10);
          buckets[num].push(arr[i]);
      }

      // 将桶中的元素合并回数组
      arr = [];
      for (let i = 0; i < buckets.length; i++) {
          arr = arr.concat(buckets[i]);
      }

      digit++;
  }

  return arr;
}

// 测试基数排序算法
const array = [170, 45, 75, 90, 802, 24, 2, 66];
const sortedArray = radixSort(array);
console.log('排序后:', sortedArray);
