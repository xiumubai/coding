/*

题目要求：给你一个数组，比如['1.45.1', '1.8.1', '1.22.2'],每个元素都是字符串类型的版本号，需要把版本号从小到大排序后返回。
比如1.45.1比1.8.1大，用js实现

*/
function compareVersion(v1, v2) {
  const arr1 = v1.split('.').map(Number);
  const arr2 = v2.split('.').map(Number);

  const length = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < length; i++) {
    const num1 = arr1[i] || 0; // 如果数组长度不一致，短的部分补0
    const num2 = arr2[i] || 0;

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
}

function sortVersions(versions) {
  return versions.sort(compareVersion);
}

// 示例
const versions = ['1.1.0', '1.45.1', '1.8.1', '1.22.2'];
console.log(sortVersions(versions)); // ['1.8.1', '1.22.2', '1.45.1']
