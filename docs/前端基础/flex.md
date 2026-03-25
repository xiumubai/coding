`display` 是 CSS 中**最核心、最复杂**的属性之一，面试中考察的是你对**盒模型、布局上下文、以及现代布局方案（Flex/Grid）** 的理解深度。

下面我从**分类维度**来梳理，并标注**面试高频点**。

---

### 一、常用基础值（必须掌握）

| 属性值 | 表现 | 典型场景 | 面试考点 |
|--------|------|----------|----------|
| **`block`** | 独占一行，宽高生效，默认宽度100% | `<div>`、`<p>`、`<h1>` 等块级元素 | 块级格式化上下文（BFC） |
| **`inline`** | 同行排列，宽高不生效，大小由内容撑开 | `<span>`、`<a>`、`<strong>` | 行内元素不能设置 margin-top/bottom？实际可以但不会影响行高 |
| **`inline-block`** | 同行排列，但宽高生效 | 导航栏、按钮组、横向列表 | 会产生**幽灵空白节点**（inline 元素间的换行符导致间隙） |
| **`none`** | 隐藏元素，**不占据文档流空间** | 条件渲染、模态框显隐 | 与 `visibility: hidden` 的区别（后者占位） |

> **高频追问**：`inline-block` 的间隙如何解决？  
> 答：父元素 `font-size: 0` 再子元素重置；或使用 `flex` 替代。

---

### 二、现代布局核心（必问）

#### 1. Flexbox 相关
| 属性值 | 说明 |
|--------|------|
| **`flex`** | 块级 flex 容器，独占一行 |
| **`inline-flex`** | 行内 flex 容器，与其他元素同行 |

**面试点**：设置 `display: flex` 后，子元素的 `float`、`clear`、`vertical-align` 失效。

#### 2. Grid 相关
| 属性值 | 说明 |
|--------|------|
| **`grid`** | 块级网格容器 |
| **`inline-grid`** | 行内网格容器 |

**面试点**：Flex 是一维布局（行或列），Grid 是二维布局（同时控制行和列）。

---

### 三、表格相关（传统布局，了解即可）

| 属性值 | 说明 |
|--------|------|
| **`table`** | 类似 `<table>` 的块级表格容器 |
| **`table-row`** | 类似 `<tr>` |
| **`table-cell`** | 类似 `<td>`，常用于**垂直居中**（经典 hack） |
| `table-caption` | 类似 `<caption>` |
| `table-column` / `table-column-group` | 控制列宽 |

> **历史考点**：在 Flex 普及前，`display: table-cell` 配合 `vertical-align: middle` 是实现**不定高垂直居中**的标准方案。

---

### 四、列表相关

| 属性值 | 说明 |
|--------|------|
| **`list-item`** | 生成块级盒子 + 标记盒子（如 `<li>` 前的圆点） |

---

### 五、特殊与实验性值

| 属性值 | 说明 | 注意 |
|--------|------|------|
| **`contents`** | 元素本身不生成盒子，子元素直接“穿透”到父级布局中 | 支持度较好，但会导致**某些伪元素失效**、**影响无障碍树** |
| **`flow-root`** | 创建 BFC，清除浮动而不引入其他副作用 | 替代 `overflow: hidden` 清除浮动的更干净方案 |
| `inherit` / `initial` / `unset` | CSS 全局关键字 | 理解继承与重置 |

---

### 六、易混淆对比表（面试常考）

| 对比项 | 关键区别 |
|--------|----------|
| `display: none` vs `visibility: hidden` | 前者**不占位**，后者**占位但不可见** |
| `block` vs `inline-block` | 前者独占一行，后者同行但可设宽高 |
| `flex` vs `grid` | 一维 vs 二维；Flex 适合组件级布局，Grid 适合页面级布局 |
| `inline-block` vs `inline-flex` | 前者是**布局模式**（外部 inline + 内部 block），后者是**容器类型**（外部 inline + 内部 flex） |

---

### 七、高频追问与进阶考点

#### 1. 如何用 `display` 实现一个元素既隐藏又占位？
- 无法用 `display` 实现，需要用 `visibility: hidden` 或 `opacity: 0`。

#### 2. `display: contents` 的实际应用场景？
- 用于**语义化与样式解耦**，例如：`<ul>` 下需要多一层包裹但又不想影响 flex/grid 布局时。

```html
<!-- 希望 li 直接成为 flex 子项，但中间有 div 包裹 -->
<ul style="display: flex;">
  <div style="display: contents;">
    <li>项目1</li>
    <li>项目2</li>
  </div>
</ul>
<!-- 效果：li 直接作为 flex 子项排列 -->
```

#### 3. 一个元素可以同时拥有 `display: flex` 和 `display: grid` 吗？
- 不能，后者覆盖前者。CSS 层叠规则决定。

---

### 八、面试回答话术参考

> “`display` 属性决定元素的**外部表现**（同行/独占）和**内部布局上下文**（BFC、FFC、GFC）。  
> 基础层面，我常用 `block`、`inline`、`inline-block`、`none`；  
> 现代布局主要使用 `flex`（一维）和 `grid`（二维）；  
> 特殊场景会用到 `table-cell` 做垂直居中兼容，或 `contents` 做结构解耦。  
> 另外，我会注意 `display: none` 与 `visibility: hidden` 的空间占用差异，以及 `inline-block` 的幽灵空白节点问题及其解决方案。”

---

如果你需要，我可以接着问：
- “`display: flex` 和 `display: inline-flex` 在实际渲染上有什么区别？”
- 或者给一个**布局场景题**，让你现场用 display + 其他属性来实现？

你想继续深入哪个方向？