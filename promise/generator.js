/*
 * @Author: 朽木白
 * @Date: 2023-11-04 21:06:49
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-04 21:08:35
 * @Description: Generator函数的用法
 */

function* myGenerator() {
  yield '1'
  yield '2'
  return '3'
}
const gen = myGenerator();

gen.next()
gen.next()
gen.next()