// 非递归 + 循环 + 栈

// 优化思路
// 非递归实现：用 栈 + 循环 替代递归，避免递归深度过大导致栈溢出。
// 循环引用处理：使用 WeakMap 记录已克隆的对象，防止循环引用导致死循环。
// 类型兼容：支持数组、普通对象、原始值，兼容常见场景。
// 性能优化：遍历过程中只处理自身可枚举属性，避免遍历原型链。
// 复杂度分析
// 时间复杂度：O(N)，其中 N 是对象中所有节点（键值对 / 数组元素）的总数，每个节点仅访问一次。
// 空间复杂度：O(N)，需要额外的栈和 WeakMap 存储中间状态和已克隆对象。
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const stack = [];
  const map = new WeakMap(); // 解决循环引用

  const root = Array.isArray(obj) ? [] : {};
  stack.push({
    parent: root,
    key: undefined,
    data: obj,
  });
  map.set(obj, root);

  while (stack.length) {
    const { parent, key, data } = stack.pop();

    let target = parent;
    if (key !== undefined) {
      target = Array.isArray(parent) ? parent : (parent[key] = Array.isArray(data) ? [] : {});
    }

    for (const k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        const value = data[k];
        if (typeof value === 'object' && value !== null) {
          if (map.has(value)) {
            target[k] = map.get(value);
          } else {
            const clone = Array.isArray(value) ? [] : {};
            map.set(value, clone);
            stack.push({
              parent: target,
              key: k,
              data: value,
            });
          }
        } else {
          target[k] = value;
        }
      }
    }
  }

  return root;
}

const obj = {
  a: 1,
  b: { c: 2 },
  arr: [3, 4],
};

obj.self = obj; // 循环引用

const cloned = deepClone(obj);
console.log(cloned === obj); // false
console.log(cloned.b === obj.b); // false
console.log(cloned.self === cloned); // true（循环引用保留）
console.log(cloned.arr === obj.arr); // false
