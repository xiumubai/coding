/**
  题目要求：
  给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。
  差值是一个正数，其数值等于两值之差的绝对值。

  https://leetcode.cn/problems/minimum-absolute-difference-in-bst/submissions/580082081/
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function(root) {
  let prev = null;
  let minDiff = Infinity;
  function inOrder(node) {
      if (!node) return;

      // 递归遍历左子树
      inOrder(node.left);

      // 计算当前节点与前一个节点的差值
      if (prev !== null) {
          minDiff = Math.min(minDiff, node.val - prev);
      }
      prev = node.val;

      // 递归遍历右子树
      inOrder(node.right);
  }

  // 开始中序遍历
  inOrder(root);
  return minDiff;
};
const root = [4,2,6,1,3]
const result = getMinimumDifference(root)

console.log(result);
