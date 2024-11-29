/**
 * 设计一个异步任务的调度器，最多同时有两个异步任务在执行
 * 待执行的任务按照添加顺序依执行。
 * 使测试用例满足输出顺序。
 */
type Task = {
  promiseCreator: () => Promise<any>,
  resolve: (value: any) => void,
  reject: (reason: any) => void
}
class Scheduler {
  // 任务列表
  taskList: Task[] = []
  // 当前执行的数量
  currentTask = 0
  // 最大数量
  maxCount = 2

  constructor(maxCount = 2) {
    this.maxCount = maxCount;
  }

  // 调用add返回的是一个Promise
  async add(promiseCreator) {
    return new Promise((resolve, reject) => {
      this.taskList.push({
        promiseCreator,
        resolve,
        reject
      })
      this.task()
    })
  }

  private task() {
    if (this.currentTask < this.maxCount && this.taskList.length > 0) {
      const { promiseCreator, resolve, reject } = this.taskList.shift()!
      this.currentTask++
      promiseCreator()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.currentTask--
          this.task()
        })
    }
  }
}

//测试用例：
const scheduler = new Scheduler();
// console.log(!!scheduler.task) // 不存在task方法
const task = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

const addTask = (ms, order) => {
  scheduler.add(() => task(ms)).then(() => console.log(ms, order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// 输出：
// 500 '2'
// 300 '3'
// 1000 '1'
// 400 '4'