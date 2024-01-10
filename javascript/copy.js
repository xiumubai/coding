/*
 * @Author: 朽木白
 * @Date: 2023-09-20 21:19:59
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-12-03 23:24:09
 * @Description: 拷贝
 */

// 1.浅拷贝

const obj1 = {a: 1}

const obj2 = Object.assign({}, obj1)

console.log(obj2);

// 2.深拷贝
function deepCopy(obj) {
  // hash表，记录所有的对象的引用关系
  let map = new WeakMap();
  function dp(obj) {
      let result = null;
      let keys = Object.keys(obj);
      let key = null,
          temp = null,
          existobj = null;

      existobj = map.get(obj);
      //如果这个对象已经被记录则直接返回
      if(existobj) {
          return existobj;
      }

      result = {}
      map.set(obj, result);

      for(let i =0,len=keys.length;i<len;i++) {
          key = keys[i];
          temp = obj[key];
          if(temp && typeof temp === 'object') {
              result[key] = dp(temp);
          }else {
              result[key] = temp;
          }
      }
      return result;
  }
  return dp(obj);
}

const obj= {
  a: {
      name: 'a'
  },
  b: {
      name: 'b'
  },
  c: {

  }
};
obj.c.d = obj.a;

const copy = deepCopy(obj);
