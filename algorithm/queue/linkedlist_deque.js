/* 双向链表节点 */
class ListNode {
  prev; // 前驱节点引用 (指针)
  next; // 后继节点引用 (指针)
  val; // 节点值

  constructor(val) {
      this.val = val;
      this.next = null;
      this.prev = null;
  }
}

/* 基于双向链表实现的双向队列 */
class LinkedListDeque {
  #front; // 头节点 front
  #rear; // 尾节点 rear
  #queSize; // 双向队列的长度

  constructor() {
      this.#front = null;
      this.#rear = null;
      this.#queSize = 0;
  }

  /* 队尾入队操作 */
  pushLast(val) {
      const node = new ListNode(val);
      // 若链表为空，则令 front, rear 都指向 node
      if (this.#queSize === 0) {
          this.#front = node;
          this.#rear = node;
      } else {
          // 将 node 添加至链表尾部
          this.#rear.next = node;
          node.prev = this.#rear;
          this.#rear = node; // 更新尾节点
      }
      this.#queSize++;
  }

  /* 队首入队操作 */
  pushFirst(val) {
      const node = new ListNode(val);
      // 若链表为空，则令 front, rear 都指向 node
      if (this.#queSize === 0) {
          this.#front = node;
          this.#rear = node;
      } else {
          // 将 node 添加至链表头部
          this.#front.prev = node;
          node.next = this.#front;
          this.#front = node; // 更新头节点
      }
      this.#queSize++;
  }

  /* 队尾出队操作 */
  popLast() {
      if (this.#queSize === 0) {
          return null;
      }
      const value = this.#rear.val; // 存储尾节点值
      // 删除尾节点
      let temp = this.#rear.prev;
      if (temp !== null) {
          temp.next = null;
          this.#rear.prev = null;
      }
      this.#rear = temp; // 更新尾节点
      this.#queSize--;
      return value;
  }

  /* 队首出队操作 */
  popFirst() {
      if (this.#queSize === 0) {
          return null;
      }
      const value = this.#front.val; // 存储尾节点值
      // 删除头节点
      let temp = this.#front.next;
      if (temp !== null) {
          temp.prev = null;
          this.#front.next = null;
      }
      this.#front = temp; // 更新头节点
      this.#queSize--;
      return value;
  }

  /* 访问队尾元素 */
  peekLast() {
      return this.#queSize === 0 ? null : this.#rear.val;
  }

  /* 访问队首元素 */
  peekFirst() {
      return this.#queSize === 0 ? null : this.#front.val;
  }

  /* 获取双向队列的长度 */
  size() {
      return this.#queSize;
  }

  /* 判断双向队列是否为空 */
  isEmpty() {
      return this.#queSize === 0;
  }

  /* 打印双向队列 */
  print() {
      const arr = [];
      let temp = this.#front;
      while (temp !== null) {
          arr.push(temp.val);
          temp = temp.next;
      }
      console.log('[' + arr.join(', ') + ']');
  }
}
