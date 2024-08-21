/**
 * 添加 catch
 */
const parser = require('@babel/parser') // 用于将代码转换为 AST
const traverse = require('@babel/traverse').default // 用于对 AST 的遍历，包括节点增删改查、作用域等处理
const generate = require('@babel/generator').default // 用于将 AST 转换成代码
 
const sourceCode = `
postApi('/install-repairer/api/sign-in', params)
  .then(res => {
    if (res && res.code === 2000) {
      Toast.info('成功', 1)
    } else {
      Toast.info(res.message || '网络异常，请重试')
    }
  }).catch(e => {
    Toast.info(e.message || '签到失败，请稍后重试')
  })
 
 
loginApi.getUserList({ keyWord: value }).then(res => {
  if (res && res.code === 2000) {
    Toast.info('成功', 1)
  } else {
    Toast.info(res.message || '请求异常，请稍后重试', 1)
  }
})
`
 
const insertCode = `
test().then().catch(e => {
    Toast.info(e.message || '请求异常，请稍后重试')
  })`
 
const ast = parser.parse(sourceCode, { sourceType: 'module' })
traverse(ast, {
  CallExpression(nodePath) {
    const memberExp = nodePath.get('callee')
    const memberProperty = memberExp.get('property')
    if (
      memberProperty.node &&
      memberProperty.node.name === 'then' &&
      nodePath.parent.type !== 'MemberExpression'
    ) {
      const insertAst = parser.parse(insertCode, { sourceType: 'module' })
      traverse(insertAst, {
        CallExpression(nodePathInsert) {
          const memberExpInsert = nodePathInsert.get('callee')
          const memberPropertyInsert = memberExpInsert.get('property')
 
          if (
            memberPropertyInsert.node &&
            memberPropertyInsert.node.name === 'catch' &&
            memberExpInsert.node.type === 'MemberExpression'
          ) {
            nodePathInsert.node.callee.object = { ...nodePath.node }
            nodePath.container.expression = nodePathInsert.node
          }
        }
      })
    }
  }
})
 
const newCode = generate(ast).code
console.log(newCode)