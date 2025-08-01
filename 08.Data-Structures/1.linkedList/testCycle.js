/*
 * @Author: Trae Builder
 * @Description: 链表环检测算法测试
 */

const LinkedList = require('./linkedList');
const { hasCycle, hasCycleUsingHashMap, detectCycle } = require('./hasCycle');

// 创建一个带环的链表
function createLinkedListWithCycle() {
  const list = new LinkedList();
  list.append(1);
  list.append(2);
  list.append(3);
  list.append(4);
  list.append(5);
  
  // 手动创建环：将最后一个节点的 next 指向第二个节点（索引为 1 的节点）
  let current = list.head;
  let cycleEntryNode = null;
  let index = 0;
  const targetIndex = 1; // 环的入口节点索引
  
  // 找到环的入口节点
  while (current) {
    if (index === targetIndex) {
      cycleEntryNode = current;
    }
    if (!current.next) {
      // 到达链表尾部，将尾节点的 next 指向环的入口节点
      current.next = cycleEntryNode;
      break;
    }
    current = current.next;
    index++;
  }
  
  return list;
}

// 创建一个不带环的链表
function createLinkedListWithoutCycle() {
  const list = new LinkedList();
  list.append(1);
  list.append(2);
  list.append(3);
  list.append(4);
  list.append(5);
  return list;
}

// 测试快慢指针方法
console.log('===== 测试快慢指针方法 =====');

// 测试不带环的链表
const listWithoutCycle = createLinkedListWithoutCycle();
console.log('不带环的链表是否有环:', hasCycle(listWithoutCycle.head));

// 测试带环的链表
const listWithCycle = createLinkedListWithCycle();
console.log('带环的链表是否有环:', hasCycle(listWithCycle.head));

// 测试哈希表方法
console.log('\n===== 测试哈希表方法 =====');

// 重新创建不带环的链表（因为前面的链表可能已被修改）
const listWithoutCycle2 = createLinkedListWithoutCycle();
console.log('不带环的链表是否有环:', hasCycleUsingHashMap(listWithoutCycle2.head));

// 重新创建带环的链表
const listWithCycle2 = createLinkedListWithCycle();
console.log('带环的链表是否有环:', hasCycleUsingHashMap(listWithCycle2.head));

// 测试查找环的入口
console.log('\n===== 测试查找环的入口 =====');

// 重新创建不带环的链表
const listWithoutCycle3 = createLinkedListWithoutCycle();
const cycleEntry1 = detectCycle(listWithoutCycle3.head);
console.log('不带环的链表的环入口:', cycleEntry1 ? cycleEntry1.value : null);

// 重新创建带环的链表
const listWithCycle3 = createLinkedListWithCycle();
const cycleEntry2 = detectCycle(listWithCycle3.head);
console.log('带环的链表的环入口值:', cycleEntry2 ? cycleEntry2.value : null);

// 解释链表环检测的原理
console.log('\n===== 链表环检测原理 =====');
console.log('1. 快慢指针法（Floyd判圈算法）：');
console.log('   - 设置两个指针，快指针每次移动两步，慢指针每次移动一步');
console.log('   - 如果链表中存在环，两个指针最终会在环中相遇');
console.log('   - 如果链表中不存在环，快指针会先到达链表末尾');
console.log('   - 时间复杂度：O(n)，空间复杂度：O(1)');

console.log('\n2. 哈希表法：');
console.log('   - 遍历链表，将每个节点存入哈希表');
console.log('   - 如果当前节点已经在哈希表中，说明链表中存在环');
console.log('   - 如果遍历完链表都没有发现重复节点，说明链表中不存在环');
console.log('   - 时间复杂度：O(n)，空间复杂度：O(n)');

console.log('\n3. 查找环的入口：');
console.log('   - 首先使用快慢指针确定链表中是否存在环');
console.log('   - 如果存在环，将慢指针重置为头节点，快指针保持在相遇点');
console.log('   - 然后两个指针都以相同的速度移动，它们的相遇点就是环的入口');
console.log('   - 这是基于数学证明：从头节点到环入口的距离等于从相遇点沿环到环入口的距离');