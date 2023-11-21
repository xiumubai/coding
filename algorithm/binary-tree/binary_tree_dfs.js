/* 前序遍历 */
function preOrder(root) {
  if (root === null) return;
  // 访问优先级：根节点 -> 左子树 -> 右子树
  list.push(root.val);
  preOrder(root.left);
  preOrder(root.right);
}

/* 中序遍历 */
function inOrder(root) {
  if (root === null) return;
  // 访问优先级：左子树 -> 根节点 -> 右子树
  inOrder(root.left);
  list.push(root.val);
  inOrder(root.right);
}

/* 后序遍历 */
function postOrder(root) {
  if (root === null) return;
  // 访问优先级：左子树 -> 右子树 -> 根节点
  postOrder(root.left);
  postOrder(root.right);
  list.push(root.val);
}

/* 前序、中序和后序遍历都属于「深度优先遍历 depth-first traversal」，它体现了一种“先走到尽头，再回溯继续”的遍历方式 */