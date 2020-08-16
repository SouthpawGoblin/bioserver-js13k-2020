const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};
