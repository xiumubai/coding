const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

module.exports = function (source) {

  // 解析源代码为 AST
  const ast = parse(source, {
    sourceType: 'module',
  });

  // 遍历并修改 AST
  traverse(ast, {
    VariableDeclarator(path) {
      const binding = path.scope.getBinding(path.node.id.name);
      if (!binding.referenced) {
        path.remove();
      }
    },
    FunctionDeclaration(path) {
      const binding = path.scope.getBinding(path.node.id.name);
      if (!binding.referenced) {
        path.remove();
      }
    },
  });

  // 生成新的代码
  const output = generate(ast, {}, source);

  return output.code;
};