# React底层原理面试题大全

## 目录
- [初级题目](#初级题目)
- [中级题目](#中级题目)
- [高级题目](#高级题目)
- [React 18新特性](#react-18新特性)

---

## 初级题目

### 1. 什么是虚拟DOM？它的优势是什么？

**答案解析：**
虚拟DOM（Virtual DOM）是React中的一个核心概念，它是真实DOM的JavaScript表示。

**优势：**
- **性能优化**：通过diff算法减少真实DOM操作
- **批量更新**：将多次DOM操作合并为一次
- **跨浏览器兼容**：抽象了浏览器差异
- **可预测性**：函数式编程思想，状态变化可预测

**实现原理：**
```javascript
// 虚拟DOM节点结构
const vnode = {
  type: 'div',
  props: {
    className: 'container',
    children: [
      {
        type: 'span',
        props: {
          children: 'Hello World'
        }
      }
    ]
  }
}
```

### 2. React的diff算法是如何工作的？

**答案解析：**
React的diff算法基于三个假设来优化性能：

1. **同级比较**：只比较同一层级的节点
2. **类型判断**：不同类型的元素会产生不同的树
3. **key属性**：通过key来识别哪些子元素在不同渲染下保持稳定

**算法流程：**
```javascript
function diff(oldVNode, newVNode) {
  // 1. 类型不同，直接替换
  if (oldVNode.type !== newVNode.type) {
    return { type: 'REPLACE', newVNode }
  }
  
  // 2. 文本节点比较
  if (typeof newVNode === 'string') {
    if (oldVNode !== newVNode) {
      return { type: 'TEXT', newVNode }
    }
    return null
  }
  
  // 3. 属性比较
  const propsPatches = diffProps(oldVNode.props, newVNode.props)
  
  // 4. 子节点比较
  const childrenPatches = diffChildren(oldVNode.children, newVNode.children)
  
  return { type: 'UPDATE', propsPatches, childrenPatches }
}
```

### 3. 什么是React组件的生命周期？请列举主要的生命周期方法。

**答案解析：**
React组件生命周期分为三个阶段：

**挂载阶段（Mounting）：**
- `constructor()` - 构造函数
- `componentDidMount()` - 组件挂载后

**更新阶段（Updating）：**
- `componentDidUpdate()` - 组件更新后
- `getSnapshotBeforeUpdate()` - 更新前获取快照

**卸载阶段（Unmounting）：**
- `componentWillUnmount()` - 组件卸载前

**错误处理：**
- `componentDidCatch()` - 捕获错误
- `static getDerivedStateFromError()` - 从错误中派生状态

### 4. 解释React中的受控组件和非受控组件。

**答案解析：**

**受控组件：**
表单元素的值由React的state控制
```javascript
function ControlledInput() {
  const [value, setValue] = useState('')
  
  return (
    <input 
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

**非受控组件：**
表单元素的值由DOM自身管理
```javascript
function UncontrolledInput() {
  const inputRef = useRef()
  
  const handleSubmit = () => {
    console.log(inputRef.current.value)
  }
  
  return <input ref={inputRef} />
}
```

### 5. 什么是React中的key属性？为什么它很重要？

**答案解析：**
key是React用来识别哪些列表项发生变化、被添加或删除的特殊属性。

**重要性：**
- 帮助React识别元素的身份
- 优化diff算法性能
- 避免不必要的重新渲染
- 保持组件状态的正确性

**错误示例：**
```javascript
// 使用index作为key（不推荐）
{items.map((item, index) => 
  <Item key={index} data={item} />
)}
```

**正确示例：**
```javascript
// 使用唯一标识作为key
{items.map(item => 
  <Item key={item.id} data={item} />
)}
```

---

## 中级题目

### 6. 详细解释React Fiber架构的原理和优势。

**答案解析：**
Fiber是React 16引入的新的协调引擎，重写了React的核心算法。

**Fiber的核心概念：**
- **可中断的渲染**：将渲染工作分解为小的工作单元
- **优先级调度**：不同更新有不同的优先级
- **时间切片**：在浏览器空闲时间执行工作

**Fiber节点结构：**
```javascript
const fiber = {
  // 节点类型
  tag: WorkTag,
  // 节点key
  key: null | string,
  // 元素类型
  elementType: any,
  // 节点类型
  type: any,
  // 对应的DOM节点
  stateNode: any,
  
  // 指向父节点
  return: Fiber | null,
  // 指向第一个子节点
  child: Fiber | null,
  // 指向下一个兄弟节点
  sibling: Fiber | null,
  
  // 新的props
  pendingProps: any,
  // 上一次渲染的props
  memoizedProps: any,
  
  // 更新队列
  updateQueue: UpdateQueue<any> | null,
  // 状态
  memoizedState: any,
  
  // 副作用标记
  flags: Flags,
  // 子树副作用标记
  subtreeFlags: Flags,
  
  // 调度优先级
  lanes: Lanes,
  childLanes: Lanes
}
```

**工作循环：**
```javascript
function workLoopConcurrent() {
  // 在有剩余时间且有工作要做时继续工作
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress)
  }
}

function performUnitOfWork(unitOfWork) {
  // 开始工作
  const next = beginWork(unitOfWork)
  
  if (next === null) {
    // 完成工作
    completeUnitOfWork(unitOfWork)
  } else {
    workInProgress = next
  }
}
```

### 7. React Hooks的实现原理是什么？

**答案解析：**
Hooks基于链表结构实现，每个Hook都是链表中的一个节点。

**Hook数据结构：**
```javascript
const hook = {
  // 当前状态值
  memoizedState: any,
  // 基础状态
  baseState: any,
  // 基础更新队列
  baseQueue: Update<any, any> | null,
  // 更新队列
  queue: UpdateQueue<any, any> | null,
  // 指向下一个Hook
  next: Hook | null
}
```

**useState实现原理：**
```javascript
function useState(initialState) {
  const hook = mountWorkInProgressHook()
  
  if (typeof initialState === 'function') {
    initialState = initialState()
  }
  
  hook.memoizedState = hook.baseState = initialState
  
  const queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState
  }
  
  hook.queue = queue
  
  const dispatch = queue.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  )
  
  return [hook.memoizedState, dispatch]
}
```

**useEffect实现原理：**
```javascript
function useEffect(create, deps) {
  const hook = mountWorkInProgressHook()
  const nextDeps = deps === undefined ? null : deps
  
  hook.memoizedState = pushEffect(
    HookHasEffect | HookPassive,
    create,
    undefined,
    nextDeps
  )
}

