/*
 * @Author: 朽木白
 * @Date: 2023-10-12 15:32:49
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-12 18:05:11
 * @Description: 链表结构
 */

/**
 * 链表的时间复杂度如下：
  访问：O(n)
  搜索：O(n)
  插入：O(1)
  删除：O(1)
  链表的空间复杂度为O(n)，其中n是链表中的节点数。
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

module.exports = class LinkedList {
  constructor() {
    // 链表头节点
    this.head = null
    // 链表尾节点
    this.tail = null
    this.length = 0
  }

  // 在链表尾部插入节点
  append(value) {
    const newNode = new Node(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }

    this.length++;
    
  }

  // 在指定位置插入新的节点
  insertAt(value, index) {
    if (index < 0 || index > this.length) {
      throw new Error("Index out of range");
    }

    const newNode = new Node(value)
    if (index === 0) {
      // 插入头部
      newNode.next = this.head
      this.head = newNode
      if (!this.tail) {
        this.tail = newNode
      } 
    } else if (index === this.length) {
      // 插入尾部
      this.tail.next = newNode
      this.tail = newNode
    } else {
      // 插入其他位置
      // 找到上一个节点和当前插入位置的节点，然后把上一个节点的next指向插入节点，把插入节点的next指向剩余的节点
      let currentNode = this.head
      let prevNode = null
      let currentIndex = 0

      while(currentIndex < index) {
        prevNode = currentNode
        currentNode = currentNode.next
        currentIndex++
      }
      // 通过循环找到对应插入的节点位置的上一个节点和当前节点，往这个中间位置插入
      prevNode.next = newNode
      newNode.next = currentNode
    }
    this.length++;
  }

  // 删除指定位置的节点
  removeAt(index) {
    if (index < 0 || index > this.length) {
      throw new Error("Index out of range");
    }

    let currentNode = this.head
    let prevNode = null
    let currentIndex = 0

    if (index === 0) {
      // 删除第一个节点
      this.head = currentNode.next
      if (this.length === 1) {
        // 如果本来只有一个节点，删除以后没有节点了
        this.tail = null
      }
    } else if (index === this.length - 1) {
      // 删除最后一个节点
      while(currentIndex < index) {
        prevNode = currentNode
        currentNode = currentNode.next
        currentIndex ++
      }
      prevNode.next = null
      this.tail = prevNode
    } else {
      while(currentIndex < index) {
        prevNode = currentNode
        currentNode = currentNode.next
        currentIndex++
      }
      prevNode.next = currentNode.next
    }
    this.length --
  }

  // 获取指定位置节点的值
  getAt(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of range");
    }

    let currentNode = this.head
    let currentIndex = 0

    while(currentIndex < index) {
      currentNode = currentNode.next
      currentIndex ++
    }
    return currentNode.value
  }

  // 遍历整个节点以数组的形式返回
  toArray() {
    const result = []
    let currentNode = this.head
    while(currentNode) {
      result.push(currentNode.value)
      currentNode = currentNode.next
    }
    return result
  }

  // 反转链表
  reverse() {
    if (!this.head || !this.head.next) {
      // 空链表或只有一个节点的链表，无需反转
      return this;
    }

    let prev = null;
    let current = this.head;
    let next = null;
    
    // 保存原来的尾节点，反转后会变成头节点
    this.tail = this.head;
    
    // 遍历链表，反转每个节点的指针
    while (current) {
      // 保存下一个节点
      next = current.next;
      
      // 反转当前节点的指针
      current.next = prev;
      
      // 移动指针
      prev = current;
      current = next;
    }
    
    // 更新头节点为原链表的最后一个节点
    this.head = prev;
    
    return this;
  }
}
