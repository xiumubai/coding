/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Array} output  这是为了方便递归而传递的参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */


// 处理多维数组为一维，可以使用 Array.prototype.flat(depth)方法
// 表示要提取嵌套数组的结构深度，默认值是1。如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。

const arr2 = [1, 1, 11, 12, 2, 8, 9, 7, [3, 4, [5, 6, 6]]];
// 扁平化
const result = arr2.flat(1)
// 去重
const arr3 = [...new Set(result)]
// 排序
const arr4 = arr3.sort((x ,y) => x - y)
console.log(arr4)

// flat方法实现

Array.prototype.flatten = function(deep = 1) {
    let arr = this;
    // deep为0则返回，递归结束
    if (deep == 0) return arr;
    // 使用reduce作为累加器
    return arr.reduce((pre, cur) => {
        // cur为数组，继续递归，deep-1
        if (Array.isArray(cur)) {
            return [...pre, ...cur.myFlat(deep - 1)];
        } else {
            return [...pre, cur];
        }
    }, []);
}

var arr = [1, 2, [3, 4, [5, 6, [7]]]];
console.log(arr.flatten(2)); // [3, 4]