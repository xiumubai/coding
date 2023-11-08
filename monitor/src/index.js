import performance from './performance/index'
import behavior from './behavior/index'
import error from './error/index'


class FourDimension {
    constructor() {
        this.init()
    }
      // 初始化
    init() {
      performance()
      error()
      behavior()
    }
}


new FourDimension().init()