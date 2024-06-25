/**
 * 实现基础的循环拷贝
 * 如果是原始类型，无需继续拷贝，直接返回
 * 如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上
 * 考虑数组
 * 循环引用
 * 性能优化-把 for in 循环换成while循环
 */

// for in 性能很差，不如while，用while来优化一下

function myfor(array, iterate) {
  let index = -1
  const len = array.length
  while(++index < len) {
    iterate(array[index], index)
  }
  return array
}

function clone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (let prop in target) {
      cloneTarget[prop] = clone(target[prop], map)
    }
    return cloneTarget
  } else {
    return target
  }
}

function clone2(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target)
    let cloneTarget = isArray ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    const keys = isArray ? undefined : Object.keys(target)
    myfor(keys || target, (value, key) => {
      if (keys) {
        key = value
      }
      cloneTarget[key] = clone(target[key], map)
    })
    return cloneTarget
  } else {
    return target
  }
}

// =======测试用例=========
const target = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8],
  f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};

target.target = target; // 循环引用,如果没有处理，会导致clone递归进入死循环导致栈内存溢出

console.time();
const result = clone(target);
console.timeEnd();

console.time();
const result2 = clone2(target);
console.timeEnd();