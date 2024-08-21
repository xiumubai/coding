module.exports = function ({ types: t }) {
  return {
    visitor: {
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
      ImportDeclaration(path) {
        const specifiers = path.node.specifiers.filter((specifier) => {
          const binding = path.scope.getBinding(specifier.local.name);
          return binding.referenced;
        });
        if (specifiers.length === 0) {
          path.remove();
        }
      },
    },
  };
};