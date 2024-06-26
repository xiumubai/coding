class Baby {
    constructor(name) {
        this.name = name;
        this.state = ''
        this.observers = [];
    }
    attach(observer) {
        this.observers.push(observer);
    }
    setState(state) {
        this.state = state;
        this.notify();
    }
    notify() {
        this.observers.forEach(observer => {
            observer.update(this);
        });
    }
}

class Parent {
    constructor(name) {
        this.name = name;
    }
    update(baby) {
        console.log(`${this.name}：${baby.name}的状态变化为${baby.state}`);
    }
}

let child = new Baby('孩子')
let mother = new Parent('妈妈')
let father = new Parent('爸爸')
child.attach(mother)
child.attach(father)
child.setState('开心')
setTimeout(() => {
  child.setState('不开心')
}, 2000)