/**
 * 搜索算法测试文件
 */

// 导入所有搜索算法
const linearSearch = require('./linearSearch');
const { binarySearchIterative, binarySearchRecursive } = require('./binarySearch');
const jumpSearch = require('./jumpSearch');
const interpolationSearch = require('./interpolationSearch');
const exponentialSearch = require('./exponentialSearch');
const { ternarySearch, ternarySearchRecursive, ternarySearchIterative } = require('./ternarySearch');
const fibonacciSearch = require('./fibonacciSearch');
const { hashSearch, hashSearchAll } = require('./hashSearch');

// 测试数据
const sortedArray = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
const unsortedArray = [33, 5, 9, 1, 89, 54, 21, 13, 17];

// 测试函数
function testSearchAlgorithm(name, searchFn, array, target, expectedIndex, requiresSorted = false) {
  try {
    // 如果算法需要排序数组但输入是未排序的，则跳过测试
    if (requiresSorted && array === unsortedArray) {
      console.log(`跳过 ${name} 测试：该算法需要排序数组`);
      return;
    }
    
    const startTime = performance.now();
    const result = searchFn(array, target);
    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(6);
    
    const status = result === expectedIndex ? '通过' : '失败';
    console.log(`${name} 测试 ${status}：目标值 ${target}，期望索引 ${expectedIndex}，实际索引 ${result}，执行时间 ${executionTime}ms`);
  } catch (error) {
    console.error(`${name} 测试出错：${error.message}`);
  }
}

// 运行测试
console.log('\n=== 在排序数组中搜索存在的元素 ===');
const targetExist = 55;
const expectedIndexExist = 8; // 55在sortedArray中的索引是8

testSearchAlgorithm('线性搜索', linearSearch, sortedArray, targetExist, expectedIndexExist);
testSearchAlgorithm('二分搜索（迭代）', binarySearchIterative, sortedArray, targetExist, expectedIndexExist, true);
testSearchAlgorithm('二分搜索（递归）', binarySearchRecursive, sortedArray, targetExist, expectedIndexExist, true);
testSearchAlgorithm('跳跃搜索', jumpSearch, sortedArray, targetExist, expectedIndexExist, true);
testSearchAlgorithm('插值搜索', interpolationSearch, sortedArray, targetExist, expectedIndexExist, true);
testSearchAlgorithm('指数搜索', exponentialSearch, sortedArray, targetExist, expectedIndexExist, true);
testSearchAlgorithm('三分搜索（递归）', ternarySearch, sortedArray, targetExist, expectedIndexExist, true);
testSearchAlgorithm('三分搜索（迭代）', ternarySearchIterative, sortedArray, targetExist, expectedIndexExist, true);
testSearchAlgorithm('斐波那契搜索', fibonacciSearch, sortedArray, targetExist, expectedIndexExist, true);

console.log('\n=== 在排序数组中搜索不存在的元素 ===');
const targetNotExist = 100;
const expectedIndexNotExist = -1;

testSearchAlgorithm('线性搜索', linearSearch, sortedArray, targetNotExist, expectedIndexNotExist);
testSearchAlgorithm('二分搜索（迭代）', binarySearchIterative, sortedArray, targetNotExist, expectedIndexNotExist, true);
testSearchAlgorithm('二分搜索（递归）', binarySearchRecursive, sortedArray, targetNotExist, expectedIndexNotExist, true);
testSearchAlgorithm('跳跃搜索', jumpSearch, sortedArray, targetNotExist, expectedIndexNotExist, true);
testSearchAlgorithm('插值搜索', interpolationSearch, sortedArray, targetNotExist, expectedIndexNotExist, true);
testSearchAlgorithm('指数搜索', exponentialSearch, sortedArray, targetNotExist, expectedIndexNotExist, true);
testSearchAlgorithm('三分搜索（递归）', ternarySearch, sortedArray, targetNotExist, expectedIndexNotExist, true);
testSearchAlgorithm('三分搜索（迭代）', ternarySearchIterative, sortedArray, targetNotExist, expectedIndexNotExist, true);
testSearchAlgorithm('斐波那契搜索', fibonacciSearch, sortedArray, targetNotExist, expectedIndexNotExist, true);

console.log('\n=== 在未排序数组中搜索元素（仅适用于线性搜索）===');
const targetUnsorted = 89;
const expectedIndexUnsorted = 4; // 89在unsortedArray中的索引是4

