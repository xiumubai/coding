/*
 * @Author: 朽木白
 * @Date: 2023-10-11 13:19:42
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2024-06-25 21:04:07
 * @Description: 观察者模式
 */

/**
 * 观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。
 * 观察者模式是由具体目标调度的，而发布-订阅模式是统一由调度中心调的，所以观察者模式的订阅者与发布者之间是存在依赖的，而发布-订阅模式则不会，这就实现了解耦
 */

// 定义发布者类
class Publisher {
  constructor() {
    this.observers = []
  }

  // 添加订阅者
  add(observer) {
    this.observers.push(observer)
  } 

  // 移除订阅者
  remove(observer) {
    this.observers.forEach((item, i ) => {
      if (item === observer) {
        this.observers.splice(i, 1)
      }
    })
  }

  // 通知所有订阅者
  notify() {
    this.observers.forEach(observer => {
      // 所有的订阅者收到发布者状态发生改变的信息，触发update方法
      observer.update(this)
    })
  }
}

// 定义订阅者类
class Observer {
  constructor() {}

  update() {
    console.log('update')
  }
}

// 定义一个具体的发布类(发布任务的人)
class PrdPublisher extends Publisher {
  constructor() {
    super()
    this.prdState = null
    this.observers = []
  }

  // 获取当前的prdState
  getState() {
    return this.prdState
  }

  // 改变当前的prdState
  setState(state) {
    this.prdState = state
    // 调用Publisher类的notify方法，通知所有订阅者，状态发生了改变
    this.notify()
  }
}

// 定义一个具体的订阅类（接收任务的人）
class DevObserver extends Observer {
  constructor() {
    super()
    this.prdState = {}
  }

  // 重新父类中具体的update方法
  update(publisher) {
    this.prdState = publisher.getState()
    this.work()
  }

  // 实施具体的工作
  work() {
    const prd = this.prdState
    // ...开始基于发布者给的信息进行具体的工作
    console.log('开始work', prd);
  }
}

// 目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。 

// 创建订阅者
const Evau = new DevObserver()
const Jhon = new DevObserver() 

// 创建发布者
const Mary = new PrdPublisher()

// 创建一个需求
const obj = {
  a: 'need a',
  b: 'neeb b'
}

// 添加订阅者
Mary.add(Evau)
Mary.add(Jhon)

// 发布者发布任务
Mary.setState(obj)

// Evau和Jhon分别执行了work

/**
 * 总体思路：
 * 第一步：定义两个基类： Publisher 和 Observer
 *  - Publisher: add() remove() notify()
 *  - Observer: upodate()-可以被重写
 * 第二步：基于以上两个基类定义两个实体类 PrdPublisher 和 DevObserver
 *  - PrdPublisher中定义setState()方法用于修改状态，触发notify()方法
 *  - DevObserver定义了具体的update和work方法，用来工作
 */
