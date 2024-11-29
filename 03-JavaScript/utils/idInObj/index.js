const selectedQuestions = {
  1: {id: 1},
  2: {id: 2},
  4: {id: 3},
};

const id = 3; // 你需要检查的id

const exists = Object.values(selectedQuestions).some(item => item.id === id);

console.log(exists); // 输出: true
