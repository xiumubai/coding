const myInstanceof = (left, right) => {
  let proto = Object.getPrototypeOf(left)
  while(true) {
      if(proto === right.prototype) return true
      if(proto === null ) return false
      proto = Object.getPrototypeOf(proto)
  }
}