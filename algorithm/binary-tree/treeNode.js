/* 二叉树节点类 */
class TreeNode {
  val; // 节点值
  left; // 左子节点指针
  right; // 右子节点指针
  constructor(val, left, right) {
      this.val = val === undefined ? 0 : val;
      this.left = left === undefined ? null : left;
      this.right = right === undefined ? null : right;
  }
}

module.exports = TreeNode