/*
 * @Author: 朽木白
 * @Date: 2023-10-10 20:36:04
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-10 23:34:15
 * @Description: 发布订阅模式
 */


class EventBus {
  constructor() {
    this.task = {}
  }

  on(type, fn) {
    console.log(this.task[type]);
    if (!this.task[type]) this.task[type] = []
    this.task[type].push(fn)
  }

  emit(type, ...args) {
    if (this.task[type]) {
      this.task[type].forEach(fn => {
        fn.apply(this, args)
      })
    }
  }

  off(type, fn) {
    if (this.task[type]) {
      this.task[type] = this.task[type].filter(item => item != fn)
    }
  }

  once(type, fn) {
    function f(...args) {
      fn(...args)
      this.off(type, fn)
    }
    this.on(type, fn)
  }
}


const e = new EventBus()

e.on('change', (...args) => {
  console.log('handle on change', ...args);
})

e.on('change2', (...args) => {
  console.log('handle on change2', ...args);
})

e.once('change', (...args) => {
  console.log('handle once change', ...args);
})

e.emit('change', 1, 2)

e.emit('change', 1, 2)

e.emit('change', 1, 2)

e.emit('change2', 1, 2, 3)

e.off('change2')

e.emit('change2', 1, 2, 3)
