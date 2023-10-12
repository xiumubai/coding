const LinkedList = require ('./linkedList')

// 测试用例

const linkedList = new LinkedList()
linkedList.append(1)
linkedList.append(2)
linkedList.append(3)
// 插入
// linkedList.insertAt(4, 2)

// 删除第一个节点
// linkedList.removeAt(0)

// 删除最后一个节点
// linkedList.removeAt(3)
// 删除后不剩一个节点
// linkedList.removeAt(0)

console.log('head', linkedList.head)
// console.log('tail', linkedList.tail)

// 获取所有的节点value
// console.log('list', linkedList.toArray())

// 获取某个节点
// console.log('value', linkedList.getAt(2))


// 解释为什么tail变换以后head会跟着一起变化
// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// const node1 = new Node(1)
// let head = node1
// let tail = node1
// console.log(head, tail)
// const node2 = new Node(2)
// tail.next = node2
// console.log(head, tail)