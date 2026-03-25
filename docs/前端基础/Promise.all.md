这是一个非常经典的面试题，考察的是对**异步流程控制**的理解深度。除了说出定义，面试官更希望听到**实际业务场景**中的落地案例。

下面我从**核心区别**、**`Promise.all` 的典型场景**、**`Promise.race` 的典型场景**以及**扩展考点（容错与变体）** 四个维度来拆解。

---

### 一、核心区别

| 方法 | 触发条件 | 返回值 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **`Promise.all`** | **全部成功**才成功；**一个失败**则立即失败 | 所有结果组成的**数组**（顺序与输入一致） | 多个异步任务**相互依赖**，必须全部拿到数据才能继续 |
| **`Promise.race`** | **任意一个**成功或失败，立即返回第一个 settled 的结果 | 第一个完成的结果值 | 多个异步任务**竞争**，只需要最快的那个结果 |

> **注意**：`race` 返回的是第一个 **敲定（settled）** 的 promise，不管是成功还是失败。

---

### 二、`Promise.all` 的应用场景

#### 1. 页面首屏依赖多个独立接口
**场景**：后台管理系统的 Dashboard，需要同时获取用户信息、订单统计、商品列表，三者缺一不可。

```javascript
// 三个接口没有依赖关系，可以并发请求
Promise.all([
  fetchUserInfo(),
  fetchOrderStats(),
  fetchProductList()
]).then(([user, orders, products]) => {
  // 所有数据都拿到了，再渲染页面
  renderDashboard(user, orders, products);
}).catch(error => {
  // 任何一个接口报错，都展示错误页
  showErrorPage();
});
```

#### 2. 批量上传文件/图片
**场景**：用户一次选择多张图片上传，需要等**全部上传成功**后才提示“上传完成”，而不是传一张弹一次。

```javascript
const uploadPromises = files.map(file => uploadFileToServer(file));

Promise.all(uploadPromises)
  .then(results => {
    console.log('全部上传成功，返回的URL列表:', results);
    showSuccessToast(`成功上传 ${results.length} 张图片`);
  })
  .catch(err => {
    // 如果有任意一张上传失败，中断后续，提示用户重试
    showErrorToast('部分图片上传失败，请重试');
  });
```

#### 3. 合并多个本地存储/缓存数据
**场景**：从 IndexedDB、LocalStorage 或不同的缓存 key 中聚合数据。

```javascript
Promise.all([
  getFromIndexedDB('userProfile'),
  getFromLocalStorage('theme'),
  fetchFromSession('permissions')
]).then(([profile, theme, permissions]) => {
  // 整合所有缓存数据，初始化应用状态
  initApp({ profile, theme, permissions });
});
```

---

### 三、`Promise.race` 的应用场景

#### 1. 请求超时控制（最经典）
**场景**：核心接口如果超过 5 秒没有响应，切换为降级数据或提示网络不佳。

```javascript
function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const fetchPromise = fetch(url, { signal: controller.signal });
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => {
      controller.abort();
      reject(new Error('请求超时'));
    }, timeout)
  );

  return Promise.race([fetchPromise, timeoutPromise]);
}

// 使用
fetchWithTimeout('/api/critical-data', 3000)
  .then(res => res.json())
  .catch(err => {
    if (err.message === '请求超时') {
      // 展示缓存数据或友好提示
      showFallbackData();
    }
  });
```

#### 2. 多源数据竞争（CDN 降级）
**场景**：优先使用最快的 CDN 资源，或者在多个镜像源中选择响应最快的。

```javascript
// 从三个不同地域的 CDN 获取同一个配置文件，谁先回来用谁
const cdnUrls = [
  'https://cdn1.example.com/config.json',
  'https://cdn2.example.com/config.json',
  'https://backup.example.com/config.json'
];

const promises = cdnUrls.map(url => fetch(url).then(res => res.json()));
Promise.race(promises)
  .then(fastestConfig => {
    applyConfig(fastestConfig);
  })
  .catch(() => {
    // 如果全部失败（race 只会因第一个失败而失败，但通常需要兜底）
    console.error('所有 CDN 均不可用');
  });
```

#### 3. 用户交互与请求的竞态
**场景**：搜索输入框防抖后发请求，如果用户快速切换 Tab，需要用最新的请求结果覆盖旧的。

```javascript
let currentRequestId = 0;

function search(keyword) {
  const requestId = ++currentRequestId;
  const searchPromise = fetch(`/api/search?q=${keyword}`);

  // 假设用户交互优先级高于异步结果，但这里 race 并不直接解决竞态
  // 更常见的做法是用 race + 标记来丢弃过期请求
  const userCancelPromise = new Promise((_, reject) => {
    // 模拟：如果用户在 200ms 内又输入了新内容，取消当前请求
    const timer = setTimeout(() => {
      clearTimeout(timer);
      reject(new Error('cancelled'));
    }, 200);
  });

  Promise.race([searchPromise, userCancelPromise])
    .then(res => {
      if (requestId === currentRequestId) {
        // 只有最新的请求才更新 UI
        updateUI(res);
      }
    })
    .catch(err => {
      if (err.message !== 'cancelled') {
        handleError(err);
      }
    });
}
```

---

### 四、扩展考点：容错与变体

面试中回答完以上场景后，如果能主动提及以下 **Promise 变体**，会明显提升技术深度印象：

#### 1. `Promise.allSettled` —— 需要全部结果，不关心失败
**场景**：上报多个埋点数据，不在乎某个上报失败，只希望所有上报都“完成”后记录日志。

```javascript
const reports = events.map(event => sendAnalytics(event));

Promise.allSettled(reports).then(results => {
  const failed = results.filter(r => r.status === 'rejected');
  if (failed.length) {
    console.warn(`${failed.length} 条埋点上报失败`);
  }
  // 无论成功失败，都继续业务流程
});
```

#### 2. `Promise.any` —— 任意一个成功即可，忽略失败（直到全部失败）
**场景**：备用认证方案，只要有一个认证源可用就通过。

```javascript
// 尝试多种登录方式：指纹、人脸、密码，只要任意一种验证通过
const authMethods = [
  verifyFingerprint(),
  verifyFaceId(),
  verifyPassword()
];

Promise.any(authMethods).then(result => {
  // 最快的那个成功的结果
  grantAccess(result);
}).catch(() => {
  // 所有验证方式都失败了
  showLoginError();
});
```

---

### 五、总结（面试回答话术参考）

> “**`Promise.all` 的核心是‘全部成功才成功’**，适用于多个异步任务相互依赖、缺一不可的场景，比如页面初始化依赖多个接口、批量操作等。  
> **`Promise.race` 的核心是‘谁先完成用谁’**，典型场景是请求超时控制、多源资源竞争降级。  
> 在实际工程中，我也会根据需求选择 `allSettled` 做容错上报，或用 `any` 做多路备选认证。  
> 另外需要注意，`race` 如果第一个完成的是 reject，会直接进入 catch，所以超时控制通常需要配合 `AbortController` 或额外的 reject 逻辑来避免误判。”

如果需要，我可以继续追问你一个**变体场景题**（比如：“如何实现一个带并发数限制的 `Promise.all`？”），测试你对异步流程控制的工程化能力。需要吗？