function pushEffect(tag, create, destroy, deps) {
  const effect = {
    tag,
    create,
    destroy,
    deps,
    next: null
  }
  
  let componentUpdateQueue = currentlyRenderingFiber.updateQueue
  
  if (componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue()
    currentlyRenderingFiber.updateQueue = componentUpdateQueue
    componentUpdateQueue.lastEffect = effect.next = effect
  } else {
    const lastEffect = componentUpdateQueue.lastEffect
    if (lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect
    } else {
      const firstEffect = lastEffect.next
      lastEffect.next = effect
      effect.next = firstEffect
      componentUpdateQueue.lastEffect = effect
    }
  }
  
  return effect
}
```

### 8. React的事件系统是如何工作的？

**答案解析：**
React实现了自己的事件系统，称为合成事件（SyntheticEvent）。

**特点：**
- **事件委托**：所有事件都委托到document上
- **事件池**：复用事件对象以提高性能
- **跨浏览器兼容**：统一不同浏览器的事件行为
- **阻止默认行为**：通过preventDefault()方法

**事件注册流程：**
```javascript
// 1. 事件注册
function listenToAllSupportedEvents(rootContainerElement) {
  allNativeEvents.forEach(domEventName => {
    listenToNativeEvent(
      domEventName,
      false,
      rootContainerElement
    )
  })
}

// 2. 事件监听
function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
  let eventSystemFlags = 0
  if (isCapturePhaseListener) {
    eventSystemFlags |= IS_CAPTURE_PHASE
  }
  
  addTrappedEventListener(
    target,
    domEventName,
    eventSystemFlags,
    isCapturePhaseListener
  )
}

// 3. 事件分发
function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  const blockedOn = findInstanceBlockingEvent(
    domEventName,
    eventSystemFlags,
    targetContainer,
    nativeEvent
  )
  
  if (blockedOn === null) {
    dispatchEventForPluginEventSystem(
      domEventName,
      eventSystemFlags,
      nativeEvent,
      return_targetInst,
      targetContainer
    )
  }
}
```

### 9. 解释React中的Context API及其实现原理。

**答案解析：**
Context提供了一种在组件树中传递数据的方法，无需手动逐层传递props。

**基本用法：**
```javascript
// 创建Context
const ThemeContext = React.createContext('light')

