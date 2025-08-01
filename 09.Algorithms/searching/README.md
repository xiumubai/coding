# 搜索算法

本目录包含了常见搜索算法的JavaScript实现，包括线性搜索、二分搜索、跳跃搜索、插值搜索、指数搜索、三分搜索和斐波那契搜索。

## 目录

1. [线性搜索 (Linear Search)](#线性搜索-linear-search)
2. [二分搜索 (Binary Search)](#二分搜索-binary-search)
3. [跳跃搜索 (Jump Search)](#跳跃搜索-jump-search)
4. [插值搜索 (Interpolation Search)](#插值搜索-interpolation-search)
5. [指数搜索 (Exponential Search)](#指数搜索-exponential-search)
6. [三分搜索 (Ternary Search)](#三分搜索-ternary-search)
7. [斐波那契搜索 (Fibonacci Search)](#斐波那契搜索-fibonacci-search)
8. [性能比较](#性能比较)
9. [如何运行测试](#如何运行测试)

## 线性搜索 (Linear Search)

### 原理

线性搜索是最简单的搜索算法，它从数组的一端开始，依次检查每个元素，直到找到目标值或遍历完整个数组。

### 实现

```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}
```

### 时间复杂度

- 最坏情况：O(n) - 目标值在数组的最后或不存在
- 最好情况：O(1) - 目标值在数组的第一个位置
- 平均情况：O(n/2) ≈ O(n)

### 空间复杂度

O(1) - 只使用了常数级别的额外空间

### 适用场景

- 适用于小型数组
- 适用于未排序的数组
- 当搜索操作不频繁时
- 当数组元素频繁变化时

## 二分搜索 (Binary Search)

### 原理

二分搜索是一种在有序数组中查找特定元素的高效算法。它通过将搜索范围不断一分为二，每次比较中间元素与目标值，从而快速缩小搜索范围。

### 实现

```javascript
// 迭代实现
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  
  return -1;
}

// 递归实现
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1;
  }
  
  const mid = left + Math.floor((right - left) / 2);
  
  if (arr[mid] === target) {
    return mid;
  }
  
  if (arr[mid] > target) {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
  
  return binarySearchRecursive(arr, target, mid + 1, right);
}
```

### 时间复杂度

- 最坏情况：O(log n) - 每次迭代将搜索范围减半
- 最好情况：O(1) - 目标值恰好是中间元素
- 平均情况：O(log n)

### 空间复杂度

- 迭代实现：O(1) - 只使用了常数级别的额外空间
- 递归实现：O(log n) - 递归调用栈的深度

### 适用场景

- 适用于已排序的数组
- 适用于大型数据集
- 当搜索操作频繁时
- 当数据集相对稳定（不经常变化）时

## 跳跃搜索 (Jump Search)

### 原理

跳跃搜索是一种在有序数组中的搜索算法，它通过跳跃固定步长（通常是√n）来减少比较次数。一旦找到一个大于目标值的元素，就在前一个块中进行线性搜索。

### 实现

```javascript
function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  
  let prev = 0;
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) {
      return -1;
    }
  }
  
  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) {
      return -1;
    }
  }
  
  if (arr[prev] === target) {
    return prev;
  }
  
  return -1;
}
```

### 时间复杂度

- 最坏情况：O(√n) - 最优步长为√n
- 最好情况：O(1) - 目标值在第一个位置
- 平均情况：O(√n)

### 空间复杂度

O(1) - 只使用了常数级别的额外空间

### 适用场景

- 适用于已排序的数组
- 当二分搜索的开销过大时（如在链表中）
- 当数组较大但不是非常大时

## 插值搜索 (Interpolation Search)

### 原理

插值搜索是二分搜索的改进版，它根据目标值在已知范围内的可能位置来估计搜索位置，而不是总是选择中间位置。这种方法在数据分布均匀的情况下特别有效。

### 实现

```javascript
function interpolationSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      if (arr[low] === target) {
        return low;
      }
      return -1;
    }
    
    const pos = low + Math.floor(
      ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );
    
    if (arr[pos] === target) {
      return pos;
    }
    
    if (arr[pos] > target) {
      high = pos - 1;
    } else {
      low = pos + 1;
    }
  }
  
  return -1;
}
```

### 时间复杂度

- 最坏情况：O(n) - 当数据分布不均匀时
- 最好情况：O(1) - 直接找到目标值
- 平均情况：O(log log n) - 当数据分布均匀时

### 空间复杂度

O(1) - 只使用了常数级别的额外空间

### 适用场景

- 适用于已排序的数组
- 当数据分布相对均匀时效果最佳
- 适用于大型数据集

## 指数搜索 (Exponential Search)

### 原理

指数搜索首先确定目标值可能存在的范围，方法是从数组的开始位置指数增长索引（1, 2, 4, 8, 16, ...），直到找到一个大于目标值的索引。然后在确定的范围内使用二分搜索。

### 实现

```javascript
function exponentialSearch(arr, target) {
  const n = arr.length;
  
  if (n === 0) {
    return -1;
  }
  
  if (arr[0] === target) {
    return 0;
  }
  
  let i = 1;
  while (i < n && arr[i] <= target) {
    i *= 2;
  }
  
  return binarySearchInRange(arr, target, i / 2, Math.min(i, n - 1));
}

function binarySearchInRange(arr, target, left, right) {
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  
  return -1;
}
```

### 时间复杂度

- 最坏情况：O(log n) - 与二分搜索相同
- 最好情况：O(1) - 目标值在前几个位置
- 平均情况：O(log n)

### 空间复杂度

O(1) - 只使用了常数级别的额外空间

### 适用场景

- 适用于已排序的无界或非常大的数组
- 当目标值可能在数组的前面部分时特别有效
- 适用于需要在无限长度的已排序数组中搜索的情况

## 三分搜索 (Ternary Search)

### 原理

三分搜索是一种在有序数组中查找的算法，它通过将数组分成三部分，每次排除其中一部分，从而减少比较次数。

### 实现

```javascript
function ternarySearch(arr, target) {
  return ternarySearchRecursive(arr, target, 0, arr.length - 1);
}

function ternarySearchRecursive(arr, target, left, right) {
  if (left > right) {
    return -1;
  }
  
  const mid1 = left + Math.floor((right - left) / 3);
  const mid2 = right - Math.floor((right - left) / 3);
  
  if (arr[mid1] === target) {
    return mid1;
  }
  
  if (arr[mid2] === target) {
    return mid2;
  }
  
  if (target < arr[mid1]) {
    return ternarySearchRecursive(arr, target, left, mid1 - 1);
  }
  
  if (target > arr[mid2]) {
    return ternarySearchRecursive(arr, target, mid2 + 1, right);
  }
  
  return ternarySearchRecursive(arr, target, mid1 + 1, mid2 - 1);
}
```

### 时间复杂度

- 最坏情况：O(log3 n) - 每次迭代将搜索范围减少到原来的1/3
- 最好情况：O(1) - 目标值恰好是三等分点之一
- 平均情况：O(log3 n)

### 空间复杂度

- 递归实现：O(log3 n) - 递归调用栈的深度
- 迭代实现：O(1) - 只使用了常数级别的额外空间

### 适用场景

- 适用于已排序的数组
- 适用于大型数据集
- 当需要比二分搜索更少的比较次数时（但实际上，由于常数因子的影响，二分搜索通常更快）

## 斐波那契搜索 (Fibonacci Search)

### 原理

斐波那契搜索是一种在有序数组中使用斐波那契数列来确定搜索位置的算法。它类似于黄金分割搜索，通过使用斐波那契数来确定分割点。

### 实现

```javascript
function fibonacciSearch(arr, target) {
  const n = arr.length;
  
  let fibMMinus2 = 0;
  let fibMMinus1 = 1;
  let fibM = fibMMinus1 + fibMMinus2;
  
  while (fibM < n) {
    fibMMinus2 = fibMMinus1;
    fibMMinus1 = fibM;
    fibM = fibMMinus1 + fibMMinus2;
  }
  
  let offset = -1;
  
  while (fibM > 1) {
    const i = Math.min(offset + fibMMinus2, n - 1);
    
    if (arr[i] < target) {
      fibM = fibMMinus1;
      fibMMinus1 = fibMMinus2;
      fibMMinus2 = fibM - fibMMinus1;
      offset = i;
    }
    else if (arr[i] > target) {
      fibM = fibMMinus2;
      fibMMinus1 = fibMMinus1 - fibMMinus2;
      fibMMinus2 = fibM - fibMMinus1;
    }
    else {
      return i;
    }
  }
  
  if (fibMMinus1 && arr[offset + 1] === target) {
    return offset + 1;
  }
  
  return -1;
}
```

### 时间复杂度

- 最坏情况：O(log n) - 与二分搜索相同
- 最好情况：O(1) - 目标值恰好是分割点
- 平均情况：O(log n)

### 空间复杂度

O(1) - 只使用了常数级别的额外空间

### 适用场景

- 适用于已排序的数组
- 当需要避免乘法和除法运算时（只使用加法和减法）
- 在某些硬件环境中可能比二分搜索更有效

## 性能比较

| 算法 | 最坏时间复杂度 | 最好时间复杂度 | 平均时间复杂度 | 空间复杂度 | 是否需要排序 |
|------|--------------|--------------|--------------|-----------|------------|
| 线性搜索 | O(n) | O(1) | O(n) | O(1) | 否 |
| 二分搜索 | O(log n) | O(1) | O(log n) | O(1) | 是 |
| 跳跃搜索 | O(√n) | O(1) | O(√n) | O(1) | 是 |
| 插值搜索 | O(n) | O(1) | O(log log n) | O(1) | 是 |
| 指数搜索 | O(log n) | O(1) | O(log n) | O(1) | 是 |
| 三分搜索 | O(log3 n) | O(1) | O(log3 n) | O(1) | 是 |
| 斐波那契搜索 | O(log n) | O(1) | O(log n) | O(1) | 是 |

### 选择合适的搜索算法

- **线性搜索**：适用于小型数组或未排序数组
- **二分搜索**：适用于已排序的中大型数组，是最常用的搜索算法
- **跳跃搜索**：适用于已排序的中型数组，特别是当跳跃成本低于二分搜索的比较成本时
- **插值搜索**：适用于已排序且分布均匀的数组，如电话簿
- **指数搜索**：适用于无界或非常大的已排序数组，特别是当目标值可能在数组前面部分时
- **三分搜索**：适用于已排序的数组，但在实践中通常不如二分搜索高效
- **斐波那契搜索**：适用于已排序的数组，在某些特定硬件环境中可能比二分搜索更有效

## 如何运行测试

要运行测试文件，请在命令行中执行以下命令：

```bash
node test.js
```

测试文件将对所有搜索算法进行多种场景的测试，包括：

1. 在排序数组中搜索存在的元素
2. 在排序数组中搜索不存在的元素
3. 在未排序数组中搜索元素（仅适用于线性搜索）
4. 性能比较测试（使用大型数组）

每个测试都会显示算法名称、测试结果（通过/失败）、目标值、期望索引、实际索引和执行时间。