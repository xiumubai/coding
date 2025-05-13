// 回溯法实现
function backtrackCombine(arr) {
  const result = [];
  
  // 回溯函数
  function backtrack(current, depth) {
      // 当收集到的元素个数等于数组长度时，将结果加入
      if (depth === arr.length) {
          result.push([...current]);
          return;
      }
      
      // 遍历当前层的所有可能选择
      for (let num of arr[depth]) {
          // 选择当前元素
          current.push(num);
          // 继续处理下一层
          backtrack(current, depth + 1);
          // 撤销选择，回溯
          current.pop();
      }
  }
  
  backtrack([], 0);
  return result;
}

// 测试代码
const arr = [[1, 2], [3, 4], [5, 6]];
console.log('回溯法结果：', backtrackCombine(arr));