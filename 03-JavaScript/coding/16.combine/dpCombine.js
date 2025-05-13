// 动态规划实现数组组合

function dpCombine(arr) {
  // 如果数组为空，返回空数组
  if (arr.length === 0) return [[]];
  
  // 从第一个数组开始，逐步构建结果
  let result = arr[0].map(item => [item]);
  
  // 遍历剩余的数组
  for (let i = 1; i < arr.length; i++) {
      const temp = [];
      // 对于当前的每个组合
      for (let combination of result) {
          // 与当前数组的每个元素组合
          for (let num of arr[i]) {
              temp.push([...combination, num]);
          }
      }
      result = temp;
  }
  
  return result;
}

// 测试代码
const arr2 = [[1, 2], [3, 4], [5, 6]];
console.log('动态规划结果：', dpCombine(arr2));