// Provider组件
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  )
}

// 消费Context
function ThemedButton() {
  const theme = useContext(ThemeContext)
  return <button className={theme}>Button</button>
}
```

**实现原理：**
```javascript
function createContext(defaultValue) {
  const context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  }
  
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  }
  
  context.Consumer = context
  
  return context
}

// useContext实现
function useContext(context) {
  const dispatcher = resolveDispatcher()
  return dispatcher.useContext(context)
}

function readContext(context) {
  const value = isPrimaryRenderer
    ? context._currentValue
    : context._currentValue2
    
  return value
}
```

### 10. React的调度器（Scheduler）是如何工作的？

**答案解析：**
React Scheduler负责任务的优先级调度和时间切片。

**优先级等级：**
```javascript
const ImmediatePriority = 1
const UserBlockingPriority = 2
const NormalPriority = 3
const LowPriority = 4
const IdlePriority = 5
```

**调度流程：**
```javascript
function scheduleCallback(priorityLevel, callback, options) {
  const currentTime = getCurrentTime()
  
  let startTime
  if (typeof options === 'object' && options !== null) {
    const delay = options.delay
    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay
    } else {
      startTime = currentTime
    }
  } else {
    startTime = currentTime
  }
  
  let timeout
  switch (priorityLevel) {
    case ImmediatePriority:
      timeout = IMMEDIATE_PRIORITY_TIMEOUT
      break
    case UserBlockingPriority:
      timeout = USER_BLOCKING_PRIORITY_TIMEOUT
      break
    case IdlePriority:
      timeout = IDLE_PRIORITY_TIMEOUT
      break
    case LowPriority:
      timeout = LOW_PRIORITY_TIMEOUT
      break
    case NormalPriority:
    default:
      timeout = NORMAL_PRIORITY_TIMEOUT
      break
  }
  
  const expirationTime = startTime + timeout
  
  const newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
    sortIndex: -1
  }
  
  if (startTime > currentTime) {
    // 延迟任务
    newTask.sortIndex = startTime
    push(timerQueue, newTask)
    
    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      if (isHostTimeoutScheduled) {
        cancelHostTimeout()
      } else {
        isHostTimeoutScheduled = true
      }
      requestHostTimeout(handleTimeout, startTime - currentTime)
    }
  } else {
    // 立即执行任务
    newTask.sortIndex = expirationTime
    push(taskQueue, newTask)
    
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true
      requestHostCallback(flushWork)
    }
  }
  
  return newTask
}
```

---

## 高级题目

### 11. 请实现一个简化版的React.createElement函数。

**答案解析：**
```javascript
function createElement(type, config, ...children) {
  let propName
  const props = {}
  
  let key = null
  let ref = null
  
  if (config != null) {
    // 提取ref
    if (hasValidRef(config)) {
      ref = config.ref
    }
    
    // 提取key
    if (hasValidKey(config)) {
      key = '' + config.key
    }
    
    // 复制其他属性到props
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName]
      }
    }
  }
  
  // 处理children
  const childrenLength = children.length
  if (childrenLength === 1) {
    props.children = children[0]
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength)
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = children[i]
    }
    props.children = childArray
  }
  
  // 处理defaultProps
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName]
      }
    }
  }
  
  return ReactElement(
    type,
    key,
    ref,
    undefined,
    undefined,
    ReactCurrentOwner.current,
    props
  )
}

function ReactElement(type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  }
  
  return element
}
```

### 12. 实现一个自定义Hook：useDebounce。

**答案解析：**
```javascript
import { useState, useEffect } from 'react'

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  
  return debouncedValue
}

// 使用示例
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      // 执行搜索
      console.log('Searching for:', debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])
  
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

### 13. 解释React中的错误边界（Error Boundaries）及其实现。

**答案解析：**
错误边界是React组件，可以捕获并打印发生在其子组件树任何位置的JavaScript错误。

