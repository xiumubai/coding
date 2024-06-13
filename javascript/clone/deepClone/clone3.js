/**
 * 实现基础的循环拷贝
 * 如果是原始类型，无需继续拷贝，直接返回
 * 如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上
 * 考虑数组
 * 循环引用
 */

/**
 * 解决循环依赖的问题：
 * 额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
 * 当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，
 * 如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
 * 存储key-value形式的数据，且key可以是一个引用类型，
 * 我们可以选择Map这种数据结构：
 * 检查map中有无克隆过的对象
 * 有 - 直接返回
 * 没有 - 将当前对象作为key，克隆对象作为value进行存储
 * 继续克隆
 */

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

// =======测试用例=========
const target = {
  field1: 1,
  field2: undefined,
  field3: 'ConardLi',
  field4: {
      child: 'child',
      child2: {
          child2: 'child2'
      }
  },
  field5: [1, 2, 3]
};
target.target = target; // 循环引用,如果没有处理，会导致clone递归进入死循环导致栈内存溢出
const result = clone(target)
result.field5[3] = 4 // 修改result对象上的属性不会影响target上的属性
console.log('target', target)
console.log('cloneResult', result) // 打印结果中会显现一个Circular *1，即循环应用的意思
