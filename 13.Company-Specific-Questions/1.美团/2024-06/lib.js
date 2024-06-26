let counter = 1

function increment() {
  counter++
}

module.exports = {
  get counter() {
    return counter
  },
  increment: increment,
}