**实现错误边界：**
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }
  
  static getDerivedStateFromError(error) {
    // 更新state使下一次渲染能够显示降级后的UI
    return { hasError: true }
  }
  
  componentDidCatch(error, errorInfo) {
    // 可以将错误日志上报给服务器
    console.error('Error caught by boundary:', error, errorInfo)
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }
  
  render() {
    if (this.state.hasError) {
      // 自定义降级后的UI
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }
    
    return this.props.children
  }
}

// 使用Hook实现错误边界
function useErrorHandler() {
  const [error, setError] = useState(null)
  
  const resetError = () => setError(null)
  
  const captureError = (error) => {
    setError(error)
  }
  
  useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])
  
  return { captureError, resetError }
}
```

### 14. 实现一个高阶组件（HOC）用于性能监控。

**答案解析：**
```javascript
import React, { Component } from 'react'

function withPerformanceMonitor(WrappedComponent, componentName) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.renderStartTime = 0
      this.mountStartTime = 0
    }
    
    componentDidMount() {
      const mountEndTime = performance.now()
      const mountDuration = mountEndTime - this.mountStartTime
      
      console.log(`${componentName} mount time: ${mountDuration}ms`)
      
      // 上报性能数据
      this.reportPerformance('mount', mountDuration)
    }
    
    componentDidUpdate(prevProps, prevState) {
      const updateEndTime = performance.now()
      const updateDuration = updateEndTime - this.renderStartTime
      
      console.log(`${componentName} update time: ${updateDuration}ms`)
      
      // 上报性能数据
      this.reportPerformance('update', updateDuration)
    }
    
    reportPerformance(type, duration) {
      // 发送性能数据到监控服务
      if (window.performance && window.performance.mark) {
        window.performance.mark(`${componentName}-${type}-${duration}`)
      }
      
      // 可以集成第三方监控服务
      if (window.gtag) {
        window.gtag('event', 'performance', {
          event_category: 'React Component',
          event_label: componentName,
          value: Math.round(duration)
        })
      }
    }
    
    render() {
      this.renderStartTime = performance.now()
      if (!this.mountStartTime) {
        this.mountStartTime = this.renderStartTime
      }
      
      return <WrappedComponent {...this.props} />
    }
  }
}

// 使用示例
const MonitoredComponent = withPerformanceMonitor(MyComponent, 'MyComponent')

// 使用Hook实现性能监控
function usePerformanceMonitor(componentName) {
  const renderStartTime = useRef(0)
  const mountStartTime = useRef(0)
  
  useLayoutEffect(() => {
    renderStartTime.current = performance.now()
    if (!mountStartTime.current) {
      mountStartTime.current = renderStartTime.current
    }
  })
  
  useEffect(() => {
    const endTime = performance.now()
    const duration = endTime - renderStartTime.current
    
    console.log(`${componentName} render time: ${duration}ms`)
  })
  
  useEffect(() => {
    return () => {
      const unmountTime = performance.now()
      const totalTime = unmountTime - mountStartTime.current
      console.log(`${componentName} total lifetime: ${totalTime}ms`)
    }
  }, [])
}
```

### 15. 解释React的协调（Reconciliation）过程。

**答案解析：**
协调是React用来比较两棵元素树并确定哪些部分需要更新的算法。

**协调过程：**
```javascript
function reconcileChildren(
  current,
  workInProgress,
  nextChildren,
  renderLanes
) {
  if (current === null) {
    // 首次渲染
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes
    )
  } else {
    // 更新渲染
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes
    )
  }
}

function reconcileChildFibers(
  returnFiber,
  currentFirstChild,
  newChild,
  lanes
) {
  // 处理不同类型的子节点
  if (typeof newChild === 'object' && newChild !== null) {
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
        return placeSingleChild(
          reconcileSingleElement(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          )
        )
      case REACT_PORTAL_TYPE:
        return placeSingleChild(
          reconcileSinglePortal(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          )
        )
    }
    
    if (isArray(newChild)) {
      return reconcileChildrenArray(
        returnFiber,
        currentFirstChild,
        newChild,
        lanes
      )
    }
  }
  
  if (typeof newChild === 'string' || typeof newChild === 'number') {
    return placeSingleChild(
      reconcileSingleTextNode(
        returnFiber,
        currentFirstChild,
        '' + newChild,
        lanes
      )
    )
  }
  
  // 删除剩余的子节点
  return deleteRemainingChildren(returnFiber, currentFirstChild)
}

