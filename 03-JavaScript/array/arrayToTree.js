/*
 * @Author: 朽木白
 * @Date: 2023-11-11 21:16:07
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-11 21:16:18
 * @Description: 数组转化成树结构
 */

function arrayToTree(arr) {
  const map = {};
  const result = [];

  // 构建节点映射表
  for (const item of arr) {
    const id = item.id;
    map[id] = { ...item, children: [] };
  }

  // 构建树形结构
  for (const item of arr) {
    const parent = map[item.parentId];
    if (parent) {
      parent.children.push(map[item.id]);
    } else {
      result.push(map[item.id]);
    }
  }

  return result;
}

// 示例数组
const inputArray = [
  { id: 1, parentId: null, name: "Node 1" },
  { id: 2, parentId: 1, name: "Node 1.1" },
  { id: 3, parentId: 1, name: "Node 1.2" },
  { id: 4, parentId: 2, name: "Node 1.1.1" },
  { id: 5, parentId: null, name: "Node 2" },
  { id: 6, parentId: 5, name: "Node 2.1" },
];

// 转换数组为树形结构
const tree = arrayToTree(inputArray);

console.log(tree);
