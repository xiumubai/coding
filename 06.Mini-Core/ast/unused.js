/** 
 * 移除无用代码
 */

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

// 输入的 JavaScript 代码
const code = `
import fs from 'fs';
import unusedLib from 'unused-lib';

const a = 1;
const b = 2;
const c = 3;
const sum = (x, y) => x + y;
const unusedFunc = () => 'I am not used';

sum(a, b);
`;

// 解析代码为 AST
const ast = parser.parse(code, {
  sourceType: 'module',
});

// 遍历 AST，移除无用代码
traverse(ast, {
  // 移除未使用的变量
  VariableDeclarator(path) {
    const binding = path.scope.getBinding(path.node.id.name);
    if (!binding.referenced) {
      path.remove();
    }
  },
  // 移除未被调用的函数
  FunctionDeclaration(path) {
    const binding = path.scope.getBinding(path.node.id.name);
    if (!binding.referenced) {
      path.remove();
    }
  },
  // 移除未被使用的导入
  ImportDeclaration(path) {
    const specifiers = path.node.specifiers.filter((specifier) => {
      const binding = path.scope.getBinding(specifier.local.name);
      return binding.referenced;
    });
    // 如果没有任何有效导入，则移除整个 import 语句
    if (specifiers.length === 0) {
      path.remove();
    }
  }
});

// 生成优化后的代码
const { code: optimizedCode } = generate(ast);

console.log(optimizedCode);
