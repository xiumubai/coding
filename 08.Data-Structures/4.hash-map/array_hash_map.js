/* 键值对 Number -> String */
class Pair {
  constructor(key, val) {
      this.key = key;
      this.val = val;
  }
}

/* 基于数组简易实现的哈希表 */
class ArrayHashMap {
  #buckets;
  constructor() {
      // 初始化数组，包含 100 个桶
      this.#buckets = new Array(100).fill(null);
  }

  /* 哈希函数 */
  #hashFunc(key) {
      return key % 100;
  }

  /* 查询操作 */
  get(key) {
      let index = this.#hashFunc(key);
      let pair = this.#buckets[index];
      if (pair === null) return null;
      return pair.val;
  }

  /* 添加操作 */
  set(key, val) {
      let index = this.#hashFunc(key);
      this.#buckets[index] = new Pair(key, val);
  }

  /* 删除操作 */
  delete(key) {
      let index = this.#hashFunc(key);
      // 置为 null ，代表删除
      this.#buckets[index] = null;
  }

  /* 获取所有键值对 */
  entries() {
      let arr = [];
      for (let i = 0; i < this.#buckets.length; i++) {
          if (this.#buckets[i]) {
              arr.push(this.#buckets[i]);
          }
      }
      return arr;
  }

  /* 获取所有键 */
  keys() {
      let arr = [];
      for (let i = 0; i < this.#buckets.length; i++) {
          if (this.#buckets[i]) {
              arr.push(this.#buckets[i].key);
          }
      }
      return arr;
  }

  /* 获取所有值 */
  values() {
      let arr = [];
      for (let i = 0; i < this.#buckets.length; i++) {
          if (this.#buckets[i]) {
              arr.push(this.#buckets[i].val);
          }
      }
      return arr;
  }

  /* 打印哈希表 */
  print() {
      let pairSet = this.entries();
      for (const pair of pairSet) {
          console.info(`${pair.key} -> ${pair.val}`);
      }
  }
}
