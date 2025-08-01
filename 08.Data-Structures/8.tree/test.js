const { TreeNode, BinaryTree } = require('./binaryTree');

// 创建二叉树实例
const tree = new BinaryTree();

// 创建一个示例二叉树
/*
       1
      / \
     2   3
    / \ / \
   4  5 6  7
*/
tree.createSampleTree();

// 测试前序遍历（递归实现）
console.log('前序遍历（递归）:');
console.log(tree.preOrderTraversal());
// 预期输出: [1, 2, 4, 5, 3, 6, 7]

// 测试前序遍历（非递归实现）
console.log('前序遍历（非递归）:');
console.log(tree.preOrderTraversalIterative());
// 预期输出: [1, 2, 4, 5, 3, 6, 7]

// 测试中序遍历（递归实现）
console.log('中序遍历（递归）:');
console.log(tree.inOrderTraversal());
// 预期输出: [4, 2, 5, 1, 6, 3, 7]

// 测试中序遍历（非递归实现）
console.log('中序遍历（非递归）:');
console.log(tree.inOrderTraversalIterative());
// 预期输出: [4, 2, 5, 1, 6, 3, 7]

// 测试后序遍历（递归实现）
console.log('后序遍历（递归）:');
console.log(tree.postOrderTraversal());
// 预期输出: [4, 5, 2, 6, 7, 3, 1]

// 测试后序遍历（非递归实现）
console.log('后序遍历（非递归）:');
console.log(tree.postOrderTraversalIterative());
// 预期输出: [4, 5, 2, 6, 7, 3, 1]

// 测试层序遍历
console.log('层序遍历:');
console.log(tree.levelOrderTraversal());
// 预期输出: [1, 2, 3, 4, 5, 6, 7]

// 验证遍历结果是否符合预期
const validateResult = (actual, expected, name) => {
  const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${name} 验证: ${isEqual ? '通过' : '失败'}`);
  if (!isEqual) {
    console.log(`  期望: ${JSON.stringify(expected)}`);
    console.log(`  实际: ${JSON.stringify(actual)}`);
  }
};

// 验证各种遍历方法
const expectedPreOrder = [1, 2, 4, 5, 3, 6, 7];
const expectedInOrder = [4, 2, 5, 1, 6, 3, 7];
const expectedPostOrder = [4, 5, 2, 6, 7, 3, 1];
const expectedLevelOrder = [1, 2, 3, 4, 5, 6, 7];

validateResult(tree.preOrderTraversal(), expectedPreOrder, '前序遍历（递归）');
validateResult(tree.preOrderTraversalIterative(), expectedPreOrder, '前序遍历（非递归）');
validateResult(tree.inOrderTraversal(), expectedInOrder, '中序遍历（递归）');
validateResult(tree.inOrderTraversalIterative(), expectedInOrder, '中序遍历（非递归）');
validateResult(tree.postOrderTraversal(), expectedPostOrder, '后序遍历（递归）');
validateResult(tree.postOrderTraversalIterative(), expectedPostOrder, '后序遍历（非递归）');
validateResult(tree.levelOrderTraversal(), expectedLevelOrder, '层序遍历');