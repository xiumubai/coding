# 二叉树遍历

二叉树是一种重要的数据结构，每个节点最多有两个子节点：左子节点和右子节点。二叉树的遍历是指按照某种顺序访问二叉树中的所有节点，常见的遍历方式有前序遍历、中序遍历、后序遍历和层序遍历。

## 遍历方式

### 1. 前序遍历 (Pre-order Traversal)

遍历顺序：**根节点 -> 左子树 -> 右子树**

前序遍历首先访问根节点，然后递归地前序遍历左子树，最后递归地前序遍历右子树。

#### 递归实现

```javascript
function preOrderTraversal(node) {
  if (node === null) return;
  
  // 访问根节点
  console.log(node.val);
  // 遍历左子树
  preOrderTraversal(node.left);
  // 遍历右子树
  preOrderTraversal(node.right);
}
```

#### 非递归实现（使用栈）

```javascript
function preOrderTraversalIterative(root) {
  if (root === null) return [];
  
  const result = [];
  const stack = [root];
  
  while (stack.length > 0) {
    const current = stack.pop();
    result.push(current.val);
    
    // 先将右子节点入栈，再将左子节点入栈
    if (current.right !== null) {
      stack.push(current.right);
    }
    if (current.left !== null) {
      stack.push(current.left);
    }
  }
  
  return result;
}
```

### 2. 中序遍历 (In-order Traversal)

遍历顺序：**左子树 -> 根节点 -> 右子树**

中序遍历首先递归地中序遍历左子树，然后访问根节点，最后递归地中序遍历右子树。

#### 递归实现

```javascript
function inOrderTraversal(node) {
  if (node === null) return;
  
  // 遍历左子树
  inOrderTraversal(node.left);
  // 访问根节点
  console.log(node.val);
  // 遍历右子树
  inOrderTraversal(node.right);
}
```

#### 非递归实现（使用栈）

```javascript
function inOrderTraversalIterative(root) {
  if (root === null) return [];
  
  const result = [];
  const stack = [];
  let current = root;
  
  while (current !== null || stack.length > 0) {
    // 一直遍历左子树，并将节点入栈
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }
    
    // 弹出栈顶节点
    current = stack.pop();
    result.push(current.val);
    
    // 处理右子树
    current = current.right;
  }
  
  return result;
}
```

### 3. 后序遍历 (Post-order Traversal)

遍历顺序：**左子树 -> 右子树 -> 根节点**

后序遍历首先递归地后序遍历左子树，然后递归地后序遍历右子树，最后访问根节点。

#### 递归实现

```javascript
function postOrderTraversal(node) {
  if (node === null) return;
  
  // 遍历左子树
  postOrderTraversal(node.left);
  // 遍历右子树
  postOrderTraversal(node.right);
  // 访问根节点
  console.log(node.val);
}
```

#### 非递归实现（使用两个栈）

```javascript
function postOrderTraversalIterative(root) {
  if (root === null) return [];
  
  const result = [];
  const stack1 = [root];
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
```

### 4. 层序遍历 (Level-order Traversal)

层序遍历是按照从上到下、从左到右的顺序访问二叉树的所有节点。

#### 实现（使用队列）

```javascript
function levelOrderTraversal(root) {
  if (root === null) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current.val);
    
    if (current.left !== null) {
      queue.push(current.left);
    }
    if (current.right !== null) {
      queue.push(current.right);
    }
  }
  
  return result;
}
```

## 遍历方式的应用场景

1. **前序遍历**：
   - 创建二叉树的复制
   - 打印目录结构
   - 表达式树的前缀表示法（波兰表示法）

2. **中序遍历**：
   - 对于二叉搜索树，中序遍历可以得到有序的节点序列
   - 表达式树的中缀表示法（常规表示法）

3. **后序遍历**：
   - 删除二叉树
   - 计算目录大小
   - 表达式树的后缀表示法（逆波兰表示法）

4. **层序遍历**：
   - 按层次打印二叉树
   - 寻找最短路径
   - 二叉树的序列化与反序列化

## 时间复杂度和空间复杂度

对于所有遍历方法：
- **时间复杂度**：O(n)，其中 n 是二叉树中的节点数量，因为每个节点都会被访问一次。
- **空间复杂度**：
  - 递归实现：O(h)，其中 h 是二叉树的高度，最坏情况下为 O(n)（当树退化为链表时）。
  - 非递归实现：O(n)，需要使用栈或队列来存储节点。

## 总结

二叉树的遍历是操作二叉树的基础，掌握这些遍历方法对于理解和实现更复杂的树算法至关重要。在实际应用中，应根据具体需求选择合适的遍历方式。