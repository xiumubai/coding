// 判断是否为对象 ，注意 null 也是对象
const isObject = val => val !== null && typeof val === 'object'
// 判断key是否存在
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

export function reactive(target) {
  if (!isObject(target)) return target

  const handler ={
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      if (isObject(result)) {
        return reactive(result)
      }
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
      }
      return result
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        // 更新操作 等下再补
      }
      return result
    }
  }

  return new Proxy(target, handler)
}

// activeEffect 表示当前正在走的 effect

let activeEffect = null
export function effect(callback) {
  activeEffect = callback
  callback()
  activeEffect = null
}

// targetMap 表里每个key都是一个普通对象 对应他们的 depsMap
let targetMap = new WeakMap()
export function track(target, key) {
  if(!activeEffect) return
  let depsMap = targetMap.get(target)
  if(!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  if (!dep.has(actieEffect)) {
      dep.add(actieEffect)
  }
}

// trigger 响应式触发
export function trigger(target, key) {
  // 拿到 依赖图
  const depsMap = targetMap.get(target)
  if (!depsMap) {
      // 没有被追踪，直接 return
      return
  }
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
        effect()
    })
  }
}

// 判断是否是一个对象，是就用 reactive 来代理
const convert = val => (isObject(val) ? reactive(val) : val)

class RefImpl {
  constructor(_rawValue) {
    this._rawValue = _rawValue
    this.__v_isRef = true
    this._value = convert(_rawValue)
  }
  get value() {
    // 追踪依赖
    track(this, 'value')
    // 当然 get 得返回 this._value
    return this._value
  }

  set value(newValue) {
    // 判断旧值和新值是否一直
    if (newValue !== this._value) {
        this._rawValue = newValue
        // 设置新值的时候也得使用 convert 处理一下，判断新值是否是对象
        this._value = convert(this._rawValue)
        // 触发依赖
        trigger(this, 'value')
    }
  }
}

export function ref(rawValue) {
  // __v_isRef 用来标识是否是 一个 ref 如果是直接返回，不用再转
  if (isObject(rawValue) && rawValue.__v_isRef) return

  return new RefImpl(rawValue)
}

class ObjectRefImpl {
  constructor(proxy, _key) {
      this._proxy = proxy
      this._key = _key
      // __v_isRef 用来标识是否是 一个 ref
      this.__v_isRef = true
  }
  get value() {
      // 这里不用收集依赖
      // this._proxy 就是响应式对象，当访问[this._key]时，this._proxy里面会去自动收集依赖
      return this._proxy[this._key]
  }
  set value(newVal) {
      // 这里不用收集依赖
      // this._proxy 响应式对象，会在this._proxy里面set去调用trigger
      this._proxy[this._key] = newVal
  }
}

// 暴露出去的方法
export function toRef(proxy, key) {
  return new ObjectRefImpl(proxy, key)
}

export function toRefs(proxy) {
  // 判断 当前 proxy 是 proxy 数组， 还是 proxy 对象
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}

  for (const key in proxy) {
      // 内部还是调用 toRef 进行转为 响应式
      ret[key] = toRef(proxy, key)
  }

  return ret
}