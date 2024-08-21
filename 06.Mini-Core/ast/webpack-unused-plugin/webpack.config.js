const path = require('path');
const ASTPlugin = require('./plugins/unused-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: path.resolve('./loaders/unused-loader.js'),
        },
      },
    ],
  },
  plugins: [
    new ASTPlugin(),
  ],
};