testSearchAlgorithm('线性搜索', linearSearch, unsortedArray, targetUnsorted, expectedIndexUnsorted);
testSearchAlgorithm('二分搜索（迭代）', binarySearchIterative, unsortedArray, targetUnsorted, -1, true); // 预期失败
testSearchAlgorithm('二分搜索（递归）', binarySearchRecursive, unsortedArray, targetUnsorted, -1, true); // 预期失败
testSearchAlgorithm('跳跃搜索', jumpSearch, unsortedArray, targetUnsorted, -1, true); // 预期失败
testSearchAlgorithm('插值搜索', interpolationSearch, unsortedArray, targetUnsorted, -1, true); // 预期失败
testSearchAlgorithm('指数搜索', exponentialSearch, unsortedArray, targetUnsorted, -1, true); // 预期失败
testSearchAlgorithm('三分搜索（递归）', ternarySearch, unsortedArray, targetUnsorted, -1, true); // 预期失败
testSearchAlgorithm('三分搜索（迭代）', ternarySearchIterative, unsortedArray, targetUnsorted, -1, true); // 预期失败
testSearchAlgorithm('斐波那契搜索', fibonacciSearch, unsortedArray, targetUnsorted, -1, true); // 预期失败

// 性能比较测试
console.log('\n=== 性能比较测试 ===');

// 创建一个大型排序数组用于性能测试
const largeArray = Array.from({ length: 10000 }, (_, i) => i * 2); // 0, 2, 4, ..., 19998
const targetLarge = 19998; // 数组中的最后一个元素
const expectedIndexLarge = 9999;

console.log('大型数组（10000个元素）中搜索最后一个元素（最坏情况）：');
testSearchAlgorithm('线性搜索', linearSearch, largeArray, targetLarge, expectedIndexLarge);
testSearchAlgorithm('二分搜索（迭代）', binarySearchIterative, largeArray, targetLarge, expectedIndexLarge, true);
testSearchAlgorithm('二分搜索（递归）', binarySearchRecursive, largeArray, targetLarge, expectedIndexLarge, true);
testSearchAlgorithm('跳跃搜索', jumpSearch, largeArray, targetLarge, expectedIndexLarge, true);
testSearchAlgorithm('插值搜索', interpolationSearch, largeArray, targetLarge, expectedIndexLarge, true);
testSearchAlgorithm('指数搜索', exponentialSearch, largeArray, targetLarge, expectedIndexLarge, true);
testSearchAlgorithm('三分搜索（递归）', ternarySearch, largeArray, targetLarge, expectedIndexLarge, true);
testSearchAlgorithm('三分搜索（迭代）', ternarySearchIterative, largeArray, targetLarge, expectedIndexLarge, true);
testSearchAlgorithm('斐波那契搜索', fibonacciSearch, largeArray, targetLarge, expectedIndexLarge, true);
testSearchAlgorithm('哈希搜索', hashSearch, largeArray, targetLarge, expectedIndexLarge, true);

// 搜索不存在的元素
const targetLargeNotExist = 19999; // 不在数组中
console.log('\n大型数组中搜索不存在的元素：');
testSearchAlgorithm('线性搜索', linearSearch, largeArray, targetLargeNotExist, -1);
testSearchAlgorithm('二分搜索（迭代）', binarySearchIterative, largeArray, targetLargeNotExist, -1, true);
testSearchAlgorithm('二分搜索（递归）', binarySearchRecursive, largeArray, targetLargeNotExist, -1, true);
testSearchAlgorithm('跳跃搜索', jumpSearch, largeArray, targetLargeNotExist, -1, true);
testSearchAlgorithm('插值搜索', interpolationSearch, largeArray, targetLargeNotExist, -1, true);
testSearchAlgorithm('指数搜索', exponentialSearch, largeArray, targetLargeNotExist, -1, true);
testSearchAlgorithm('三分搜索（递归）', ternarySearch, largeArray, targetLargeNotExist, -1, true);
testSearchAlgorithm('三分搜索（迭代）', ternarySearchIterative, largeArray, targetLargeNotExist, -1, true);
testSearchAlgorithm('斐波那契搜索', fibonacciSearch, largeArray, targetLargeNotExist, -1, true);
testSearchAlgorithm('哈希搜索', hashSearch, largeArray, targetLargeNotExist, -1, true);

// 测试哈希搜索（返回所有匹配的索引）
console.log('\n=== 测试哈希搜索（返回所有匹配的索引）===');
const arrayWithDuplicates = [1, 2, 3, 4, 5, 3, 6, 7, 3, 8, 9, 10];
const targetDuplicate = 3;
const expectedIndices = [2, 5, 8];
const startTime = performance.now();
const actualIndices = hashSearchAll(arrayWithDuplicates, targetDuplicate);
const endTime = performance.now();
const executionTime = (endTime - startTime).toFixed(6);

if (JSON.stringify(actualIndices) === JSON.stringify(expectedIndices)) {
  console.log(`哈希搜索（所有匹配） 测试 通过：目标值 ${targetDuplicate}，期望索引 [${expectedIndices}]，实际索引 [${actualIndices}]，执行时间 ${executionTime}ms`);
} else {
  console.log(`哈希搜索（所有匹配） 测试 失败：目标值 ${targetDuplicate}，期望索引 [${expectedIndices}]，实际索引 [${actualIndices}]`);
}

console.log('\n测试完成！');