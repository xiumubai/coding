// 笛卡尔积问题

function combine(arr) {
  // 基线条件：如果数组为空，返回空数组
  if (arr.length === 0) return [[]];
  
  // 取出第一个数组
  const first = arr[0];
  // 获取剩余的数组
  const rest = arr.slice(1);
  
  // 递归处理剩余的数组
  const combinesWithoutFirst = combine(rest);
  
  // 存储所有组合结果
  const result = [];
  
  // 遍历第一个数组的每个元素
  for (let item of first) {
      // 将当前元素与递归返回的每个组合进行组合
      for (let combination of combinesWithoutFirst) {
          result.push([item, ...combination]);
      }
  }
  
  return result;
}

// 测试代码
const arr = [[1, 2], [3, 4], [5, 6]];
console.log(combine(arr));