// 题目要求：用js实现一个方法在一个数组中去掉一个最高分和一个最低分取其他值的平均值

function averageExcludingMinMax(arr) {
  if (arr.length <= 2) {
    // 如果数组元素少于等于2个，去掉最值后没有值可取，返回0
    return 0;
  }

  // 找到数组中的最高分和最低分
  const max = Math.max(...arr);
  const min = Math.min(...arr);

  // 过滤掉最高分和最低分
  const filteredArr = arr.filter(score => score !== max && score !== min);

  // 如果过滤后数组为空（说明所有分数都相等），返回0或提示
  if (filteredArr.length === 0) {
    return 0;
  }

  // 计算过滤后数组的平均值
  const sum = filteredArr.reduce((acc, score) => acc + score, 0);
  return sum / filteredArr.length;
}

// 避免重复使用 Math.max() 和 Math.min()。这样能够减少不必要的遍历和内存分配操作
// 需要尽量减少对数组的重复遍历操作，并且保证算法的时间复杂度尽可能低。我们可以在一次遍历中找到最大值和最小值
// 优化后的代码实现，采用一次遍历来找到最大值和最小值，并且只移除其中一个最大值和最小值

function averageExcludingMinMax2(arr) {
  const len = arr.length;
  if (len <= 2) {
    return 0;  // 不足3个元素，直接返回0
  }

  // 初始化最小值和最大值
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;

  // 一次遍历，找出最小值、最大值，并计算总和
  for (let i = 0; i < len; i++) {
    sum += arr[i];
    if (arr[i] < min) {
      min = arr[i];
    }
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  // 去掉一个最大值和一个最小值后，重新计算总和
  const adjustedSum = sum - min - max;

  // 平均值 = (总和 - 最小值 - 最大值) / (元素个数 - 2)
  return adjustedSum / (len - 2);
}


// 示例用法
const scores = [80, 90, 70, 100, 60];
const average = averageExcludingMinMax2(scores);
console.log(average); // 输出 80
