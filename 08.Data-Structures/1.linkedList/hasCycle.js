/*
 * @Author: Trae Builder
 * @Description: 链表环检测算法
 */

// 链表节点类定义
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// 导入链表类
const LinkedList = require('./linkedList');

/**
 * 使用快慢指针（Floyd's Cycle-Finding Algorithm）检测链表是否有环
 * 时间复杂度: O(n)
 * 空间复杂度: O(1)
 * @param {Node} head 链表的头节点
 * @return {boolean} 如果链表中存在环，则返回 true；否则，返回 false
 */
function hasCycle(head) {
  if (!head || !head.next) {
    return false; // 空链表或只有一个节点的链表不可能有环
  }
  
  // 初始化快慢指针
  let slow = head;
  let fast = head;
  
  // 快指针每次移动两步，慢指针每次移动一步
  // 如果链表中存在环，快指针最终会追上慢指针
  while (fast && fast.next) {
    slow = slow.next;       // 慢指针移动一步
    fast = fast.next.next;  // 快指针移动两步
    
    // 如果快慢指针相遇，说明链表中存在环
    if (slow === fast) {
      return true;
    }
  }
  
  // 如果快指针到达链表末尾，说明链表中不存在环
  return false;
}

/**
 * 使用哈希表检测链表是否有环
 * 时间复杂度: O(n)
 * 空间复杂度: O(n)
 * @param {Node} head 链表的头节点
 * @return {boolean} 如果链表中存在环，则返回 true；否则，返回 false
 */
function hasCycleUsingHashMap(head) {
  if (!head || !head.next) {
    return false; // 空链表或只有一个节点的链表不可能有环
  }
  
  // 使用 Set 存储已经访问过的节点
  const visited = new Set();
  let current = head;
  
  while (current) {
    // 如果当前节点已经在集合中，说明链表中存在环
    if (visited.has(current)) {
      return true;
    }
    
    // 将当前节点添加到集合中
    visited.add(current);
    
    // 移动到下一个节点
    current = current.next;
  }
  
  // 如果遍历完链表都没有发现重复节点，说明链表中不存在环
  return false;
}

/**
 * 查找环的入口节点
 * 时间复杂度: O(n)
 * 空间复杂度: O(1)
 * @param {Node} head 链表的头节点
 * @return {Node|null} 如果链表中存在环，则返回环的入口节点；否则，返回 null
 */
function detectCycle(head) {
  if (!head || !head.next) {
    return null; // 空链表或只有一个节点的链表不可能有环
  }
  
  // 初始化快慢指针
  let slow = head;
  let fast = head;
  let hasCycle = false;
  
  // 第一阶段：检测是否有环
  while (fast && fast.next) {
    slow = slow.next;       // 慢指针移动一步
    fast = fast.next.next;  // 快指针移动两步
    
    // 如果快慢指针相遇，说明链表中存在环
    if (slow === fast) {
      hasCycle = true;
      break;
    }
  }
  
  // 如果没有环，返回 null
  if (!hasCycle) {
    return null;
  }
  
  // 第二阶段：找到环的入口
  // 将慢指针重置为头节点，快指针保持在相遇点
  // 然后两个指针都以相同的速度移动，它们的相遇点就是环的入口
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  
  return slow; // 返回环的入口节点
}

// 导出函数
module.exports = {
  hasCycle,
  hasCycleUsingHashMap,
  detectCycle
};