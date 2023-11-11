/*
 * @Author: 朽木白
 * @Date: 2023-11-11 21:14:22
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-11 21:14:44
 * @Description: 树结构转化成数组
 */

function treeToArray(tree) {
  const result = [];

  function traverse(node) {
    result.push({ id: node.id, parentId: node.parentId, name: node.name });

    for (const child of node.children) {
      traverse(child);
    }
  }

  for (const node of tree) {
    traverse(node);
  }

  return result;
}

// 示例树形结构
const inputTree = [
  {
    id: 1,
    parentId: null,
    name: "Node 1",
    children: [
      {
        id: 2,
        parentId: 1,
        name: "Node 1.1",
        children: [
          {
            id: 4,
            parentId: 2,
            name: "Node 1.1.1",
            children: [],
          },
        ],
      },
      {
        id: 3,
        parentId: 1,
        name: "Node 1.2",
        children: [],
      },
    ],
  },
  {
    id: 5,
    parentId: null,
    name: "Node 2",
    children: [
      {
        id: 6,
        parentId: 5,
        name: "Node 2.1",
        children: [],
      },
    ],
  },
];

// 转换树形结构为数组
const array = treeToArray(inputTree);

console.log(array);
