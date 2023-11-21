/* 顶点类 */
class Vertex {
  val;
  constructor(val) {
      this.val = val;
  }

  /* 输入值列表 vals ，返回顶点列表 vets */
  static valsToVets(vals) {
      const vets = [];
      for (let i = 0; i < vals.length; i++) {
          vets[i] = new Vertex(vals[i]);
      }
      return vets;
  }

  /* 输入顶点列表 vets ，返回值列表 vals */
  static vetsToVals(vets) {
      const vals = [];
      for (const vet of vets) {
          vals.push(vet.val);
      }
      return vals;
  }
}

module.exports = {
  Vertex,
};