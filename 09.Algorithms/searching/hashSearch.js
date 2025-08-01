/**
 * 哈希搜索算法
 * 时间复杂度: 平均情况 O(1)，最坏情况 O(n)（当发生大量哈希冲突时）
 * 空间复杂度: O(n) - 需要额外的哈希表来存储元素
 * 
 * @param {Array} arr - 要搜索的数组
 * @param {*} target - 要查找的目标值
 * @returns {number} - 目标值在原数组中的索引，如果未找到则返回-1
 */
function hashSearch(arr, target) {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('第一个参数必须是数组');
  }
  
  // 如果数组为空，返回-1
  if (arr.length === 0) {
    return -1;
  }
  
  // 创建哈希表，键为数组元素，值为索引
  // 如果有重复元素，哈希表将保存最后一个出现的索引
  const hashTable = new Map();
  
  // 将数组元素添加到哈希表中
  for (let i = 0; i < arr.length; i++) {
    hashTable.set(arr[i], i);
  }
  
  // 在哈希表中查找目标值
  if (hashTable.has(target)) {
    return hashTable.get(target);
  }
  
  // 未找到目标值，返回-1
  return -1;
}

/**
 * 哈希搜索算法（返回所有匹配的索引）
 * 时间复杂度: 平均情况 O(n)，最坏情况 O(n)
 * 空间复杂度: O(n) - 需要额外的哈希表来存储元素
 * 
 * @param {Array} arr - 要搜索的数组
 * @param {*} target - 要查找的目标值
 * @returns {Array} - 目标值在原数组中的所有索引，如果未找到则返回空数组
 */
function hashSearchAll(arr, target) {
  // 参数验证
  if (!Array.isArray(arr)) {
    throw new TypeError('第一个参数必须是数组');
  }
  
  // 如果数组为空，返回空数组
  if (arr.length === 0) {
    return [];
  }
  
  // 创建哈希表，键为数组元素，值为索引数组
  const hashTable = new Map();
  
  // 将数组元素添加到哈希表中
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (!hashTable.has(value)) {
      hashTable.set(value, []);
    }
    hashTable.get(value).push(i);
  }
  
  // 在哈希表中查找目标值
  if (hashTable.has(target)) {
    return hashTable.get(target);
  }
  
  // 未找到目标值，返回空数组
  return [];
}

module.exports = { hashSearch, hashSearchAll };