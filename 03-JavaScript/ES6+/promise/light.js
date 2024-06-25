/*
 * @Author: 朽木白
 * @Date: 2023-11-11 21:20:26
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-11 21:21:42
 * @Description: 红绿灯控制
 */

function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}

const task = (timer, light) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === "red") {
        red();
      } else if (light === "green") {
        green();
      } else if (light === "yellow") {
        yellow();
      }
      resolve();
    }, timer);
  });

const taskRunner = async () => {
  await task(3000, "red");
  await task(1000, "green");
  await task(2000, "yellow");
  taskRunner();
};

taskRunner();
