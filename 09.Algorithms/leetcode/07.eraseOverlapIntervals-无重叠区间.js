/*
 * @Author: 朽木白
 * @Date: 2023-11-06 22:41:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-06 23:10:55
 * @Description: 无重叠区间
 * @docs: https://leetcode.cn/problems/non-overlapping-intervals/
 */

/**

### 题目

给定一个区间的集合 `intervals` ，其中 `intervals[i] = [starti, endi]` 。返回 *需要移除区间的最小数量，使剩余区间互不重叠* 。

### 示例

**示例 1:**

```
输入: intervals = [[1,2],[2,3],[3,4],[1,3]]
输出: 1
解释: 移除 [1,3] 后，剩下的区间没有重叠。
```

**示例 2:**

```
输入: intervals = [ [1,2], [1,2], [1,2] ]
输出: 2
解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
```

**示例 3:**

```
输入: intervals = [ [1,2], [2,3] ]
输出: 0
解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
```

 */

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  if (intervals.length == 0 || intervals.length == 1) {
    return 0
  }
  intervals.sort(function (a, b) {
    return a[1] - b[1]
  })
  var pre = 0;//记录上一个节点
  var removeNum = 0;
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= intervals[pre][1]) {
      pre = i;//因为中途可能有删除的数组区间，直接++会将其算进结果内
    } else {
      removeNum++;
    }
  }
  return removeNum
};

var intervals = [ [1,2], [1,2], [1,2] ]
const result = eraseOverlapIntervals(intervals)
console.log(result)
