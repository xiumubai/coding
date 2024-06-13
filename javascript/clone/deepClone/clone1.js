/**
 * 实现基础的循环拷贝
 * 如果是原始类型，无需继续拷贝，直接返回
 * 如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上
 */

function clone(target) {
  if (typeof target === 'object') {
    let cloneTarget = {}
    for (let prop in target) {
      cloneTarget[prop] = clone(target[prop])
    }
    return cloneTarget
  } else {
    return target
  }
}

const target = {
  field1: 1,
  field2: undefined,
  field3: 'ConardLi',
  field4: {
      child: 'child',
      child2: {
          child2: 'child2'
      }
  }
};

const result = clone(target)
result.field4.child = 'child3' // 修改result对象上的属性不会影响target上的属性
console.log(target)
console.log(result)

