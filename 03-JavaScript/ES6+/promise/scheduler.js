/**
 * 设计一个异步任务的调度器，最多同时有两个异步任务在执行
 * 待执行的任务按照添加顺序依执行。
 * 使测试用例满足输出顺序。
 */

/** 
class Scheduler {
  constructor() {
    // 请补充...
  }

  async add(promiseCreator) {
    // 请补充...
  }
}

//测试用例：
const scheduler = new Scheduler();

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
*/

class Scheduler {
  constructor() {
    this.queue = []; // 存储等待执行的任务
    this.maxCount = 2; // 最大并行任务数
    this.runningCount = 0; // 当前正在执行的任务数
  }

  // 添加任务到调度器
  async add(promiseCreator) {
    // 如果当前正在执行的任务数达到最大限制，将任务添加到队列中
    if (this.runningCount >= this.maxCount) {
      await new Promise(resolve => this.queue.push(resolve));
    }
    // 执行任务
    this.runningCount++;
    const result = await promiseCreator();
    this.runningCount--;

    // 任务完成后，如果有等待中的任务，从队列中取出并执行
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next();
    }
    return result;
  }
}

// 测试用例
const scheduler = new Scheduler();

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

// 预期输出：
// 500 '2'
// 300 '3'
// 1000 '1'
// 400 '4'


