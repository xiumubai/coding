// 测试代码
class Jane {}
class Tom {
  constructor () { this.jane = new Jane();}
}
let list = Array(1000000).fill('').map(() => new Tom())
