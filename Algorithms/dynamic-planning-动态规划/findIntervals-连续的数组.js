// 题目要求：写一个函数，输入一个数组[1,2,3,6,7,8,10]，返回[[1,3],[6,8],[10]]

// 分析：1、2、3连续的，然后返回1、3，6、7、8连续的，然后返回6、8，10只有单独的一个返回10

// 示例二：[1,2,3,6,7,8,9,10]返回[[1,3],[6,10]]

function findIntervals(nums) {
  if (!nums.length) return [];

  nums.sort((a, b) => a - b); // 确保数组是排序的
  const result = [];
  let start = nums[0];
  let end = nums[0];

  for (let i = 1; i < nums.length; i++) {
      if (nums[i] === end + 1) {
          end = nums[i];
      } else {
          if (start === end) {
              result.push([start]);
          } else {
              result.push([start, end]);
          }
          start = nums[i];
          end = nums[i];
      }
  }

  // 处理最后一个区间
  if (start === end) {
      result.push([start]);
  } else {
      result.push([start, end]);
  }

  return result;
}

// 示例使用
const inputArray = [1,2,3,6,7,8,9,10];
const outputIntervals = findIntervals(inputArray);
console.log(outputIntervals);