// 单个元素协调
function reconcileSingleElement(
  returnFiber,
  currentFirstChild,
  element,
  lanes
) {
  const key = element.key
  let child = currentFirstChild
  
  while (child !== null) {
    if (child.key === key) {
      if (child.elementType === element.type) {
        // 可以复用
        deleteRemainingChildren(returnFiber, child.sibling)
        const existing = useFiber(child, element.props)
        existing.ref = coerceRef(returnFiber, child, element)
        existing.return = returnFiber
        return existing
      } else {
        // key相同但类型不同，删除所有子节点
        deleteRemainingChildren(returnFiber, child)
        break
      }
    } else {
      // key不同，删除当前子节点
      deleteChild(returnFiber, child)
    }
    child = child.sibling
  }
  
  // 创建新的Fiber节点
  const created = createFiberFromElement(element, returnFiber.mode, lanes)
  created.ref = coerceRef(returnFiber, currentFirstChild, element)
  created.return = returnFiber
  return created
}
```

---

## React 18新特性

### 16. 解释React 18中的并发特性（Concurrent Features）。

**答案解析：**
React 18引入了并发特性，允许React在渲染过程中暂停、恢复或放弃工作。

**主要特性：**

**1. 自动批处理（Automatic Batching）：**
```javascript
// React 18之前
setTimeout(() => {
  setCount(c => c + 1) // 触发重新渲染
  setFlag(f => !f)     // 触发重新渲染
}, 1000)

// React 18
setTimeout(() => {
  setCount(c => c + 1) // 不会立即重新渲染
  setFlag(f => !f)     // 批处理，只触发一次重新渲染
}, 1000)

// 如果需要同步更新
import { flushSync } from 'react-dom'

flushSync(() => {
  setCount(c => c + 1)
})
// 此时DOM已更新
setFlag(f => !f)
```

**2. Suspense改进：**
```javascript
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfilePage />
      <Suspense fallback={<PostsGlimmer />}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  )
}

// 支持服务端渲染的Suspense
function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  )
}
```

### 17. 什么是React 18的startTransition API？

**答案解析：**
startTransition允许你将状态更新标记为非紧急的，让React知道可以中断这些更新。

```javascript
import { startTransition, useTransition } from 'react'

function SearchBox() {
  const [isPending, startTransition] = useTransition()
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  
  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value) // 紧急更新
    
    startTransition(() => {
      // 非紧急更新
      setResults(searchData(value))
    })
  }
  
  return (
    <div>
      <input value={searchTerm} onChange={handleChange} />
      {isPending && <div>Searching...</div>}
      <SearchResults results={results} />
    </div>
  )
}

// 实现原理
function startTransition(callback) {
  const prevTransition = ReactCurrentBatchConfig.transition
  ReactCurrentBatchConfig.transition = {
    _callbacks: new Set(),
    _pendingCallbacks: new Set()
  }
  
  try {
    callback()
  } finally {
    ReactCurrentBatchConfig.transition = prevTransition
  }
}
```

### 18. 解释React 18中的useDeferredValue Hook。

**答案解析：**
useDeferredValue允许你延迟更新UI的某些部分，直到更紧急的更新完成。

```javascript
import { useDeferredValue, useMemo } from 'react'

function App() {
  const [text, setText] = useState('')
  const deferredText = useDeferredValue(text)
  
  // 昂贵的计算只在deferredText改变时执行
  const suggestions = useMemo(() => {
    return searchSuggestions(deferredText)
  }, [deferredText])
  
  return (
    <div>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <Suggestions suggestions={suggestions} />
    </div>
  )
}

// 实现原理
function useDeferredValue(value) {
  const [prevValue, setPrevValue] = useState(value)
  const [deferredValue, setDeferredValue] = useState(value)
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDeferredValue(value)
      setPrevValue(value)
    }, 0)
    
    return () => clearTimeout(timeoutId)
  }, [value])
  
  return deferredValue
}
```

### 19. React 18中的useId Hook有什么用途？

**答案解析：**
useId生成唯一的ID，特别适用于可访问性属性和服务端渲染。

```javascript
import { useId } from 'react'

function PasswordField() {
  const passwordHintId = useId()
  
  return (
    <>
      <label>
        Password:
        <input
          type="password"
          aria-describedby={passwordHintId}
        />
      </label>
      <div id={passwordHintId}>
        Your password should contain at least 18 characters
      </div>
    </>
  )
}

