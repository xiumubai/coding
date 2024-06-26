/*
 * @Author: 朽木白
 * @Date: 2023-10-17 20:05:48
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-17 20:05:53
 * @Description: 三数之和
 */

// 用`双端指针`的方式，将三数之和转化为两数之和
function findThree(arr, target) {
  // 先将数组从小到大排序
  arr.sort();
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    // 跳过重复的arr[i]值, 比如[2, 1, 1],跳过第二个1
    if (i && arr[i] === arr[i - 1]) continue;
    let left = i + 1;
    let right = arr.length - 1;

    // 双端指针left、right
    while (left < right) {
      let sum = arr[i] + arr[left] + arr[right];
      if (sum > target) {
        right--;
      } else if (sum < target) {
        left++;
      } else {
        // 先取arr[left]，然后left++, 两步合成一步；arr[right--]同样的逻辑
        result.push([arr[i], arr[left++], arr[right--]]);
        while (arr[left] === arr[left - 1]) {
          // 跳过重复的arr[left]值,
          left++;
        }
        while (arr[right] === arr[right + 1]) {
          // 跳过重复的arr[right]值
          right--;
        }
      }
    }
  }
  return result;
}
