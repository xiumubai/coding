/*
 * @Author: 朽木白
 * @Date: 2023-10-17 19:11:17
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-10-17 19:41:39
 * @Description: 数组去重
 * @docs: https://juejin.cn/post/7273693216372916283
 */

// 1.Set

// 原始类型
const arr = [1, 2, 2, 5, 6, 6, 6, "abc", "abc", null, null, undefined, undefined];
const uniqueArray = [...new Set(arr)];
const uniqueArray2 = Array.from(new Set(arr));
// 引用类型
const arr2 = [{a:1, b:2}, {a:1, b:2}, [1,2,3], [1,2,3]];
const uniqueArray3 = [...new Set(arr2)];
const uniqueArray4 = Array.from(new Set(arr2));


console.log(uniqueArray3)


// 对象去重

// 利用Map的值唯一来去重，如果Map中有对应的值了，就不往里面添加