// 在列表中使用
function NameFields() {
  const id = useId()
  
  return (
    <div>
      <label htmlFor={id + '-firstName'}>First Name:</label>
      <input id={id + '-firstName'} type="text" />
      
      <label htmlFor={id + '-lastName'}>Last Name:</label>
      <input id={id + '-lastName'} type="text" />
    </div>
  )
}

// 实现原理
let globalIdCounter = 0

function useId() {
  const [id] = useState(() => {
    return 'react-id-' + (++globalIdCounter)
  })
  
  return id
}
```

### 20. React 18的Strict Mode有哪些新变化？

**答案解析：**
React 18的Strict Mode增强了对并发特性的检测。

**新行为：**
```javascript
// React 18 Strict Mode会双重调用以下函数
function MyComponent() {
  useEffect(() => {
    // 这个effect会被调用两次
    console.log('Effect called')
    
    return () => {
      // cleanup也会被调用两次
      console.log('Cleanup called')
    }
  }, [])
  
  // 组件会被渲染两次
  console.log('Component rendered')
  
  return <div>Hello</div>
}

// 正确的effect写法（幂等性）
function MyComponent() {
  useEffect(() => {
    const controller = new AbortController()
    
    fetch('/api/data', {
      signal: controller.signal
    }).then(response => {
      // 处理响应
    })
    
    return () => {
      controller.abort() // 清理资源
    }
  }, [])
  
  return <div>Hello</div>
}
```

**检测问题：**
- 不安全的副作用
- 缺少cleanup函数
- 非幂等的操作
- 过时的API使用

---

## 性能优化相关题目

### 21. 如何使用React.memo进行性能优化？

**答案解析：**
React.memo是一个高阶组件，用于优化函数组件的重新渲染。

```javascript
// 基本用法
const MyComponent = React.memo(function MyComponent({ name, age }) {
  return <div>{name} is {age} years old</div>
})

// 自定义比较函数
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.name}</div>
}, (prevProps, nextProps) => {
  // 返回true表示props相等，不需要重新渲染
  return prevProps.name === nextProps.name
})

// 复杂对象比较
const UserCard = React.memo(function UserCard({ user, onEdit }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  )
}, (prevProps, nextProps) => {
  // 深度比较user对象
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.user.name === nextProps.user.name &&
    prevProps.user.email === nextProps.user.email &&
    prevProps.onEdit === nextProps.onEdit
  )
})

// 使用useMemo优化props
function ParentComponent() {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')
  
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(filter.toLowerCase())
    )
  }, [users, filter])
  
  const handleEdit = useCallback((userId) => {
    // 编辑逻辑
  }, [])
  
  return (
    <div>
      {filteredUsers.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onEdit={handleEdit} 
        />
      ))}
    </div>
  )
}
```

### 22. 解释useMemo和useCallback的区别及使用场景。

**答案解析：**

**useMemo：**
缓存计算结果
```javascript
function ExpensiveComponent({ items, filter }) {
  // 缓存昂贵的计算
  const expensiveValue = useMemo(() => {
    return items
      .filter(item => item.category === filter)
      .reduce((sum, item) => sum + item.price, 0)
  }, [items, filter])
  
  // 缓存对象引用
  const config = useMemo(() => ({
    theme: 'dark',
    language: 'en'
  }), [])
  
  return (
    <div>
      <p>Total: {expensiveValue}</p>
      <ChildComponent config={config} />
    </div>
  )
}
```

**useCallback：**
缓存函数引用
```javascript
function TodoList({ todos, onToggle, onDelete }) {
  const [filter, setFilter] = useState('all')
  
  // 缓存过滤函数
  const filterTodos = useCallback((todos) => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed)
      case 'active':
        return todos.filter(todo => !todo.completed)
      default:
        return todos
    }
  }, [filter])
  
  // 缓存事件处理函数
  const handleToggle = useCallback((id) => {
    onToggle(id)
  }, [onToggle])
  
  const handleDelete = useCallback((id) => {
    onDelete(id)
  }, [onDelete])
  
  const filteredTodos = useMemo(() => {
    return filterTodos(todos)
  }, [todos, filterTodos])
  
  return (
    <div>
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
```

### 23. 如何实现React组件的懒加载？

**答案解析：**

**使用React.lazy：**
```javascript
import { lazy, Suspense } from 'react'

// 懒加载组件
const LazyComponent = lazy(() => import('./LazyComponent'))

// 动态导入with条件
const LazyComponent = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./LazyComponent'))
    }, 1000)
  })
})

