/**
 * 平衡二叉搜索树
 */

/* AVL 树节点类 */
class TreeNode {
  val; // 节点值
  height; //节点高度
  left; // 左子节点指针
  right; // 右子节点指针
  constructor(val, left, right, height) {
      this.val = val === undefined ? 0 : val;
      this.height = height === undefined ? 0 : height;
      this.left = left === undefined ? null : left;
      this.right = right === undefined ? null : right;
  }

  /* 获取节点高度 */
  height(node) {
    // 空节点高度为 -1 ，叶节点高度为 0
    return node === null ? -1 : node.height;
  }

  /* 更新节点高度 */
  #updateHeight(node) {
    // 节点高度等于最高子树高度 + 1
    node.height =
        Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  /* 获取平衡因子 */
  balanceFactor(node) {
    // 空节点平衡因子为 0
    if (node === null) return 0;
    // 节点平衡因子 = 左子树高度 - 右子树高度
    return this.height(node.left) - this.height(node.right);
  }

  /* 右旋操作 */
  #rightRotate(node) {
    const child = node.left;
    const grandChild = child.right;
    // 以 child 为原点，将 node 向右旋转
    child.right = node;
    node.left = grandChild;
    // 更新节点高度
    this.#updateHeight(node);
    this.#updateHeight(child);
    // 返回旋转后子树的根节点
    return child;
  }

  /* 左旋操作 */
  #leftRotate(node) {
    const child = node.right;
    const grandChild = child.left;
    // 以 child 为原点，将 node 向左旋转
    child.left = node;
    node.right = grandChild;
    // 更新节点高度
    this.#updateHeight(node);
    this.#updateHeight(child);
    // 返回旋转后子树的根节点
    return child;
  }

  /* 执行旋转操作，使该子树重新恢复平衡 */
  #rotate(node) {
    // 获取节点 node 的平衡因子
    const balanceFactor = this.balanceFactor(node);
    // 左偏树
    if (balanceFactor > 1) {
        if (this.balanceFactor(node.left) >= 0) {
            // 右旋
            return this.#rightRotate(node);
        } else {
            // 先左旋后右旋
            node.left = this.#leftRotate(node.left);
            return this.#rightRotate(node);
        }
    }
    // 右偏树
    if (balanceFactor < -1) {
        if (this.balanceFactor(node.right) <= 0) {
            // 左旋
            return this.#leftRotate(node);
        } else {
            // 先右旋后左旋
            node.right = this.#rightRotate(node.right);
            return this.#leftRotate(node);
        }
    }
    // 平衡树，无须旋转，直接返回
    return node;
  }

  /* 插入节点 */
  insert(val) {
    this.root = this.#insertHelper(this.root, val);
  }

  /* 递归插入节点（辅助方法） */
  #insertHelper(node, val) {
    if (node === null) return new TreeNode(val);
    /* 1. 查找插入位置，并插入节点 */
    if (val < node.val) node.left = this.#insertHelper(node.left, val);
    else if (val > node.val)
        node.right = this.#insertHelper(node.right, val);
    else return node; // 重复节点不插入，直接返回
    this.#updateHeight(node); // 更新节点高度
    /* 2. 执行旋转操作，使该子树重新恢复平衡 */
    node = this.#rotate(node);
    // 返回子树的根节点
    return node;
  }

  /* 删除节点 */
  remove(val) {
    this.root = this.#removeHelper(this.root, val);
  }

  /* 递归删除节点（辅助方法） */
  #removeHelper(node, val) {
    if (node === null) return null;
    /* 1. 查找节点，并删除之 */
    if (val < node.val) node.left = this.#removeHelper(node.left, val);
    else if (val > node.val)
        node.right = this.#removeHelper(node.right, val);
    else {
        if (node.left === null || node.right === null) {
            const child = node.left !== null ? node.left : node.right;
            // 子节点数量 = 0 ，直接删除 node 并返回
            if (child === null) return null;
            // 子节点数量 = 1 ，直接删除 node
            else node = child;
        } else {
            // 子节点数量 = 2 ，则将中序遍历的下个节点删除，并用该节点替换当前节点
            let temp = node.right;
            while (temp.left !== null) {
                temp = temp.left;
            }
            node.right = this.#removeHelper(node.right, temp.val);
            node.val = temp.val;
        }
    }
    this.#updateHeight(node); // 更新节点高度
    /* 2. 执行旋转操作，使该子树重新恢复平衡 */
    node = this.#rotate(node);
    // 返回子树的根节点
    return node;
  }


}


/*
应用：

组织和存储大型数据，适用于高频查找、低频增删的场景。
用于构建数据库中的索引系统。
红黑树在许多应用中比 AVL 树更受欢迎。这是因为红黑树的平衡条件相对宽松，在红黑树中插入与删除节点所需的旋转操作相对较少，其节点增删操作的平均效率更高。
*/