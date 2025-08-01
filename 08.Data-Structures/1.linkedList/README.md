# 链表 (Linked List)

链表是一种线性数据结构，其中的每个元素都是单独的对象，每个元素（称为节点）由两部分组成：数据和指向下一个节点的引用（指针）。链表中的元素不是连续存储的，而是通过指针连接在一起。

## 链表的特点

- **动态大小**：链表的大小可以动态增长和缩小。
- **高效的插入和删除**：在链表的任何位置插入或删除元素的时间复杂度为 O(1)（如果已知位置）。
- **顺序访问**：链表只能按顺序访问元素，随机访问的时间复杂度为 O(n)。
- **额外的内存开销**：每个节点除了存储数据外，还需要存储指向下一个节点的指针。

## 链表的时间复杂度

- 访问：O(n)
- 搜索：O(n)
- 插入：O(1)（如果已知位置）
- 删除：O(1)（如果已知位置）

## 链表的实现

本项目实现了一个基本的单链表，包含以下功能：

### 1. 插入操作

- **append(value)**：在链表尾部添加一个新节点
- **insertAt(value, index)**：在指定位置插入一个新节点

### 2. 删除操作

- **removeAt(index)**：删除指定位置的节点

### 3. 反转操作

- **reverse()**：反转整个链表

### 4. 其他操作

- **getAt(index)**：获取指定位置节点的值
- **toArray()**：将链表转换为数组

## 链表反转原理

链表反转是一个常见的链表操作，其基本思想是改变每个节点的 next 指针的指向，使其指向前一个节点而不是后一个节点。

实现步骤：

1. 使用三个指针：prev（前一个节点）、current（当前节点）和 next（下一个节点）
2. 初始化 prev 为 null，current 为 head
3. 遍历链表，对于每个节点：
   - 保存 current.next 到 next 变量
   - 将 current.next 指向 prev
   - 将 prev 移动到 current
   - 将 current 移动到 next
4. 最后，将 head 指向 prev（原链表的最后一个节点）

## 使用示例

```javascript
const LinkedList = require('./linkedList');

// 创建链表
const list = new LinkedList();

// 添加元素
list.append(1);
list.append(2);
list.append(3);
console.log(list.toArray()); // [1, 2, 3]

// 在指定位置插入元素
list.insertAt(4, 1);
console.log(list.toArray()); // [1, 4, 2, 3]

// 删除指定位置的元素
list.removeAt(2);
console.log(list.toArray()); // [1, 4, 3]

// 反转链表
list.reverse();
console.log(list.toArray()); // [3, 4, 1]
```

## 链表的应用场景

- 实现栈、队列等数据结构
- 图的邻接表表示
- 哈希表的链式解决冲突
- 内存管理中的空闲列表
- 多项式表示和运算
- 大整数运算