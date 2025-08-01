/**
 * 二叉树节点类
 */
class TreeNode {
  constructor(val) {
    this.val = val;     // 节点值
    this.left = null;   // 左子节点
    this.right = null;  // 右子节点
  }
}

/**
 * 二叉树类
 */
class BinaryTree {
  constructor() {
    this.root = null;  // 根节点
  }

  /**
   * 创建一个简单的二叉树用于测试
   * 创建如下结构的二叉树：
   *       1
   *      / \
   *     2   3
   *    / \ / \
   *   4  5 6  7
   */
  createSampleTree() {
    this.root = new TreeNode(1);
    this.root.left = new TreeNode(2);
    this.root.right = new TreeNode(3);
    this.root.left.left = new TreeNode(4);
    this.root.left.right = new TreeNode(5);
    this.root.right.left = new TreeNode(6);
    this.root.right.right = new TreeNode(7);
    return this.root;
  }

  /**
   * 前序遍历（递归实现）
   * 遍历顺序：根节点 -> 左子树 -> 右子树
   */
  preOrderTraversal(node = this.root) {
    const result = [];
    
    const preOrder = (node) => {
      if (node === null) return;
      
      // 访问根节点
      result.push(node.val);
      // 遍历左子树
      preOrder(node.left);
      // 遍历右子树
      preOrder(node.right);
    };
    
    preOrder(node);
    return result;
  }

  /**
   * 前序遍历（非递归实现）
   * 使用栈来模拟递归过程
   */
  preOrderTraversalIterative(node = this.root) {
    if (node === null) return [];
    
    const result = [];
    const stack = [node];
    
    while (stack.length > 0) {
      // 弹出栈顶节点
      const current = stack.pop();
      
      // 访问当前节点
      result.push(current.val);
      
      // 先将右子节点入栈，再将左子节点入栈
      // 这样出栈顺序就是：根 -> 左 -> 右
      if (current.right !== null) {
        stack.push(current.right);
      }
      if (current.left !== null) {
        stack.push(current.left);
      }
    }
    
    return result;
  }

  /**
   * 中序遍历（递归实现）
   * 遍历顺序：左子树 -> 根节点 -> 右子树
   */
  inOrderTraversal(node = this.root) {
    const result = [];
    
    const inOrder = (node) => {
      if (node === null) return;
      
      // 遍历左子树
      inOrder(node.left);
      // 访问根节点
      result.push(node.val);
      // 遍历右子树
      inOrder(node.right);
    };
    
    inOrder(node);
    return result;
  }

  /**
   * 中序遍历（非递归实现）
   * 使用栈来模拟递归过程
   */
  inOrderTraversalIterative(node = this.root) {
    if (node === null) return [];
    
    const result = [];
    const stack = [];
    let current = node;
    
    while (current !== null || stack.length > 0) {
      // 一直遍历左子树，并将节点入栈
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }
      
      // 弹出栈顶节点
      current = stack.pop();
      
      // 访问当前节点
      result.push(current.val);
      
      // 处理右子树
      current = current.right;
    }
    
    return result;
  }

  /**
   * 后序遍历（递归实现）
   * 遍历顺序：左子树 -> 右子树 -> 根节点
   */
  postOrderTraversal(node = this.root) {
    const result = [];
    
    const postOrder = (node) => {
      if (node === null) return;
      
      // 遍历左子树
      postOrder(node.left);
      // 遍历右子树
      postOrder(node.right);
      // 访问根节点
      result.push(node.val);
    };
    
    postOrder(node);
    return result;
  }

  /**
   * 后序遍历（非递归实现）
   * 使用两个栈来模拟递归过程
   */
  postOrderTraversalIterative(node = this.root) {
    if (node === null) return [];
    
    const result = [];
    const stack1 = [node];
    const stack2 = [];
    
    // 第一个栈用于遍历，第二个栈用于存储后序遍历的结果
    while (stack1.length > 0) {
      const current = stack1.pop();
      stack2.push(current);
      
      // 先将左子节点入栈，再将右子节点入栈
      if (current.left !== null) {
        stack1.push(current.left);
      }
      if (current.right !== null) {
        stack1.push(current.right);
      }
    }
    
    // 弹出第二个栈中的所有节点，得到后序遍历结果
    while (stack2.length > 0) {
      result.push(stack2.pop().val);
    }
    
    return result;
  }

  /**
   * 层序遍历（广度优先遍历）
   * 使用队列实现
   */
  levelOrderTraversal(node = this.root) {
    if (node === null) return [];
    
    const result = [];
    const queue = [node];
    
    while (queue.length > 0) {
      const current = queue.shift();
      
      // 访问当前节点
      result.push(current.val);
      
      // 将左右子节点加入队列
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    
    return result;
  }
}

module.exports = { TreeNode, BinaryTree };