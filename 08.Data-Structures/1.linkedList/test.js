const LinkedList = require ('./linkedList')

// 测试用例

// 1. 测试基本操作
console.log('===== 测试基本操作 =====')
const linkedList = new LinkedList()
linkedList.append(1)
linkedList.append(2)
linkedList.append(3)
console.log('原始链表:', linkedList.toArray())

// 2. 测试插入操作
console.log('\n===== 测试插入操作 =====')
linkedList.insertAt(4, 2) // 在索引2的位置插入4，链表变为 [1, 2, 4, 3]
console.log('插入后链表:', linkedList.toArray())

// 3. 测试删除操作
console.log('\n===== 测试删除操作 =====')
linkedList.removeAt(1) // 删除索引1的节点，链表变为 [1, 4, 3]
console.log('删除后链表:', linkedList.toArray())

// 4. 测试反转操作
console.log('\n===== 测试反转操作 =====')
linkedList.reverse() // 反转链表，链表变为 [3, 4, 1]
console.log('反转后链表:', linkedList.toArray())
console.log('头节点:', linkedList.head.value)
console.log('尾节点:', linkedList.tail.value)

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