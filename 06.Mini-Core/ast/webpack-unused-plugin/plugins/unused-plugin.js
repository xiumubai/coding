const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

class ASTPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('ASTPlugin', (compilation, callback) => {
      // 遍历所有输出的资源
      for (const filename in compilation.assets) {
        if (filename.endsWith('.js')) {
          const source = compilation.assets[filename].source();
          
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
          const { code } = generate(ast, {}, source);

          // 更新编译后的代码
          compilation.assets[filename] = {
            source: () => code,
            size: () => code.length,
          };
        }
      }
      callback();
    });
  }
}

module.exports = ASTPlugin;