// 错误处理
const LazyComponent = lazy(() => 
  import('./LazyComponent').catch(() => {
    return { default: () => <div>Failed to load component</div> }
  })
)

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  )
}
```

**自定义懒加载Hook：**
```javascript
function useLazyComponent(importFunc) {
  const [component, setComponent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const loadComponent = useCallback(async () => {
    if (component) return
    
    setLoading(true)
    setError(null)
    
    try {
      const module = await importFunc()
      setComponent(() => module.default || module)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [importFunc, component])
  
  return { component, loading, error, loadComponent }
}

// 使用
function MyComponent() {
  const { component: LazyComponent, loading, error, loadComponent } = 
    useLazyComponent(() => import('./HeavyComponent'))
  
  if (error) return <div>Error loading component</div>
  if (loading) return <div>Loading...</div>
  if (!LazyComponent) {
    return <button onClick={loadComponent}>Load Component</button>
  }
  
  return <LazyComponent />
}
```

### 24. 如何优化React应用的包大小？

**答案解析：**

**1. 代码分割：**
```javascript
// 路由级别分割
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
```

**2. Tree Shaking：**
```javascript
// 错误：导入整个库
import _ from 'lodash'

// 正确：只导入需要的函数
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

// 或使用ES6模块
import { debounce, throttle } from 'lodash-es'
```

**3. 动态导入：**
```javascript
// 条件加载
function AdvancedFeature() {
  const [showChart, setShowChart] = useState(false)
  const [ChartComponent, setChartComponent] = useState(null)
  
  const loadChart = async () => {
    if (!ChartComponent) {
      const module = await import('./Chart')
      setChartComponent(() => module.default)
    }
    setShowChart(true)
  }
  
  return (
    <div>
      <button onClick={loadChart}>Show Chart</button>
      {showChart && ChartComponent && <ChartComponent />}
    </div>
  )
}
```

**4. Webpack配置优化：**
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}
```

### 25. 实现一个虚拟滚动组件。

**答案解析：**
```javascript
import { useState, useEffect, useMemo, useCallback } from 'react'

function VirtualList({ 
  items, 
  itemHeight, 
  containerHeight, 
  renderItem,
  overscan = 5 
}) {
  const [scrollTop, setScrollTop] = useState(0)
  
  // 计算可见范围
  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight)
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    )
    
    return {
      start: Math.max(0, startIndex - overscan),
      end: Math.min(items.length - 1, endIndex + overscan)
    }
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan])
  
  // 可见项目
  const visibleItems = useMemo(() => {
    const result = []
    for (let i = visibleRange.start; i <= visibleRange.end; i++) {
      result.push({
        index: i,
        item: items[i],
        style: {
          position: 'absolute',
          top: i * itemHeight,
          height: itemHeight,
          width: '100%'
        }
      })
    }
    return result
  }, [visibleRange, items, itemHeight])
  
  // 总高度
  const totalHeight = items.length * itemHeight
  
  // 滚动处理
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop)
  }, [])
  
  return (
    <div
      style={{
        height: containerHeight,
        overflow: 'auto'
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ index, item, style }) => (
          <div key={index} style={style}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}

// 使用示例
function App() {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`)
  
  return (
    <VirtualList
      items={items}
      itemHeight={50}
      containerHeight={400}
      renderItem={(item, index) => (
        <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          {item}
        </div>
      )}
    />
  )
}
```

---

## 总结

本文档涵盖了React底层原理的各个方面，从基础概念到高级特性，从性能优化到最新的React 18特性。这些面试题不仅考查对React API的熟悉程度，更重要的是考查对React内部工作原理的深入理解。

**学习建议：**
1. 深入理解虚拟DOM和Fiber架构
2. 掌握Hooks的实现原理
3. 熟悉React的调度和协调机制
4. 了解性能优化的各种技巧
5. 跟上React最新特性的发展

**实践建议：**
1. 阅读React源码
2. 实现简化版的React
3. 在项目中应用性能优化技巧
4. 关注React官方博客和RFC
5. 参与React社区讨论

通过深入学习这些内容，不仅能够在面试中表现出色，更能在实际开发中写出高质量的React代码。