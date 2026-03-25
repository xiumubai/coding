React 性能优化是面试中的**高阶必考题**，考察的是你对 React 渲染机制的理解深度以及实际工程化能力。

下面我从**渲染优化、状态管理、代码分割、列表优化、工具监控**五个维度系统梳理，并标注**面试高频点**。

---

## 一、渲染优化（核心）

### 1. 使用 `React.memo` 避免子组件不必要的重渲染
**原理**：浅比较 props，如果没变化则跳过渲染。

```jsx
const ChildComponent = React.memo(({ data }) => {
  return <div>{data.name}</div>;
});

// 如果父组件重渲染但 data 引用未变，Child 不会重渲染
```

**面试点**：
- 默认是**浅比较**，传递对象/函数时需要配合 `useCallback`、`useMemo`
- 可以传入第二个参数自定义比较逻辑

### 2. `useMemo` 缓存计算结果
**场景**：昂贵的计算（数据过滤、排序、复杂运算）

```jsx
const expensiveResult = useMemo(() => {
  return heavyCalculation(list, filter);
}, [list, filter]); // 只有依赖变化才重新计算
```

### 3. `useCallback` 缓存函数引用
**场景**：传递给子组件的回调函数，配合 `React.memo` 使用

```jsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]); // id 不变时，函数引用不变

return <ExpensiveChild onClick={handleClick} />;
```

### 4. 避免在 render 中创建新对象/数组
**错误示例**：
```jsx
// 每次渲染都会创建新对象，导致子组件重渲染
<Child config={{ theme: 'dark' }} />
<Child items={[1, 2, 3]} />
```

**正确做法**：
```jsx
const config = useMemo(() => ({ theme: 'dark' }), []);
const items = useMemo(() => [1, 2, 3], []);
```

---

## 二、状态管理优化

### 1. 状态拆分，避免状态提升过度
**原则**：将状态放在**最接近使用它的组件**，避免不必要的祖先重渲染。

```jsx
// ❌ 所有状态都放在顶层
const [name, setName] = useState('');
const [count, setCount] = useState(0);

// ✅ 无关状态拆分到不同组件
<Header />  {/* 内部管理搜索状态 */}
<Content /> {/* 内部管理列表状态 */}
```

### 2. 使用 `useReducer` 管理复杂状态
**优势**：可以避免多个 `useState` 导致的多次渲染，且状态逻辑集中。

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'update': return { ...state, ...action.payload };
    // ...
  }
};
const [state, dispatch] = useReducer(reducer, initialState);
```

### 3. 使用状态管理库的 selector 机制
**Redux / Zustand / Jotai**：
```javascript
// Redux - 只有 count 变化才重渲染
const count = useSelector(state => state.count);

// Zustand - 使用 shallow 避免对象引用变化导致重渲染
const { name, age } = useStore(state => ({ name: state.name, age: state.age }), shallow);
```

---

## 三、代码分割与懒加载

### 1. 路由级别的代码分割
使用 `React.lazy` + `Suspense`：

```jsx
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

### 2. 组件级别的懒加载
**场景**：弹窗、抽屉、富文本编辑器等非首屏组件

```jsx
const HeavyModal = React.lazy(() => import('./HeavyModal'));

function Page() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>打开</button>
      {showModal && (
        <Suspense fallback={<div>加载中...</div>}>
          <HeavyModal />
        </Suspense>
      )}
    </>
  );
}
```

---

## 四、列表优化

### 1. 使用 `key` 的正确姿势
**原则**：
- 使用**稳定唯一**的标识（如 `id`）
- **避免使用 `index`** 作为 key（会导致状态错乱、性能下降）

```jsx
// ❌ 使用 index
items.map((item, index) => <Item key={index} data={item} />)

// ✅ 使用唯一 id
items.map(item => <Item key={item.id} data={item} />)
```

### 2. 虚拟滚动（Windowing）
**场景**：渲染大量列表数据（1000+ 条）
**常用库**：`react-window`、`react-virtualized`

```jsx
import { FixedSizeList } from 'react-window';

const MyList = ({ items }) => (
  <FixedSizeList
    height={600}
    itemCount={items.length}
    itemSize={50}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>{items[index].name}</div>
    )}
  </FixedSizeList>
);
```

---

## 五、其他优化手段

### 1. 避免内联样式对象（与内联对象同理）
```jsx
// ❌ 每次渲染创建新对象
<div style={{ color: 'red', fontSize: '14px' }}>

// ✅ 提取到组件外（如果样式固定）
const styles = { color: 'red', fontSize: '14px' };
<div style={styles}>
```

### 2. 使用 `useTransition` / `useDeferredValue` 降低优先级
**场景**：输入框搜索 + 大数据列表渲染，避免输入卡顿

```jsx
const [inputValue, setInputValue] = useState('');
const [isPending, startTransition] = useTransition();
const [list, setList] = useState([]);

const handleChange = (e) => {
  const value = e.target.value;
  setInputValue(value);
  
  startTransition(() => {
    // 低优先级更新，不阻塞输入
    const filtered = hugeList.filter(item => item.includes(value));
    setList(filtered);
  });
};
```

### 3. 图片懒加载
```jsx
<img loading="lazy" src="image.jpg" alt="description" />
// 或使用 Intersection Observer 自定义实现
```

### 4. 避免在 JSX 中使用匿名函数（与 useCallback 同理）
```jsx
// ❌ 每次渲染创建新函数
<button onClick={() => handleClick(id)}>

// ✅ 使用 useCallback 或定义在外部
const onClick = useCallback(() => handleClick(id), [id]);
<button onClick={onClick}>
```

---

## 六、监控与诊断

### 1. React DevTools Profiler
- 录制渲染过程，查看组件渲染次数和耗时
- 高亮显示重渲染的组件

### 2. 使用 `why-did-you-render` 库
检测不必要的重渲染：

```javascript
import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  trackAllPureComponents: true,
});
```

### 3. 生产环境性能监控
- **Lighthouse** 评分
- **Core Web Vitals** (LCP, FID, CLS)
- **Sentry** 等错误监控平台

---

## 七、面试话术参考（按优先级排序）

> “React 性能优化我通常从**减少渲染**、**降低渲染代价**、**代码分割**三个维度切入：

1. **渲染控制**：用 `React.memo` + `useCallback`/`useMemo` 避免子组件无意义重渲染，状态尽量放在合适的层级，避免过度提升。
2. **列表优化**：大列表用 `react-window` 做虚拟滚动，key 使用稳定 ID 避免使用 index。
3. **代码分割**：路由级别和组件级别用 `React.lazy` + `Suspense` 懒加载，减少首屏 JS 体积。
4. **交互体验**：用 `useTransition` 标记非紧急更新，保证输入框等高频交互不卡顿。
5. **工具辅助**：借助 React DevTools Profiler 和 `why-did-you-render` 定位性能瓶颈。

最重要的是**先测量后优化**，避免过早优化导致代码复杂度增加。”

---

## 八、进阶追问准备

面试官可能会接着问：
- **“`React.memo` 和 `useMemo` 的区别？”**（一个优化组件渲染，一个缓存计算结果）
- **“虚拟滚动的原理是什么？”**（只渲染可视区域 + 缓冲区的元素，动态替换 DOM）
- **“`useTransition` 和 `useDeferredValue` 的区别？”**（前者控制更新优先级，后者延迟某个值的更新）
- **“如果必须用 index 作为 key，什么情况下是安全的？”**（列表静态、不增删改、不重排序）

需要我针对某个点展开深度讲解吗？比如虚拟滚动的实现原理，或者 `useTransition` 的内部机制？