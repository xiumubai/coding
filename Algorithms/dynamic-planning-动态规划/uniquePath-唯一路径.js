/*
 * @Author: 朽木白
 * @Date: 2023-10-15 16:52:28
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-15 17:39:48
 * @Description: 唯一路径
 * @docs: https://leetcode.cn/problems/unique-paths/
 */

/**

下方的一个宫格，每个数字代表一个位置：

[1,2,3,4,5,6,7]
[1,2,3,4,5,6,7]
[2,2,3,4,5,6,7]

从左上角的位置触发，到达右下角的位置，总共有几种路径

思路：

从左上角的位置触发。要么向左触发，要么向右，那么到达宫格中每个点的路径方式我们可以列出来如下：

   0  1  2  3  4  5  6
0 [1, 1, 1, 1, 1, 1, 1]
1 [1, 2, 3, 4, 5, 6, 7]
2 [1, 3, 6, 10, 15, 21, 28]


可以看出，到达右下角的位置的时候，有28种方式

上面的方式复杂度为O(n*m)

我们发现每一项都是前两项的和，就可以降低为一维数组（滚动数组的方式）


let dp = [1, 1, 1, 1, 1, 1, 1]
当 i = 1,j = 1
dp = [1, 2, 3, 4, 5, 6, 7]
i = 2,j = 1
dp = [1, 3, 6, 10， 15，21， 28 ]

 */

/**
 * 
 * @param {*} m 行 
 * @param {*} n 列 
 */
function uniquePath(m, n) {
  let dp = new Array(n).fill(1)
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1]
    }  
  }
  return dp[n - 1]
}

const result = uniquePath(3, 7)
console.log(result)