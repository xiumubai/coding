/**
 * 把js中的 var 变成 const
 */
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const code = `function example() {
  var a = 1;
  var b = 2;
  return a + b;
}`;

// 使用babel解析器解析源码为AST
const ast = parser.parse(code);
// console.log(JSON.stringify(ast, null, 2));

// 定义一个遍历AST的访问器对象，也就是访问到目标节点【这里是VariableDeclaration】的时候会做什么处理
const visitor = {
  VariableDeclaration(context) { // 这里的 path 是指当前的上下文，而不是路径
    if (context.node.kind === 'var') {
      context.node.kind = 'const';
    }
  }
};

// 使用traverse遍历AST并应用访问器，也就是遍历并应用刚才那个 visitor 规则
traverse(ast, visitor);

// 使用generate根据修改后的AST生成新的代码
const output = generate(ast, {});

// 打印修改后的代码
console.log(output.code);